// Mock data for Hospeon — used across all screens

export const currentUser = {
  name: 'Dr. Anjali Menon',
  role: 'Clinic Admin',
  email: 'anjali@hospeon.app',
  initials: 'AM',
  branch: 'Hospeon Kochi — MG Road'
};

export const branches = [
{ id: 'br_1', name: 'Hospeon Kochi — MG Road' },
{ id: 'br_2', name: 'Hospeon Kochi — Kakkanad' },
{ id: 'br_3', name: 'Hospeon Trivandrum' }];


export const doctors = [
{ id: 'd1', name: 'Dr. Anjali Menon', dept: 'General Medicine' },
{ id: 'd2', name: 'Dr. Rahul Verma', dept: 'Cardiology' },
{ id: 'd3', name: 'Dr. Priya Nair', dept: 'Pediatrics' },
{ id: 'd4', name: 'Dr. Sameer Iqbal', dept: 'Orthopedics' },
{ id: 'd5', name: 'Dr. Lakshmi Pillai', dept: 'Gynecology' }];


export const patients = [
{
  id: 'P-100482',
  name: 'Ramesh Kumar',
  age: 54,
  gender: 'M',
  phone: '+91 98470 22014',
  lastVisit: '2026-05-08',
  doctor: 'Dr. Anjali Menon',
  balance: 1240,
  blood: 'B+',
  allergies: ['Penicillin'],
  conditions: ['Hypertension', 'Type 2 Diabetes']
},
{
  id: 'P-100481',
  name: 'Fathima Beevi',
  age: 32,
  gender: 'F',
  phone: '+91 99461 78320',
  lastVisit: '2026-05-11',
  doctor: 'Dr. Priya Nair',
  balance: 0,
  blood: 'O+',
  allergies: [],
  conditions: []
},
{
  id: 'P-100480',
  name: 'Joseph Mathew',
  age: 67,
  gender: 'M',
  phone: '+91 94470 11920',
  lastVisit: '2026-05-10',
  doctor: 'Dr. Rahul Verma',
  balance: 8420,
  blood: 'A+',
  allergies: ['Sulfa drugs'],
  conditions: ['CAD', 'Hyperlipidemia']
},
{
  id: 'P-100479',
  name: 'Ananya Suresh',
  age: 8,
  gender: 'F',
  phone: '+91 90370 55821',
  lastVisit: '2026-05-09',
  doctor: 'Dr. Priya Nair',
  balance: 0,
  blood: 'A-',
  allergies: [],
  conditions: ['Asthma']
},
{
  id: 'P-100478',
  name: 'Suresh Pillai',
  age: 45,
  gender: 'M',
  phone: '+91 98951 22014',
  lastVisit: '2026-05-07',
  doctor: 'Dr. Sameer Iqbal',
  balance: 450,
  blood: 'AB+',
  allergies: [],
  conditions: []
},
{
  id: 'P-100477',
  name: 'Meera Krishnan',
  age: 29,
  gender: 'F',
  phone: '+91 99462 09913',
  lastVisit: '2026-05-06',
  doctor: 'Dr. Lakshmi Pillai',
  balance: 0,
  blood: 'O-',
  allergies: ['Latex'],
  conditions: []
},
{
  id: 'P-100476',
  name: 'Abdul Rasheed',
  age: 71,
  gender: 'M',
  phone: '+91 94951 88412',
  lastVisit: '2026-05-05',
  doctor: 'Dr. Anjali Menon',
  balance: 2150,
  blood: 'B-',
  allergies: [],
  conditions: ['COPD', 'Hypertension']
},
{
  id: 'P-100475',
  name: 'Lakshmi Devi',
  age: 60,
  gender: 'F',
  phone: '+91 90880 33145',
  lastVisit: '2026-05-04',
  doctor: 'Dr. Rahul Verma',
  balance: 0,
  blood: 'A+',
  allergies: [],
  conditions: ['CHF']
}];


