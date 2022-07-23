const assert = require('chai').assert;
const expect = require('chai').expect;

const uri = "https://gateway.moralisipfs.com/ipfs/";
const mintPrice = ethers.utils.parseEther('0.001')

describe('SBT Contract', function () {
    before(async function () {
        SBT = await ethers.getContractFactory("SBT");
        sbt = await SBT.deploy(uri);
        await sbt.deployed(); 

        [testOwner, testEducator, testStudent, testStudent2, testAttacker] = await ethers.getSigners();
    });

    it('should have set correct owner on deploy', async function () {
        assert.equal(await sbt.owner(), testOwner.address);
    });

    describe('Add educator', function () {
        it('should revert if not owner', async function () {
            await expect(sbt.connect(testAttacker).addEducator(testEducator.address)).to.be.revertedWith("Ownable: caller is not the owner"); 
        });
        
        it('should add a new educator', async function () {
            await sbt.addEducator(testEducator.address);
            assert.isTrue(await sbt.isEducator(testEducator.address));
        });

        it('should revert if educator already exists', async function () {
            await expect(sbt.addEducator(testEducator.address)).to.be.revertedWith("Educator already exists");
        });
    })

    describe('Add student', function () {
        it('should revert if not owner', async function () {
            await expect(sbt.connect(testAttacker).addStudent(testStudent.address)).to.be.revertedWith("Ownable: caller is not the owner"); 
        });
        
        it('should add a new student', async function () {
            await sbt.addStudent(testStudent.address);
            assert.isTrue(await sbt.isStudent(testStudent.address));
        });

        it('should revert if student already exists', async function () {
            await expect(sbt.addStudent(testStudent.address)).to.be.revertedWith("Student already exists");
        });
    })

    describe('Test creation', function () {
        it('should revert if not educator', async function () {
            await expect(sbt.connect(testAttacker).createSBT(mintPrice, uri)).to.be.revertedWith("Not an educator"); 
        });

        it('should create a new test', async function () {
            assert.equal(await sbt.nbClassesCreated(testEducator.address), 0) // Get number of classes created by educator which should be 0
            await sbt.connect(testEducator).createSBT(mintPrice, uri); // Create a class
            assert.equal(await sbt.nbClassesCreated(testEducator.address), 1) // Update number of classes created which should now be 1
    
            assert.equal(await sbt.getTestEducator(0), testEducator.address); // Educator should be set correctly
        });
    });

    describe('Test validation', function () {
        it('should revert if not owner', async function () {
            await expect(sbt.connect(testAttacker).validateStudentTest(testStudent.address, 0)).to.be.revertedWith("Ownable: caller is not the owner");
        })

        it('should revert if token does not exist', async function () {
            await expect(sbt.validateStudentTest(testStudent.address, 394587)).to.be.revertedWith("Token doesn't exist");
        })

        it('should validate the students test', async function () {
            classesCompleted = await sbt.nbClassesCompleted(testStudent.address); // Get number of classes completed by student
            assert.equal(classesCompleted, 0); // which should be 0

            nbCompleted = await sbt.nbTestCompletions(0); // Get number of times test has been completed
            assert.equal(nbCompleted, 0) // which should be 0

            await sbt.validateStudentTest(testStudent.address, 0); // Validate student test

            classesCompleted = await sbt.nbClassesCompleted(testStudent.address); // Update classesCompleted
            assert.equal(classesCompleted, 1); // which should now be 1

            nbCompleted = await sbt.nbTestCompletions(0); // update nbCompleted
            assert.equal(nbCompleted, 1) // which should now be 1

            assert.isTrue(await sbt.isAllowedMint(testStudent.address, 0)); // Student should be allowedMint
        })

        it('should revert if student is already validated', async function () {
            await expect(sbt.validateStudentTest(testStudent.address, 0)).to.be.revertedWith("Student already allowed to mint");
        })
    })

    describe('Minting', function () {
        it('should revert due to not being a student', async function () {
            await expect(sbt.connect(testAttacker).mintSBT(0)).to.be.revertedWith("Not a student");
        })

        it('should revert due to incorrect msg.value', async function () {
            await expect(sbt.connect(testStudent).mintSBT(0, { value: ethers.utils.parseEther('0.0001')})).to.be.revertedWith("Incorrect amount");
        })
        
        it('should revert due to not being validated by educator', async function () {
            await sbt.addStudent(testStudent2.address); // create another student account which has not been validated
            await expect(sbt.connect(testStudent2).mintSBT(0, { value: mintPrice})).to.be.revertedWith("Student is not allowed to mint this token");
        })

        it('should mint a token', async function () {
            assert.equal(await sbt.connect(testStudent).balanceOf(testStudent.address, 0), 0) // get student token balance which should be 0
            await expect(sbt.connect(testStudent).mintSBT(0, { value: mintPrice })).to.changeEtherBalance(testStudent, -mintPrice); // Mint a token and expect student's wallet value to decrease by mintPrice
            assert.equal(await sbt.connect(testStudent).balanceOf(testStudent.address, 0), 1) // Update student token balance which should now be 1

            assert.isFalse(await sbt.isAllowedMint(testStudent.address, 0)); // Student should not be allowedMint
        })

        it('should revert due to already having minted', async function () {
            await expect(sbt.connect(testStudent).mintSBT(0, { value: mintPrice })).to.be.revertedWith('Student is not allowed to mint this token');
        })

    })

    describe('Withdrawl', function () {
        it('should revert due to not being an educator', async function () {
            await expect(sbt.connect(testAttacker).withdrawCoursesPayoff()).to.be.revertedWith("Not an educator");
        })

        it('should withdraw the educators payout', async function () {
            await expect(sbt.connect(testEducator).withdrawCoursesPayoff()).to.changeEtherBalance(testEducator, mintPrice); // withdraw and expect educator balance to increase
        })

        it('Should revert due to not having any payout left to withdraw', async function () {
            await expect(sbt.connect(testEducator).withdrawCoursesPayoff()).to.be.revertedWith("No funds left to withdraw");
        })
    })
})

describe('Event Emitting', function () {
    before(async function () {
        SBT = await ethers.getContractFactory("SBT");
        sbt = await SBT.deploy(uri);
        await sbt.deployed(); 

        [testOwner, testEducator, testStudent] = await ethers.getSigners();
    });

    it('should emit an event when a new educator is added', async function() {
        await expect(sbt.addEducator(testEducator.address)).to.emit(sbt, 'AddEducator');
    })
    
    it('should emit an event when a new student is added', async function () {
        await expect(sbt.addStudent(testStudent.address)).to.emit(sbt, 'AddStudent');
    })

    it('should emit an event when a class is created', async function () {
        await expect(sbt.connect(testEducator).createSBT(mintPrice, uri)).to.emit(sbt, 'CreateTest');
    })

    it('should emit an event when a students test is validated', async function () {
        await expect(sbt.validateStudentTest(testStudent.address, 0)).to.emit(sbt, 'ValidateTest');
    })

    it('should emit an event when a student mints a token', async function () {
        await expect(sbt.connect(testStudent).mintSBT(0, { value: mintPrice })).to.emit(sbt, 'MintSBT');
    })

    it('should emit an event when an educator withdraws their payout', async function () {
        await expect(sbt.connect(testEducator).withdrawCoursesPayoff()).to.emit(sbt, 'Withdrawl');
    })
})