// src/data/mockData.js

import { 
  USER_ROLES, 
  SUBJECT_TYPES, 
  CLASSROOM_TYPES, 
  DEFAULT_TIME_SLOTS,
  DEFAULT_ADMIN 
} from '../utils/constants.js';

// Sample Subjects
export const MOCK_SUBJECTS = [
  {
    id : "sub_001",
    name : "Database Management System",
    code : "BCS-501",
    type : SUBJECT_TYPES.THEORY,
    lecturesPerWeek : 3,
    duration : 1
  },
  {
    id : "sub_002",
    name : "Web Technology",
    code : "BCS-502",
    type : SUBJECT_TYPES.THEORY,
    lecturesPerWeek : 3,
    duration : 1
  },
  {
    id : "sub_003",
    name : "Design and Analysis of Algorithm",
    code : "BCS-503",
    type : SUBJECT_TYPES.THEORY,
    lecturesPerWeek : 3,
    duration : 1
  },
  {
    id : "sub_004",
    name : "OOSD with C++",
    code : "BCS-054",
    type : SUBJECT_TYPES.THEORY,
    lecturesPerWeek : 3,
    duration : 1
  },
  {
    id : "sub_005",
    name : "Machine Learning Techniques",
    code : "BCS-055",
    type : SUBJECT_TYPES.THEORY,
    lecturesPerWeek : 3,
    duration : 1
  },
  {
    id : "sub_006",
    name : "Constitution of India, Law & Engineering",
    code : "BNC-501",
    type : SUBJECT_TYPES.THEORY,
    lecturesPerWeek : 2,
    duration : 1
  },
  {
    id : "sub_007",
    name : "Data Encryption and Compression",
    code : "HTCS-501",
    type : SUBJECT_TYPES.THEORY,
    lecturesPerWeek : 3,
    duration : 1
  },
  {
    id: "sub_008",
    name : "Database Management System Lab",
    code : "BCS-551",
    type : SUBJECT_TYPES.LAB ,
    lecturesPerWeek : 1,
    duration : 2
  },
  {
    id: "sub_009",
    name : "Web Technology Lab",
    code : "BCS-552",
    type : SUBJECT_TYPES.LAB ,
    lecturesPerWeek : 1,
    duration : 2
  },
  {
    id: "sub_010",
    name : "Design and Analysis of Algorithm Lab",
    code : "BCS-553",
    type : SUBJECT_TYPES.LAB ,
    lecturesPerWeek : 1,
    duration : 2
  },
  {
    id: "sub_011",
    name : "Mini Project or Internship Assessment",
    code : "BCS-554",
    type : SUBJECT_TYPES.LAB ,
    lecturesPerWeek : 1,
    duration : 2
  },
  {
    id: "sub_012",
    name : "Technical Training",
    code : null ,
    type : SUBJECT_TYPES.TECHNICAL_TRAINING ,
    lecturesPerWeek : 5,
    duration : 2
  }
];


export const MOCK_CLASSROOMS = [
  {
    id : "lab_001",
    name : "LAB 1",
    type : CLASSROOM_TYPES.LAB,
    capacity : 60
  },
  {
    id : "lab_002",
    name : "LAB 2",
    type : CLASSROOM_TYPES.LAB,
    capacity : 60
  },
  {
    id : "room_001",
    name : "ROOM 124",
    type : CLASSROOM_TYPES.THEORY,
    capacity : 60
  },
  {
    id : "room_002",
    name : "ROOM 125",
    type : CLASSROOM_TYPES.THEORY,
    capacity : 60
  },
  {
    id : "TT_001",
    name : "TT 205",
    type : CLASSROOM_TYPES.TECHNICAL_TRAINING,
    capacity : 60
  },
  {
    id : "TT_002",
    name : "TT 208",
    type : CLASSROOM_TYPES.TECHNICAL_TRAINING,
    capacity : 60
  }
];


// Sample Divisions
export const MOCK_DIVISIONS = [
  {
    id: 'div_001',
    name: 'CS-A',
    monitorFacultyId: 'fac_002',
    studentCount: 60,
    subjects: ['sub_001', 'sub_002', 'sub_003', 'sub_004', 'sub_005', 'sub_008','sub_009']
  },
  {
    id: 'div_002',
    name: 'CS-B',
    monitorFacultyId: 'fac_002',
    studentCount: 52,
    subjects: ['sub_001', 'sub_002', 'sub_003', 'sub_004', 'sub_006', 'sub_008', 'sub_009']
  },
  {
    id: 'div_003',
    name: 'IT-A',
    monitorFacultyId: 'fac_003',
    studentCount: 48,
    subjects: ['sub_005', 'sub_006', 'sub_007', 'sub_008', 'sub_009', 'sub_010']
  },
  {
    id: 'div_004',
    name: 'IT-B',
    monitorFacultyId: 'fac_004',
    studentCount: 50,
    subjects: ['sub_002', 'sub_004', 'sub_005', 'sub_006', 'sub_010']
  }
];

