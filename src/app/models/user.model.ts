export interface User {
    id: number;
    name: string;
    departmentId: number;
    gender: 'Male' | 'Female';
    phoneNumber?: string;
    educationLevel: 'Diploma' | 'Bachelor' | 'Master' | 'phd';
  }
  