export const queue = [
{
  token: 'T-014',
  patient: 'Ramesh Kumar',
  pid: 'P-100482',
  doctor: 'Dr. Anjali Menon',
  time: '09:30',
  status: 'In consultation',
  waited: '12m',
  payment: 'Paid'
},
{
  token: 'T-015',
  patient: 'Fathima Beevi',
  pid: 'P-100481',
  doctor: 'Dr. Priya Nair',
  time: '09:45',
  status: 'Waiting',
  waited: '8m',
  payment: 'Paid'
},
{
  token: 'T-016',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  doctor: 'Dr. Rahul Verma',
  time: '10:00',
  status: 'Arrived',
  waited: '2m',
  payment: 'Pending'
},
{
  token: 'T-017',
  patient: 'Ananya Suresh',
  pid: 'P-100479',
  doctor: 'Dr. Priya Nair',
  time: '10:15',
  status: 'Lab pending',
  waited: '24m',
  payment: 'Paid'
},
{
  token: 'T-018',
  patient: 'Suresh Pillai',
  pid: 'P-100478',
  doctor: 'Dr. Sameer Iqbal',
  time: '10:30',
  status: 'Booked',
  waited: '—',
  payment: 'Pending'
},
{
  token: 'T-019',
  patient: 'Meera Krishnan',
  pid: 'P-100477',
  doctor: 'Dr. Lakshmi Pillai',
  time: '10:45',
  status: 'Pharmacy pending',
  waited: '18m',
  payment: 'Paid'
},
{
  token: 'T-020',
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  doctor: 'Dr. Anjali Menon',
  time: '11:00',
  status: 'Completed',
  waited: '—',
  payment: 'Paid'
}];


export const invoices = [
{
  id: 'INV-2026-04812',
  patient: 'Ramesh Kumar',
  pid: 'P-100482',
  date: '2026-05-12',
  amount: 2400,
  paid: 1160,
  balance: 1240,
  status: 'Partial'
},
{
  id: 'INV-2026-04811',
  patient: 'Fathima Beevi',
  pid: 'P-100481',
  date: '2026-05-12',
  amount: 850,
  paid: 850,
  balance: 0,
  status: 'Paid'
},
{
  id: 'INV-2026-04810',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  date: '2026-05-11',
  amount: 12400,
  paid: 4000,
  balance: 8420,
  status: 'Partial'
},
{
  id: 'INV-2026-04809',
  patient: 'Ananya Suresh',
  pid: 'P-100479',
  date: '2026-05-11',
  amount: 1250,
  paid: 1250,
  balance: 0,
  status: 'Paid'
},
{
  id: 'INV-2026-04808',
  patient: 'Suresh Pillai',
  pid: 'P-100478',
  date: '2026-05-10',
  amount: 950,
  paid: 500,
  balance: 450,
  status: 'Partial'
},
{
  id: 'INV-2026-04807',
  patient: 'Meera Krishnan',
  pid: 'P-100477',
  date: '2026-05-10',
  amount: 1800,
  paid: 1800,
  balance: 0,
  status: 'Paid'
}];


export const medicines = [
{
  name: 'Metformin 500mg',
  generic: 'Metformin Hydrochloride',
  category: 'Antidiabetic',
  stock: 240,
  batches: 3,
  expiry: 'OK',
  mrp: 42,
  cost: 28
},
{
  name: 'Amlodipine 5mg',
  generic: 'Amlodipine Besylate',
  category: 'Antihypertensive',
  stock: 18,
  batches: 2,
  expiry: 'Expiring',
  mrp: 65,
  cost: 41
},
{
  name: 'Atorvastatin 20mg',
  generic: 'Atorvastatin Calcium',
  category: 'Statin',
  stock: 92,
  batches: 2,
  expiry: 'OK',
  mrp: 88,
  cost: 54
},
{
  name: 'Pantoprazole 40mg',
  generic: 'Pantoprazole Sodium',
  category: 'PPI',
  stock: 6,
  batches: 1,
  expiry: 'OK',
  mrp: 71,
  cost: 44
},
{
  name: 'Paracetamol 650mg',
  generic: 'Paracetamol',
  category: 'Analgesic',
  stock: 480,
  batches: 4,
  expiry: 'OK',
  mrp: 24,
  cost: 14
},
{
  name: 'Cefixime 200mg',
  generic: 'Cefixime Trihydrate',
  category: 'Antibiotic',
  stock: 0,
  batches: 0,
  expiry: 'Out',
  mrp: 142,
  cost: 88
},
{
  name: 'Salbutamol Inhaler',
  generic: 'Salbutamol Sulphate',
  category: 'Bronchodilator',
  stock: 32,
  batches: 1,
  expiry: 'Expiring',
  mrp: 198,
  cost: 124
}];