// Sample Faculty
export const MOCK_FACULTIES = [
  {
    id: 'fac_001',
    name: 'Dr. Praveen Kumar Rai',
    email: 'praveen.kumar@college.edu',
    subjects: ['sub_001', 'sub_008'], 
    monitoringDivision: null,
    password: 'faculty123',
    role: USER_ROLES.FACULTY
  },
  {
    id: 'fac_002',
    name: 'Ms. Mitali Bhatt',
    email: 'mitali.bhatt@college.edu',
    subjects: ['sub_002', 'sub_009'], 
    monitoringDivision: 'div_001',
    password: 'faculty123',
    role: USER_ROLES.FACULTY
  },
  {
    id: 'fac_003',
    name: 'Dr. Sansar Chauhan',
    email: 'sansar.chauhan@college.edu',
    subjects: ['sub_003', 'sub_010'], 
    monitoringDivision: null,
    password: 'faculty123',
    role: USER_ROLES.FACULTY
  },
  {
    id: 'fac_004',
    name: 'Mr. Nikhill',
    email: 'nikhill@college.edu',
    subjects: ['sub_004','sub_011'], // Computer Networks
    monitoringDivision: null,
    password: 'faculty123',
    role: USER_ROLES.FACULTY
  },
  {
    id: 'fac_005',
    name: 'Mr. Sanjay Babu',
    email: 'sanjay.babu@college.edu',
    subjects: ['sub_005'], // Web Development Theory & Lab
    monitoringDivision: null,
    password: 'faculty123',
    role: USER_ROLES.FACULTY
  },
  {
    id: 'fac_006',
    name: 'Mr. Pagal',
    email: 'pagal@college.edu',
    subjects: ['sub_006'], 
    monitoringDivision: null,
    password: 'faculty123',
    role: USER_ROLES.FACULTY
  },
  {
    id: 'fac_007',
    name: 'Dr. Suresh Reddy',
    email: 'suresh.reddy@college.edu',
    subjects: ['sub_012'], 
    monitoringDivision: null,
    password: 'faculty123',
    role: USER_ROLES.FACULTY
  }
];


// Sample Students (for login testing)
export const MOCK_STUDENTS = [
  {
    id: 'stu_001',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@student.edu',
    divisionId: 'div_001',
    rollNumber: 'CS001',
    password: 'student123',
    role: USER_ROLES.STUDENT
  },
  {
    id: 'stu_002',
    name: 'Riya Agarwal',
    email: 'riya.agarwal@student.edu',
    divisionId: 'div_002',
    rollNumber: 'CS051',
    password: 'student123',
    role: USER_ROLES.STUDENT
  },
  {
    id: 'stu_003',
    name: 'Karan Verma',
    email: 'karan.verma@student.edu',
    divisionId: 'div_003',
    rollNumber: 'IT001',
    password: 'student123',
    role: USER_ROLES.STUDENT
  },
  {
    id: 'stu_004',
    name: 'Pooja Nair',
    email: 'pooja.nair@student.edu',
    divisionId: 'div_004',
    rollNumber: 'IT051',
    password: 'student123',
    role: USER_ROLES.STUDENT
  }
];

// All Users Combined (for login)
export const MOCK_USERS = [
  DEFAULT_ADMIN,
  ...MOCK_FACULTIES,
  ...MOCK_STUDENTS
];

// Time Slots (using default from constants)
export const MOCK_TIME_SLOTS = DEFAULT_TIME_SLOTS;

// Sample Generated Timetable (for testing)
export const MOCK_TIMETABLE_ENTRIES = [
  {
    id: 'entry_001',
    divisionId: 'div_001',
    day: 'Monday',
    timeSlotId: '1',
    subjectId: 'sub_001',
    facultyId: 'fac_001',
    classroomId: 'room_001',
    isLunch: false
  },
  {
    id: 'entry_002',
    divisionId: 'div_001',
    day: 'Monday',
    timeSlotId: '2',
    subjectId: 'sub_002',
    facultyId: 'fac_002',
    classroomId: 'room_002',
    isLunch: false
  },
  // Add more sample entries as needed
];

export const MOCK_TIMETABLES = [
  {
    id: 'tt_001',
    divisionId: 'div_001',
    generatedBy: 'fac_001',
    generatedAt: new Date().toISOString(),
    entries: MOCK_TIMETABLE_ENTRIES,
    conflicts: []
  }
];

// Helper function to get initial data
export const getInitialData = () => ({
  subjects: MOCK_SUBJECTS,
  classrooms: MOCK_CLASSROOMS,
  divisions: MOCK_DIVISIONS,
  faculties: MOCK_FACULTIES,
  students: MOCK_STUDENTS,
  users: MOCK_USERS,
  timeSlots: MOCK_TIME_SLOTS,
  timetables: MOCK_TIMETABLES
});

// Helper function to get user by email and password
export const getUserByCredentials = (email, password) => {
  return MOCK_USERS.find(user => 
    user.email === email && user.password === password
  );
};

// Helper function to get division by student
export const getDivisionByStudent = (studentId) => {
  const student = MOCK_STUDENTS.find(s => s.id === studentId);
  if (!student) return null;
  return MOCK_DIVISIONS.find(d => d.id === student.divisionId);
};

// Helper function to get faculty's monitoring division
export const getFacultyMonitoringDivision = (facultyId) => {
  return MOCK_DIVISIONS.find(d => d.monitorFacultyId === facultyId);
};

// Helper function to get subjects by faculty
export const getSubjectsByFaculty = (facultyId) => {
  const faculty = MOCK_FACULTIES.find(f => f.id === facultyId);
  if (!faculty) return [];
  return MOCK_SUBJECTS.filter(s => faculty.subjects.includes(s.id));
};

// Helper function to get subjects by division
export const getSubjectsByDivision = (divisionId) => {
  const division = MOCK_DIVISIONS.find(d => d.id === divisionId);
  if (!division) return [];
  return MOCK_SUBJECTS.filter(s => division.subjects.includes(s.id));
};
