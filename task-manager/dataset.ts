import { CharacteristicsCreate } from "./src/types/Characteristics";
import { EmployeeCreate } from "./src/types/employee";
import { FieldDataCreate } from "./src/types/FieldData";

export const employees: EmployeeCreate[] = [
  {
    name: "John",
    surname: "Doe",
    phoneNumber: "+30 690 123 4567",
    sex: "male",
    email: "john.doe@example.com",
  },
  {
    name: "Maria",
    surname: "Papadopoulou",
    phoneNumber: "+30 698 765 4321",
    sex: "female",
    email: "maria.papadopoulou@example.gr",
  },
  {
    name: "Kostas",
    surname: "Nikolaidis",
    phoneNumber: "+30 697 112 2334",
    sex: "male",
    email: "kostas.nikolaidis@example.com",
  },
  {
    name: "Eleni",
    surname: "Georgiou",
    phoneNumber: "+30 694 998 8776",
    sex: "female",
    email: "eleni.georgiou@example.gr",
  },
  {
    name: "Alex",
    surname: "Smith",
    phoneNumber: "+30 695 443 2211",
    sex: "male",
    email: "alex.smith@example.com",
  },
];

export const fields: FieldDataCreate[] = [
  {
    name: "Gameplay Programming",
    area: "development",
  },
  {
    name: "3D Animation",
    area: "creative",
  },
  {
    name: "Level Design",
    area: "creative",
  },
  {
    name: "Audio Engineering",
    area: "production",
  },
  {
    name: "Technical Art",
    area: "development",
  },
  {
    name: "Narrative Design",
    area: "creative",
  },
  {
    name: "QA Testing",
    area: "production",
  },
  {
    name: "VFX Design",
    area: "creative",
  },
  {
    name: "Network Engineering",
    area: "development",
  },
  {
    name: "Project Management",
    area: "production",
  },
];

export const characteristics: CharacteristicsCreate[] = [
  { category: "skill", name: "Leadership" },
  { category: "skill", name: "Communication" },
  { category: "skill", name: "Problem Solving" },
  { category: "skill", name: "Time Management" },
  { category: "personality", name: "Team Player" },
  { category: "personality", name: "Proactive" },
  { category: "personality", name: "Adaptable" },
  { category: "experience", name: "Project Management" },
  { category: "experience", name: "Technical Expertise" },
  { category: "experience", name: "Mentorship" },
];

export const employeeChars = [
  { employeeId: 1, charId: 1 },
  { employeeId: 1, charId: 2 },
  { employeeId: 1, charId: 3 },
  { employeeId: 2, charId: 1 },
  { employeeId: 2, charId: 2 },
  { employeeId: 2, charId: 3 },
];
