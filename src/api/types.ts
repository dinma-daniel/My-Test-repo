export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  hair: {
    color: string;
  };
  address: {
    postalCode: string;
  };
  company: {
    department: string;
  };
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface DepartmentStats {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}

export interface TransformedData {
  [department: string]: DepartmentStats;
}
