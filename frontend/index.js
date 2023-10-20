import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const DoctorButton = document.getElementById("DoctorButton")
const PatientProfileButton = document.getElementById("PatientProfileButton")
const TransferFeeButton = document.getElementById("TransferFeeButton")
const addDoctorButton = document.getElementById("addDoctorButton")
const removeDoctorButton = document.getElementById("removeDoctorButton")
const getDoctorCountButton = document.getElementById("getDoctorCountButton")
const showDoctorListButton = document.getElementById("showDoctorListButton")
const updatePatientProfileButton = document.getElementById("updatePatientProfileButton")
const addTransactionButton = document.getElementById("addTransactionButton")
const getTransactionCountButton = document.getElementById("getTransactionCountButton")
const getTransactionHashButton = document.getElementById("getTransactionHashButton")
const transferFeeButton = document.getElementById("transferFeeButton")

DoctorButton.onclick = Doctor
PatientProfileButton.onclick = PatientProfile
TransferFeeButton.onclick = TransferFee
addDoctorButton.onclick = addDoctor
removeDoctorButton.onclick = removeDoctor
getDoctorCountButton.onclick = getDoctorCount
showDoctorListButton.onclick = showDoctorList
updatePatientProfileButton.onclick = updatePatientProfile
addTransactionButton.onclick = addTransaction
getTransactionCountButton.onclick = getTransactionCount
getTransactionHashButton.onclick = getTransactionHash
transferFeeButton.onclick = transferFee



  // Initialize the provider, signer, and contract instance
const provider = new ethers.providers.JsonRpcProvider()
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, abi, signer)

// Example function calls

async function Doctor() {
  window.location.href = "Doctor.html"
}

async function PatientProfile() {
  window.location.href = "PatientProfile.html"
}

async function TransferFee() {
  window.location.href = "TransferFee.html"
}

async function addDoctor(doctorAddress) {
  if (typeof window.ethereum !== "undefined") {
    // Check if the doctorAddress is already in the list
    const isDoctorAdded = await contract.isDoctorAdded(doctorAddress);
    if (isDoctorAdded) {
      console.log("Doctor already exists in the list");
      return;
    }

    const tx = await contract.addDoctor(doctorAddress);
    await tx.wait();
    console.log("Doctor added successfully");
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function isDoctorAdded(doctorAddress) {
  const count = await contract.getDoctorCount();
  for (let i = 0; i < count; i++) {
    const doctor = await contract.doctors(i);
    if (doctor === doctorAddress) {
      return true;
    }
  }
  return false;
}

async function removeDoctor(doctorAddress) {
  if (typeof window.ethereum !== "undefined") {
    const isDoctorAdded = await contract.isDoctorAdded(doctorAddress);
    if (isDoctorAdded) {
      const tx = await contract.removeDoctor(doctorAddress);
      await tx.wait();
      console.log("Doctor removed successfully");
    } else {
      console.log("Doctor not found in the list");
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function getDoctorCount() {
  const count = await contract.getDoctorCount()
  console.log(`There are ${count} doctors in the contract`)
}

async function showDoctorList() {
  try {
    const isOwner = await contract.owner() === signer.getAddress();
    const isDoctor = await contract.doctors(signer.getAddress());
    if (isOwner || isDoctor) {
      const doctors = await contract.showDoctorList()
      console.log("List of doctors:")
      doctors.forEach((doctor, index) => {
        console.log(`${index + 1}. ${doctor}`)
      })
      console.log("List of doctors showed.");
    } else {
      console.log("Only contract owner or doctors can show list of doctors.");
    }
  } catch (error) {
    console.error("Error showing doctor list:", error);
  }
}

async function updatePatientProfile(profile) {
  try {
    const isOwner = await contract.owner() === signer.getAddress();
    const isDoctor = await contract.doctors(signer.getAddress());
    if (isOwner || isDoctor) {
      const tx = await contract.updatePatientProfile(profile);
      await tx.wait();
      console.log("Patient profile updated successfully");
    } else {
      console.log("Only contract owner or doctors can update patient profiles");
    }
  } catch (error) {
    console.error("Error updating patient profile:", error);
  }
}

async function addTransaction(transactionHash) {
  try {
    const isOwner = await contract.owner() === signer.getAddress();
    const isDoctor = await contract.doctors(signer.getAddress());
    if (isOwner || isDoctor) {
      const tx = await contract.addTransaction(transactionHash);
      await tx.wait();
      console.log("Transaction added successfully");
    }else {
        console.log("Only contract owner or doctors can add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
}

async function getTransactionCount() {
  const count = await contract.getTransactionCount();
  console.log(`There are ${count} transactions for the patient`);
}

async function getTransactionHash(index) {
  try {
    const isOwner = await contract.owner() === signer.getAddress();
    const isDoctor = await contract.doctors(signer.getAddress());
    if (isOwner || isDoctor) {
      const hash = await contract.getTransactionHash(index);
      console.log(`Transaction hash at index ${index}: ${hash}`);
    } else {
      console.log("Only contract owner or doctors can access this function");
    }
  } catch (error) {
    console.error("Error getting transaction hash:", error);
  }
}

async function transferFee(doctorAddress, amount) {
  const transferFeeButton = document.getElementById("transferFeeButton");
  transferFeeButton.innerHTML = "fee";

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const balance = await contract.feeToken.balanceOf(signer.getAddress());
    if (balance.lt(amount)) {
      console.log("Insufficient balance");
      return;
    }

    try {
      const tx = await contract.transferFee(doctorAddress, amount);
      await tx.wait();
      console.log("Fee transferred successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    transferFeeButton.innerHTML = "Please install MetaMask";
  }
}
