export const contractAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
export const abi = [
  {
    inputs: [
        {
			internalType: "address",
			name: "target",
			type: "address"
		}
	],
	name: "AddressEmptyCode",
	type: "error"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "account",
			type: "address"
		}
	],
	name: "AddressInsufficientBalance",
	type: "error"
  },
  {
	inputs: [],
	name: "FailedInnerCall",
	type: "error"
  },
  {
    inputs: [
		{
			internalType: "address",
			name: "token",
			type: "address"
		}
	],
	name: "SafeERC20FailedOperation",
	type: "error"
  },
  {
	anonymous: false,
	inputs: [
		{
			indexed: true,
			internalType: "address",
			name: "_doctor",
			type: "address"
		}
	],
	name: "DoctorAdded",
	type: "event"
  },
  {
	anonymous: false,
	inputs: [
		{
			indexed: true,
			internalType: "address",
			name: "caller",
			type: "address"
		},
		{
			indexed: false,
			internalType: "address[]",
			name: "doctors",
			type: "address[]"
		}
	],
	name: "DoctorListShown",
	type: "event"
  },
  {
	anonymous: false,
	inputs: [
		{
			indexed: false,
			internalType: "uint256",
			name: "fee",
			type: "uint256"
		}
	],
	name: "FeeSubtracted",
	type: "event"
  },
  {
	anonymous: false,
	inputs: [],
	name: "FeeSubtractionError",
	type: "event"
  },
  {
	anonymous: false,
	inputs: [],
	name: "InsufficientBalance",
	type: "event"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "_doctor",
			type: "address"
		}
	],
	name: "addDoctor",
	outputs: [],
	stateMutability: "nonpayable",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "string",
			name: "_transactionHash",
			type: "string"
		}
	],
	name: "addTransaction",
	outputs: [],
	stateMutability: "nonpayable",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "doctorAddress",
			type: "address"
		}
	],
	name: "removeDoctor",
	outputs: [],
	stateMutability: "nonpayable",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "_doctor",
			type: "address"
		},
		{
			internalType: "uint256",
			name: "_amount",
			type: "uint256"
		}
	],
	name: "transferFee",
	outputs: [],
	stateMutability: "nonpayable",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "string",
			name: "_profile",
			type: "string"
		}
	],
	name: "updatePatientProfile",
	outputs: [],
	stateMutability: "nonpayable",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "_feeToken",
			type: "address"
		}
	],
	stateMutability: "nonpayable",
	type: "constructor"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "",
			type: "address"
		}
	],
	name: "doctors",
	outputs: [
		{
			internalType: "bool",
			name: "",
			type: "bool"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [],
	name: "getDoctorCount",
	outputs: [
		{
			internalType: "uint256",
			name: "",
			type: "uint256"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "_patient",
			type: "address"
		}
	],
	name: "getPatient",
	outputs: [
		{
			components: [
				{
					internalType: "string",
					name: "name",
					type: "string"
				},
				{
					internalType: "bool",
					name: "isPatient",
					type: "bool"
				},
				{
					internalType: "string",
					name: "condition",
					type: "string"
				},
				{
					internalType: "address",
					name: "owner",
					type: "address"
				},
				{
					internalType: "string",
					name: "profile",
					type: "string"
				},
				{
					components: [
						{
							internalType: "uint256",
							name: "id",
							type: "uint256"
						},
						{
							internalType: "string",
							name: "hash",
							type: "string"
						}
					],
					internalType: "struct PatientData.Transaction[]",
					name: "transactions",
					type: "tuple[]"
				}
			],
			internalType: "struct PatientData.Patient",
			name: "",
			type: "tuple"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [],
	name: "getTransactionCount",
	outputs: [
		{
			internalType: "uint256",
			name: "",
			type: "uint256"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "uint256",
			name: "index",
			type: "uint256"
		}
	],
	name: "getTransactionHash",
	outputs: [
		{
			internalType: "string",
			name: "",
			type: "string"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "_address",
			type: "address"
		}
	],
	name: "isDoctor",
	outputs: [
		{
			internalType: "bool",
			name: "",
			type: "bool"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [
		{
			internalType: "address",
			name: "_address",
			type: "address"
		}
	],
	name: "isPatientOwner",
	outputs: [
		{
			internalType: "bool",
			name: "",
			type: "bool"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [],
	name: "patientProfile",
	outputs: [
		{
			internalType: "string",
			name: "",
			type: "string"
		}
	],
	stateMutability: "view",
	type: "function"
  },
  {
	inputs: [],
	name: "showDoctorList",
	outputs: [
		{
			internalType: "address[]",
			name: "",
			type: "address[]"
		}
	],
	stateMutability: "view",
	type: "function"
  }
]