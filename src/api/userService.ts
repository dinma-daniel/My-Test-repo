import axios from "axios";
import { UserResponse, User, TransformedData, DepartmentStats } from "./types";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const API_URL = "https://dummyjson.com/users";

export class UserService {
  private static instance: UserService;
  private client: any;

  private constructor() {
    // Initialize gRPC client if needed
    this.initializeGrpcClient();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private initializeGrpcClient(): void {
    // This is a placeholder for gRPC client initialization
    // In a real implementation, you would load the proto file and create the client
  }

  public async getUsersHttp(): Promise<User[]> {
    try {
      const response = await axios.get<UserResponse>(API_URL);
      return response.data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  public async getUsersGrpc(): Promise<User[]> {
    // This is a placeholder for gRPC implementation
    // In a real implementation, you would use the gRPC client
    return this.getUsersHttp();
  }

  public transformData(users: User[]): TransformedData {
    const departments: TransformedData = {};

    // Group users by department
    users.forEach((user) => {
      const department = user.company.department;
      if (!departments[department]) {
        departments[department] = {
          male: 0,
          female: 0,
          ageRange: "",
          hair: {},
          addressUser: {},
        };
      }

      const stats = departments[department];

      // Update gender count
      if (user.gender === "male") stats.male++;
      else stats.female++;

      // Update hair color count
      const hairColor = user.hair.color;
      stats.hair[hairColor] = (stats.hair[hairColor] || 0) + 1;

      // Update address mapping
      const fullName = `${user.firstName}${user.lastName}`;
      stats.addressUser[fullName] = user.address.postalCode;
    });

    // Calculate age ranges for each department
    Object.keys(departments).forEach((department) => {
      const departmentUsers = users.filter(
        (u) => u.company.department === department
      );
      const ages = departmentUsers.map((u) => u.age);
      const minAge = Math.min(...ages);
      const maxAge = Math.max(...ages);
      departments[department].ageRange = `${minAge}-${maxAge}`;
    });

    return departments;
  }
}
