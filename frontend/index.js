
//import { ethers } from "./ethers.js";
import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

// Connect to the local Ethereum network

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, abi, signer)

const addPatientButton = document.getElementById("addPatientButton")
const authorizeDoctorButton = document.getElementById("authorizeDoctorButton")
const authorizeUserButton = document.getElementById("authorizeUserButton")
const authorizedDoctorsButton = document.getElementById("authorizedDoctorsButton")
const authorizedUsersButton = document.getElementById("authorizedUsersButton")
const getPatientDataButton = document.getElementById("getPatientDataButton")

addPatientButton.onclick = addPatient
authorizeDoctorButton.onclick = authorizeDoctor
authorizeUserButton.onclick = authorizeUser
authorizedDoctorsButton.onclick = authorizedDoctors
authorizedUsersButton.onclick= authorizedUsers
getPatientDataButton.onclick = getPatientData

// Function to add a patient
async function addPatient(name, dataHash) {
  const accounts = await signer.getAddress()
  if (typeof window.ethereum !== "undefined") {
    try {
      await contract.addPatient(name, dataHash, { from: accounts })
      console.log("Patient added successfully")
    } catch (error) {
      console.error("Error adding patient:", error)
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask"
  }
}

// Function to authorize a doctor
async function authorizeDoctor(doctor) {
  const accounts = await signer.getAddress()
  try {
    await contract.authorizeDoctor(doctor, { from: accounts })
    console.log("Doctor authorized successfully")
  } catch (error) {
    console.error("Error authorizing doctor:", error)
  }
}

// Function to authorize a user
async function authorizeUser(user) {
  const accounts = await signer.getAddress()
  try {
    await contract.authorizeUser(user, { from: accounts })
    console.log("User authorized successfully")
  } catch (error) {
    console.error("Error authorizing user:", error)
  }
}

// Function to get the patient's data
async function getPatientData() {
  const accounts = await signer.getAddress()
  try {
    const dataHash = await contract.getPatientData({ from: accounts })
    console.log("Patient data hash:", dataHash)
    return dataHash
  } catch (error) {
    console.error("Error getting patient data:", error)
  }
}

// Function to get the authorized doctor at a specific index
async function authorizedDoctors(patient, index) {
  try {
    return contract.authorizedDoctors(patient, index)
  } catch (error) {
    console.error("Error getting authorized doctor:", error)
  }
}

// Function to get the authorized user at a specific index
async function authorizedUsers(patient, index) {
  try {
    return contract.authorizedUsers(patient, index)
  } catch (error) {
    console.error("Error getting authorized user:", error)
  }
}


