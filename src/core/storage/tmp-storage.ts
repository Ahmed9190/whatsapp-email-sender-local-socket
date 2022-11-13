import { TMP_STORAGE } from "../constants/storage.const";
import { FileSystemHandler } from "../handlers/file-system-handler";
import { Base64File } from "../interfaces/base64-file";

export class TmpStorage {
  private constructor() {}

  private static fileSystemHandler: FileSystemHandler = new FileSystemHandler(
    TMP_STORAGE
  );

  static async saveUseRemove({
    base64Files,
    use,
  }: {
    base64Files: Base64File[];
    use: (paths: string[]) => Promise<void>;
  }) {
    const savedFilePaths = await this.saveBase64Files(base64Files);

    await use(savedFilePaths);

    base64Files.forEach(async (base64File) => {
      await this.fileSystemHandler.removeFile(base64File.fileName);
    });
  }

  static async saveBase64Files(base64Files: Base64File[]) {
    const savedFilePaths: string[] = [];

    for (let i = 0; i < base64Files.length; i++) {
      const base64File = base64Files[i];

      const savedFilePath = await this.fileSystemHandler.saveBase64ToFile(
        base64File
      );
      savedFilePaths.push(savedFilePath);
    }

    return savedFilePaths;
  }
}
