import {Employee} from './src/types/employee'
import { FieldData } from './src/types/FieldData';

export const employees: Employee[] = [
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

export const fields: FieldData[] = [
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
  }
]
