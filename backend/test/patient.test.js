const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PatientData", () => {
  let patientData;
  let feeToken;
  let accounts;

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    // Deploy the FeeToken contract
    const FeeToken = await ethers.getContractFactory("FeeToken");
    feeToken = await FeeToken.deploy();
    await feeToken.deployed();

    // Deploy the PatientData contract with the FeeToken address as an argument
    const PatientData = await ethers.getContractFactory("PatientData");
    patientData = await PatientData.deploy(feeToken.address);
    await patientData.deployed();
  });

  it("should add a doctor", async () => {
    const doctor = accounts[1].address;

    await patientData.addDoctor(doctor);

    const isDoctor = await patientData.isDoctor(doctor);
    expect(isDoctor).to.be.true;
  });

  it("should remove a doctor", async () => {
    const doctor = accounts[1].address;

    await patientData.addDoctor(doctor);
    await patientData.removeDoctor(doctor);

    const isDoctor = await patientData.isDoctor(doctor);
    expect(isDoctor).to.be.false;
  });

  it("should return the correct number of doctors", async () => {
    const doctor1 = accounts[0].address;
    const doctor2 = accounts[1].address;

    // Add two doctors
    await patientData.addDoctor(doctor1);
    await patientData.addDoctor(doctor2);

    // Get the number of doctors
    const doctorCount = await patientData.getDoctorCount();

    // Verify the number of doctors
    expect(doctorCount).to.equal(2);
  });
    
  it("should update the patient's profile", async () => {
    const profile = "New profile";

    await patientData.updatePatientProfile(profile);

    const patientProfile = await patientData.patientProfile();
    expect(patientProfile).to.equal(profile);
  });

  it("should show the list of doctors", async () => {
    const doctor1 = accounts[1].address;
    const doctor2 = accounts[2].address;

    await patientData.addDoctor(doctor1);
    await patientData.addDoctor(doctor2);

    const doctorList = await patientData.showDoctorList();
    expect(doctorList).to.have.lengthOf(2);
    expect(doctorList).to.include(doctor1);
    expect(doctorList).to.include(doctor2);
  });
});
