// dummyData.js
export const initialPolicies = [
    {
        uwyear: "2022",
        carrier: "AIG",
        policyNumber: "CP89569001/R/22",
        effectiveDate: "01-01-2022",
        expirationDate: "12-31-2022",
        annualPremium: "$28,000",
        losses: 1,
        totalLosses: "$64,000.00"
    },
    {
        uwyear: "2023",
        carrier: "AIG",
        policyNumber: "CP23578022/R/23",
        effectiveDate: "01-01-2023",
        expirationDate: "12-31-2023",
        annualPremium: "$35,000",
        losses: 1,
        totalLosses: "$32,000.00"
    },
    {
        uwyear: "2024",
        carrier: "AIG",
        policyNumber: "CP23578022/R/24",
        effectiveDate: "01-01-2024",
        expirationDate: "12-31-2024",
        annualPremium: "$41,000",
        losses: 1,
        totalLosses: "$25,000.00"
    }
];

export const initialLossData = [
    {
        policyYear: '2024',
        annualPremium: '$ 500',
        claims: '0',
        openClaims: '1',
        totalInsuredLosses: '$ 10,000',
        totalPaidLosses: '$ 200',
        expenses: '$ 100'
    }
];

export const initialClaimsData = [
    {
        uwyear: "2022",
        carrier: "AIG",
        claimNumber: "40051070-2022",
        effectiveDate: "01-01-2022",
        expirationDate: "12-31-2022",
        dateofLoss: "06-30-2022",
        causeofLoss: "Fire Damage",
        lob: "Commercial Property",
        lae: "$2,250.00",
        settlementAmount: "$61,750.00",
        totalIncurred: "$64,000.00",
        status: "Paid",
        notes: [
            {
                noteDate: "07-01-2022",
                accidentDate: "06-30-2022",
                reportedDate: "07-01-2022",
                expenseReserve: "$20000.00",
                note: "The claimant was not responsible for the lossess"
            },
            {
                noteDate: "06-23-2022",
                accidentDate: "06-22-2022",
                reportedDate: "06-23-2022",
                expenseReserve: "$5000.00",
                note: ""
            }
        ]
    },
    {
        uwyear: "2023",
        carrier: "AIG",
        claimNumber: "78345710-2023",
        effectiveDate: "01-01-2023",
        expirationDate: "12-31-2023",
        dateofLoss: "02-27-2023",
        causeofLoss: "Water Damage",
        lob: "Commercial Property",
        lae: "$750.00",
        settlementAmount: "$14,250.00",
        totalIncurred: "$15,000.00",
        status: "Paid",
        notes: [
            {
                noteDate: "02-28-2023",
                accidentDate: "02-27-2023",
                reportedDate: "02-28-2023",
                expenseReserve: "$10000.00",
                note: ""
            }
        ]
    },
    {
        uwyear: "2024",
        carrier: "AIG",
        claimNumber: "86453201-2024",
        effectiveDate: "01-01-2024",
        expirationDate: "12-31-2024",
        dateofLoss: "07-31-2024",
        causeofLoss: "Fire Damage",
        lob: "Commercial Property",
        lae: "1,850.00",
        settlementAmount: "$30,150.00",
        totalIncurred: "$32,000.00",
        status: "Paid",
        notes: [
            {
                noteDate: "08-01-2024",
                accidentDate: "07-31-2024",
                reportedDate: "08-01-2024",
                expenseReserve: "$8000.00",
                note: ""
            }
        ]
    }
];

export const tableColumns = {
    priorPolicy: [
        {
            title: 'UW Year', dataIndex: 'uwyear', key: 'uwyear', width: 200,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Carrier', dataIndex: 'carrier', key: 'carrier', width: 200,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Policy #', dataIndex: 'policyNumber', key: 'policyNumber', width: 200,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Effective Date', dataIndex: 'effectiveDate', key: 'effectiveDate', width: 200,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Expiration Date', dataIndex: 'expirationDate', key: 'expirationDate', width: 200,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Annual Premium', dataIndex: 'annualPremium', key: 'annualPremium', width: 200,
            fixed: 'left',
            align: 'center',
        },
        {
            title: '# Losses', dataIndex: 'losses', key: 'losses', width: 200,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Total Loss Amount', dataIndex: 'totalLosses', key: 'totalLosses', width: 200,
            fixed: 'left',
            align: 'center',
        }
    ],
    lossDetail: [
        { title: 'UW Year', dataIndex: 'uwyear', key: 'uwyear',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Carrier', dataIndex: 'carrier', key: 'carrier',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Claim #', dataIndex: 'claimNumber', key: 'claimNumber',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Policy Eff Date', dataIndex: 'effectiveDate', key: 'effectiveDate',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Policy Exp Date', dataIndex: 'expirationDate', key: 'expirationDate',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Date of Loss', dataIndex: 'dateofLoss', key: 'dateofLoss',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Cause of Loss', dataIndex: 'causeofLoss', key: 'causeofLoss',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'LOB', dataIndex: 'lob', key: 'lob',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'LAE', dataIndex: 'lae', key: 'lae',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Settlement Amount', dataIndex: 'settlementAmount', key: 'settlementAmount',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Total Incurred', dataIndex: 'totalIncurred', key: 'totalIncurred',  width: 200,
            fixed: 'left',
            align: 'center', },
        { title: 'Status', dataIndex: 'status', key: 'status',  width: 200,
            fixed: 'left',
            align: 'center', }
    ]
};

export const initialFormStates = {
    newPolicy: {
        carrier: "",
        policyNumber: "",
        effectiveDate: "",
        expirationDate: "",
        annualPremium: "",
        losses: "",
        totalLosses: ""
    },
    newLossSummary: {
        policyYear: "",
        annualPremium: "",
        claims: "",
        openClaims: "",
        totalInsuredLosses: "",
        totalPaidLosses: "",
        expenses: ""
    },
    newLossDetail: {
        claimNumber: "",
        effectiveDate: "",
        expirationDate: "",
        carrier: "",
        lob: "",
        accidentDescription: "",
        reportedDate: "",
        status: "",
        class: "",
        totalPaid: "",
        totalIncurred: ""
    },
    errors: {
        reportedDate: '',
        effectiveDate: '',
        expirationDate: ''
    }
};