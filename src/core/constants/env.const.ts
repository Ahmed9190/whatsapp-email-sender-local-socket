import path from "path";

export const ENV_FILE_PATH: string = path.resolve(__dirname, "../../../.env");

export const envKeys = Object.freeze({
  EMAIL_SERVICE: "EMAIL_SERVICE",
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  ENCRYPTION_KEY: "ENCRYPTION_KEY",
  UUID: "UUID",
  SERVER_URL: "SERVER_URL",
});
