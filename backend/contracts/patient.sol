// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


/**
 * @title A sample blockchain in healthcare Contract
 * @author Masoumeh Jafari
 * @notice This Project defines a PatientData contract that stores information about patients and their transactions using a blockchain.
 */


contract PatientData {
    struct Patient {
        string name;
        bool isPatient;
        string condition;
        address owner;
        string profile;
        Transaction[] transactions; // Array to store the patient's transactions
    }


    struct Transaction {
        uint256 id;
        string hash; // Add any other transaction-related properties here
    }

    address private patient;
    address[] private doctorAddresses;
    mapping(address => Patient) private patients;
    mapping(address => bool) public doctors;
    mapping(address => Transaction[]) private patientTransactions;

    IERC20 private feeToken; // Declare the feeToken variable to store the address of the ERC20 token contract
    using SafeERC20 for IERC20;

    event DoctorAdded(address indexed _doctor);
    event DoctorListShown(address indexed caller, address[] doctors);
    event FeeSubtracted(uint256 fee);
    event FeeSubtractionError();
    event InsufficientBalance();

    constructor(address _feeToken) {
        patient = msg.sender;
        feeToken = IERC20(_feeToken); // Initialize the feeToken variable with the ERC20 token contract address
    }

    modifier onlyPatient() {
        require(msg.sender == patient, "Only the patient can access this function.");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Only the patient's doctors can access this function.");
        _;
    }

    modifier onlyOwnerOrDoctor() {
        require(
            msg.sender == patient || doctors[msg.sender] == true,
            "Only the patient or the patient's doctors can access this function."
        );
        _;
    }

    function isPatientOwner(address _address) public view returns (bool) {
        return _address == patients[_address].owner;
    }

    function isDoctor(address _address) public view returns (bool) {
        return doctors[_address];
    }

    function addDoctor(address _doctor) public onlyPatient {
        if (!isDoctor(_doctor)) {
            doctors[_doctor] = true;
            doctorAddresses.push(_doctor);
            emit DoctorAdded(_doctor);
        }
    }

    function removeDoctor(address doctorAddress) public onlyPatient {
        require(doctors[doctorAddress], "Doctor does not exist");
        doctors[doctorAddress] = false;
        for (uint256 i = 0; i < doctorAddresses.length; i++) {
            if (doctorAddresses[i] == doctorAddress) {
                doctorAddresses[i] = doctorAddresses[doctorAddresses.length - 1];
                doctorAddresses.pop();
                break;
            }
        }
    }

    function updatePatientProfile(string memory _profile) public onlyOwnerOrDoctor {
        patients[msg.sender].profile = _profile;
    }

    function addTransaction(string memory _transactionHash) public onlyOwnerOrDoctor {
        uint256 transactionId = patients[msg.sender].transactions.length;
        patients[msg.sender].transactions.push(Transaction(transactionId, _transactionHash));
    }

    function getTransactionCount() public view returns (uint256) {
        return patientTransactions[msg.sender].length;
    }

    function getTransactionHash(uint256 index) public view onlyOwnerOrDoctor returns (string memory) {
        require(index < patientTransactions[msg.sender].length, "Invalid transaction index");
        return patientTransactions[msg.sender][index].hash;
    }

    function patientProfile() public view onlyPatient returns (string memory) {
        return patients[msg.sender].profile;
    }

    function showDoctorList() public view onlyOwnerOrDoctor returns (address[] memory) {
        return doctorAddresses;
    }

    function getPatient(address _patient) public view returns (Patient memory) {
        return patients[_patient];
    }


    function getDoctorCount() public view returns (uint256) {
        return doctorAddresses.length;
    }

    function transferFee(address _doctor, uint256 _amount) public onlyPatient {
        require(doctors[_doctor], "Invalid doctor address");
        require(feeToken.balanceOf(msg.sender) >= _amount, "Insufficient balance");

        feeToken.safeTransferFrom(msg.sender, _doctor, _amount);
        emit FeeSubtracted(_amount);

    }


}
