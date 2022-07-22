const { expect } = require("chai");
const { ethers } = require("hardhat");

const uri = "https://gateway.pinata.cloud/ipfs/QmPho6v62jctLRGsZv2A8pyRGM4KCDvqDjKJbJm3sp4VUA/{id}.json";
const mintPrice = ethers.utils.parseEther('0.001')

describe('SBT Test', function () {
    before(async function () {
        SBT = await ethers.getContractFactory("SBT");
        sbt = await SBT.deploy(uri);
        await sbt.deployed(); 

        [testOwner, testEducator, testStudent, testStudent2, testAttacker] = await ethers.getSigners();
    });
    
    it('should deploy with correct owner', async function () {
        // Deployed owner should be set correctly
        expect(await sbt.owner()).to.equal(testOwner.address);
    });

    it('should add a new educator as owner', async function () {
        // Should revert due to not being the owner
        await expect(sbt.connect(testAttacker).addEducator(testEducator.address)).to.be.revertedWith("Ownable: caller is not the owner"); 
        
        // Should succeed as owner
        await sbt.addEducator(testEducator.address);
        // and mapping should be updated
        expect(await sbt.isEducator(testEducator.address)).to.equal(true);
        
        // Should revert due to educator already existing
        await expect(sbt.addEducator(testEducator.address)).to.be.revertedWith("Educator already exists");
    });

    it('should add a new student as owner', async function () {
        // Should revert due to not being the owner
        await expect(sbt.connect(testAttacker).addStudent(testStudent.address)).to.be.revertedWith("Ownable: caller is not the owner"); 
        
        // Should succeed as owner
        await sbt.addStudent(testStudent.address);
        // and mapping should be updated
        expect(await sbt.isStudent(testStudent.address)).to.equal(true);

        // Should revert due to student already existing
        await expect(sbt.addStudent(testStudent.address)).to.be.revertedWith("student already exists");
    });

    it('should create a new test as educator', async function () {
        // Should revert due to not being an educator
        await expect(sbt.connect(testAttacker).createSBT(mintPrice, uri)).to.be.revertedWith("You are not an educator");
        
        // Should succeed as educator
        await sbt.connect(testEducator).createSBT(mintPrice, uri);
        
        // Educator's classesCreated should increment
        expect(await sbt.nbClassesCreated(testEducator.address)).to.equal(1);
        
        // Test struct should have set educator correctly
        expect(await sbt.getTestEducator(0)).to.equal(testEducator.address);
    })


    it('should validate a students test as owner', async function () {
        // Should revert due to not being owner
        await expect(sbt.connect(testAttacker).validateStudentTest(testStudent.address, 0)).to.be.revertedWith("Ownable: caller is not the owner");
        
        // Should revert due to the token not existing
        await expect(sbt.validateStudentTest(testStudent.address, 394587)).to.be.revertedWith("This token doesn't exists");

        // Should succeed as owner
        await sbt.validateStudentTest(testStudent.address, 0);
        
        // Student should be allowedMint
        expect(await sbt.isAllowedMint(testStudent.address, 0)).to.equal(true);
        
        // Should revert due to student already having been validated 
        await expect(sbt.validateStudentTest(testStudent.address, 0)).to.be.revertedWith("student already allowed to mint"); // This needs to be added to smart contract

        // Student's classCompleted should increment
        expect(await sbt.nbClassesCompleted(testStudent.address)).to.equal(1);
        // Test's nbCompleted should increment
        expect(await sbt.nbTestCompletions(0)).to.equal(1);
    })

    it('should mint a new token as student', async function () {
        // Should revert due to not being a student
        await expect(sbt.connect(testAttacker).mintSBT(0)).to.be.revertedWith("You are not a student")

        // create another student account which has not been validated
        await sbt.addStudent(testStudent2.address);
        // Should revert due to not being validated by owner
        await expect(sbt.connect(testStudent2).mintSBT(0)).to.be.reverted; // no reason in contract

        // Should revert due to incorrect msg.value
        await expect(sbt.connect(testStudent).mintSBT(0, { value: ethers.utils.parseEther('0.0001')})).to.be.reverted;

        // Should succeed as validated student with correct msg.value
        await sbt.connect(testStudent).mintSBT(0, { value: mintPrice });

        // Contract balance should increase
        // Student's balance should decrease

        // Student's token balance should increment
        expect(await sbt.connect(testStudent).balanceOf(testStudent.address, 0)).to.equal(1);
        // Student's sbtMinted should increment
        expect(await sbt.nbMinted(testStudent.address)).to.equal(1);
        // Educator's payout should increase
        expect(await sbt.payout(testEducator.address)).to.equal(mintPrice);

        // Student should not be allowedMint
        expect(await sbt.isAllowedMint(testStudent.address, 0)).to.equal(false);
        // Student should not be able to mint another token
        await expect(sbt.connect(testStudent).mintSBT(0, { value: mintPrice })).to.be.reverted; // no reason in contract

    })

    it('should withdraw the educators payout', async function () {
        // Should revert due to not being an educator
        await expect(sbt.connect(testAttacker).withdrawCoursesPayoff()).to.be.revertedWith("Not an educator");
        
        // Should succeed as educator with payout remaining
        await sbt.connect(testEducator).withdrawCoursesPayoff();

        // Educator's balance should increase

        // Should revert due to not having any payout left to withdraw
        await expect(sbt.connect(testEducator).withdrawCoursesPayoff()).to.be.revertedWith("No payout left to pay");
    })
});