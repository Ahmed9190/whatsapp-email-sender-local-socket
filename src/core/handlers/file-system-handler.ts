import * as fs from "fs";
import { Base64File } from "../interfaces/base64-file";

export class FileSystemHandler {
  constructor(private readonly storagePath: string) {}

  async saveBase64ToFile({ base64, fileName }: Base64File): Promise<string> {
    const fileContents = Buffer.from(base64, "base64");

    const filePath = this.buildPath(fileName);
    await fs.writeFile(filePath, fileContents, this.handleError);
    return filePath;
  }

  async removeFile(fileName: string): Promise<void> {
    const filePath = this.buildPath(fileName);
    await fs.unlink(filePath, this.handleError);
  }

  private buildPath(fileName: string): string {
    return `${this.storagePath}/${fileName}`;
  }

  private handleError(err: NodeJS.ErrnoException | null) {
    if (err) console.error(err);
  }
}
