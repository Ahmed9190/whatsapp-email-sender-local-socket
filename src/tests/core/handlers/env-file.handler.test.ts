import dotenv from "dotenv";
import { EnvFileHandler } from "../../../core/handlers/env-file.handler";

describe("test env-file-handler", () => {
  beforeAll(() => {
    dotenv.config();
  });

  describe("getEnvValue", () => {
    const key: string = "EMAIL";
    test("should return value when correct key passed", () => {
      // act
      const value = EnvFileHandler.getEnvValue(key);
      // assert
      expect(value).toBe(process.env[key]);
    });
  });
});
