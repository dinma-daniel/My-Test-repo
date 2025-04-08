import { UserService } from "./userService";
import { User } from "./types";

jest.mock("axios");

describe("UserService", () => {
  let userService: UserService;
  const mockUsers: User[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: 30,
      gender: "male",
      hair: { color: "Black" },
      address: { postalCode: "12345" },
      company: { department: "Engineering" },
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      age: 25,
      gender: "female",
      hair: { color: "Blond" },
      address: { postalCode: "67890" },
      company: { department: "Engineering" },
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      age: 40,
      gender: "male",
      hair: { color: "Brown" },
      address: { postalCode: "54321" },
      company: { department: "Marketing" },
    },
  ];

  beforeEach(() => {
    userService = UserService.getInstance();
    jest.clearAllMocks();
  });

  describe("getUsersHttp", () => {
    it("should fetch users successfully", async () => {
      const axios = require("axios");
      axios.get.mockResolvedValue({ data: { users: mockUsers } });

      const users = await userService.getUsersHttp();
      expect(users).toEqual(mockUsers);
      expect(axios.get).toHaveBeenCalledWith("https://dummyjson.com/users");
    });

    it("should handle errors", async () => {
      const axios = require("axios");
      axios.get.mockRejectedValue(new Error("API Error"));

      await expect(userService.getUsersHttp()).rejects.toThrow("API Error");
    });
  });

  describe("transformData", () => {
    it("should transform user data correctly", () => {
      const transformedData = userService.transformData(mockUsers);

      expect(transformedData).toHaveProperty("Engineering");
      expect(transformedData).toHaveProperty("Marketing");

      const engineeringStats = transformedData["Engineering"];
      expect(engineeringStats.male).toBe(1);
      expect(engineeringStats.female).toBe(1);
      expect(engineeringStats.ageRange).toBe("25-30");
      expect(engineeringStats.hair).toEqual({
        Black: 1,
        Blond: 1,
      });
      expect(engineeringStats.addressUser).toEqual({
        JohnDoe: "12345",
        JaneSmith: "67890",
      });

      const marketingStats = transformedData["Marketing"];
      expect(marketingStats.male).toBe(1);
      expect(marketingStats.female).toBe(0);
      expect(marketingStats.ageRange).toBe("40-40");
      expect(marketingStats.hair).toEqual({
        Brown: 1,
      });
      expect(marketingStats.addressUser).toEqual({
        BobJohnson: "54321",
      });
    });
  });
});