export const labOrders = [
{
  id: 'LAB-2026-1244',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  tests: ['CBC', 'Lipid Profile', 'HbA1c'],
  doctor: 'Dr. Rahul Verma',
  sample: 'Collected',
  payment: 'Paid',
  report: 'In Progress'
},
{
  id: 'LAB-2026-1243',
  patient: 'Ramesh Kumar',
  pid: 'P-100482',
  tests: ['FBS', 'PPBS'],
  doctor: 'Dr. Anjali Menon',
  sample: 'Collected',
  payment: 'Paid',
  report: 'Ready'
},
{
  id: 'LAB-2026-1242',
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  tests: ['ABG', 'Chest X-Ray'],
  doctor: 'Dr. Anjali Menon',
  sample: 'Pending',
  payment: 'Pending',
  report: 'Awaiting Sample'
},
{
  id: 'LAB-2026-1241',
  patient: 'Ananya Suresh',
  pid: 'P-100479',
  tests: ['CBC', 'CRP'],
  doctor: 'Dr. Priya Nair',
  sample: 'Collected',
  payment: 'Paid',
  report: 'Approved'
},
{
  id: 'LAB-2026-1240',
  patient: 'Meera Krishnan',
  pid: 'P-100477',
  tests: ['Thyroid Profile'],
  doctor: 'Dr. Lakshmi Pillai',
  sample: 'Collected',
  payment: 'Paid',
  report: 'Pending Review'
}];


export const admissions = [
{
  id: 'IPD-2026-0214',
  patient: 'Joseph Mathew',
  pid: 'P-100480',
  ward: 'Cardiac ICU',
  bed: 'C-04',
  doctor: 'Dr. Rahul Verma',
  admitted: '2026-05-10',
  status: 'Active',
  billing: 'Deposit: ₹25,000'
},
{
  id: 'IPD-2026-0213',
  patient: 'Lakshmi Devi',
  pid: 'P-100475',
  ward: 'General Ward A',
  bed: 'A-12',
  doctor: 'Dr. Rahul Verma',
  admitted: '2026-05-09',
  status: 'Active',
  billing: 'Deposit: ₹15,000'
},
{
  id: 'IPD-2026-0212',
  patient: 'Abdul Rasheed',
  pid: 'P-100476',
  ward: 'Pulmonary Ward',
  bed: 'P-08',
  doctor: 'Dr. Anjali Menon',
  admitted: '2026-05-11',
  status: 'Active',
  billing: 'Deposit: ₹20,000'
}];


export const aiInsights = [
{
  tone: 'warning',
  title: 'Patients waiting too long',
  body: '3 patients have waited over 20 minutes. Token T-017 is waiting on lab results since 9:50.'
},
{
  tone: 'info',
  title: 'Possible revenue leakage',
  body: '₹14,200 in consultation charges not yet billed across 4 completed visits today.'
},
{
  tone: 'success',
  title: 'Follow-ups due today',
  body: '12 patients scheduled for follow-up. 4 have not been contacted yet.'
},
{
  tone: 'warning',
  title: 'Pharmacy expiry risk',
  body: 'Amlodipine 5mg (batch B-2241) expires in 38 days — 18 units in stock. Likely loss ₹1,170.'
}];