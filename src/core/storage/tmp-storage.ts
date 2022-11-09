import { TMP_STORAGE } from "../constants/storage.const";
import { FileSystemHandler } from "../handlers/file-system-handler";
import { Base64File } from "../interfaces/base64-file";

export class TmpStorage {
  private constructor() {}

  private static fileSystemHandler: FileSystemHandler = new FileSystemHandler(
    TMP_STORAGE
  );

  static async saveUseRemove({
    base64File,
    use,
  }: {
    base64File: Base64File;
    use: (path: string) => Promise<void>;
  }) {
    const savedFilePath = await this.fileSystemHandler.saveBase64ToFile(
      base64File
    );
    await use(savedFilePath);
    await this.fileSystemHandler.removeFile(savedFilePath);
  }
}
