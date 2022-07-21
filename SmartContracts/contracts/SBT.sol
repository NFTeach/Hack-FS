// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBT is ERC1155, Ownable {
    uint256 public counterIDs = 0;

    /*//////////////////////////////////////////////////////////////
                                Events
    //////////////////////////////////////////////////////////////*/

    /** @notice emitted when a new educator is added
      * @param educator address of the new educator
      */
    event AddEducator(address educator);

    /** @notice emitted when a new student is added
      * @param student address of the new student
      */
    event AddStudent(address student);

    /** @notice emited when new test is created
      * @param tokenId Id of the new test and corresponding token
      * @param educator address of the educator who creates the test
      * @param mintPrice price of minting the SBT after test completion
      */
    event CreateTest(uint256 tokenId, address educator, uint256 mintPrice);

    /** @notice emited when an educator validates a students completion of a test
      * @param tokenId id of the test and corresponding token
      * @param student address of the student which completed the test
      */
    event ValidateTest(uint256 tokenId, address student);

    /** @notice emitted when SBT is minted by a student
      * @param tokenId Id of the test and corresponding token
      * @param student address of the student which completed the test
      */
    event MintSBT(uint256 tokenId, address student);

    /** @notice emitted when an educator withdraws their payoff
      * @param educator address of the withdrawing educator
      * @param amount total amount of payoff withdrawn by educator
      */
    event Withdrawl(address educator, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                               Structures
    //////////////////////////////////////////////////////////////*/

    //Test object that keeps track of Educator's address, test hash, lifetime payout from students,
    //price to mint SBT, number of students that passed the test.
    struct Test {
        address educator;
        string hash;
        uint256 lifetimePayout;
        uint256 price;
        uint256 nbCompleted;
    }

    //Student object that tracks number of classes completed, SBT minted, what SBT the student is currently
    //allowed to mint, and a boolean to see if student is active
    struct Student {
        uint8 classCompleted;
        uint8 sbtMinted;
        mapping(uint256 => bool) allowedMint;
        bool active;
    }

    // Educator object that tracks how much an educator has made from students
    struct Educator {
        uint256 lifetimePayout;
        uint256 classesCreated;
        bool active;
    }

    /*//////////////////////////////////////////////////////////////
                               MAPPINGS
    //////////////////////////////////////////////////////////////*/

    //Mapping to know what educator address created what tokenId
    mapping(uint256 => address) public tokenIdToEducatorAddress;
    //Token id to test object
    mapping(uint256 => Test) public tests;
    //Mapping to know how much of current smart contract balance is due to each educator
    mapping(address => uint256) public payout;
    // Mappins from addresses to student or educator structures
    mapping(address => Educator) public educators;
    mapping(address => Student) students;

    modifier onlyEducator() {
        require(
            educators[msg.sender].active == true,
            "You are not an educator"
        );
        _;
    }

    modifier onlyStudent() {
        require(students[msg.sender].active == true, "You are not a student");
        _;
    }

    constructor(string memory _uri) ERC1155(_uri) {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function addEducator(address _newEducator) public onlyOwner {
        require(
            educators[_newEducator].active == false,
            "Educator already exists"
        );
        educators[_newEducator].active = true;

        emit AddEducator(_newEducator);
    }

    function isEducator(address _address) public view returns (bool) {
        return (educators[_address].active);
    }

    function addStudent(address _newStudent) public onlyOwner {
        require(
            students[_newStudent].active == false,
            "student already exists"
        );
        students[_newStudent].active = true;

        emit AddStudent(_newStudent);
    }

    function isStudent(address _address) public view returns (bool) {
        return (students[_address].active);
    }

    //need to be an approved educator to create SBT
    function createSBT(uint256 _price, string memory _testHash)
        external
        onlyEducator
    {
        //declares test
        tests[counterIDs] = Test(msg.sender, _testHash, 0, _price, 0);
        educators[msg.sender].classesCreated += 1;

        emit CreateTest(counterIDs, msg.sender, _price);

        counterIDs += 1;
    }

    //function called by the owner after a student address passed a test.
    //Calling this will allow the student to mint a SBT for the class
    function validateStudentTest(address _student, uint256 _tokenId)
        public
        payable
        onlyOwner
    {
        require(
            tests[_tokenId].educator != address(0),
            "This token doesn't exists"
        );
        require(
            balanceOf(_student, _tokenId) == 0,
            "student already has this SBT"
        );
        tests[_tokenId].nbCompleted += 1;
        students[_student].classCompleted += 1;
        students[_student].allowedMint[_tokenId] = true;

        emit ValidateTest(_tokenId, _student);
    }

    //function to be called by student once test is passed and owner approved
    function mintSBT(uint256 _tokenId) public payable onlyStudent {
        require(students[msg.sender].allowedMint[_tokenId] == true);
        require(
            msg.value == tests[_tokenId].price || tests[_tokenId].price == 0,
            "Not correct amount"
        );
        //Smart Contract keeps tracks of how much is owed to specific educator
        payout[tests[_tokenId].educator] += tests[_tokenId].price;
        //keeps track of how much an educator has gained from his/her courses
        educators[tests[_tokenId].educator].lifetimePayout += tests[_tokenId]
            .price;
        //Prevents student from minting twice
        students[msg.sender].allowedMint[_tokenId] = false;
        students[msg.sender].sbtMinted += 1;
        _mint(msg.sender, _tokenId, 1, "");

        emit MintSBT(_tokenId, msg.sender);
    }

    function withdrawCoursesPayoff() public {
        require(educators[msg.sender].active == true, "Not an educator");
        require(payout[msg.sender] > 0, "No payout left to pay");
        uint256 leftToPay = payout[msg.sender];
        educators[msg.sender].lifetimePayout += leftToPay;
        payout[msg.sender] = 0;
        (bool success, ) = address(payable(msg.sender)).call{value: leftToPay}(
            ""
        );
        require(success);

        emit Withdrawl(msg.sender, leftToPay);
    }

    //returns the number of classes an educator has created
    function nbClassesCreated(address _educator) public view returns(uint256) {
        return(educators[_educator].classesCreated);
    }

    //returns the number of classes a student has completed
    function nbClassesCompleted(address _student) public view returns(uint256) {
        return(students[_student].classCompleted);
    }

    //returns the educator of a test
    function getTestEducator(uint256 _tokenId) public view returns(address) {
        return(tests[_tokenId].educator);
    }

    //returns the number of times a test has been completed
    function nbTestCompletions(uint256 _tokenId) public view returns(uint256) {
        return(tests[_tokenId].nbCompleted);
    }

    //returns whether a student is allowed to mint a token
    function isAllowedMint(address _student, uint256 _tokenId) public view returns(bool) {
        return(students[_student].allowedMint[_tokenId]);
    }
}

//HackFs Metadata
//https://gateway.pinata.cloud/ipfs/QmPho6v62jctLRGsZv2A8pyRGM4KCDvqDjKJbJm3sp4VUA
