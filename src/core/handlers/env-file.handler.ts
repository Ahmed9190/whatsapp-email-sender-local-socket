import fs from "fs";
import os from "os";

import { ENV_FILE_PATH } from "../constants/env.const";

export class EnvFileHandler {
  private static readonly envFilePath: string = ENV_FILE_PATH;

  private static readEnvVars = (): string[] =>
    fs.readFileSync(this.envFilePath, "utf-8").split(os.EOL);

  /**
   * Finds the key in .env files and returns the corresponding value
   */
  static getEnvValue = (key: string): string | null => {
    // return process.env[key] || null;
    // find the line that contains the key (exact match)
    const matchedLine = this.readEnvVars().find(
      (line) => line.split("=")[0] === key
    );
    // split the line (delimiter is '=') and return the item at index 2
    if (matchedLine !== undefined) {
      const retrievedValue = matchedLine.split("=")[1];
      if (retrievedValue.startsWith('"') && retrievedValue.endsWith('"')) {
        const valueWithoutDoubleQuotes = retrievedValue.substring(
          1,
          retrievedValue.length - 1
        );
        return valueWithoutDoubleQuotes;
      }
      return retrievedValue;
    }
    return null;
  };

  /**
   * Updates value for existing key or creates a new key=value line
   */
  static setEnvValue = (key: string, value: string) => {
    const envVars = this.readEnvVars();
    const targetLine = envVars.find((line) => line.split("=")[0] === key);
    if (targetLine !== undefined) {
      // update existing line
      const targetLineIndex = envVars.indexOf(targetLine);
      // replace the key/value with the new value
      envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
    } else {
      // create new key value
      envVars.push(`${key}="${value}"`);
    }
    // write everything back to the file system
    fs.writeFileSync(this.envFilePath, envVars.join(os.EOL));
  };
}
