import Cryptr from "cryptr";
import { envKeys } from "../constants/env.const";
import { EnvFileHandler } from "./env-file.handler";

export class EncryptionHandler {
  private encryptor: Cryptr;

  constructor() {
    const ENCRYPTION_KEY = EnvFileHandler.getEnvValue(envKeys.ENCRYPTION_KEY);
    if (ENCRYPTION_KEY == null)
      throw Error("Can't retrieve ENCRYPTION_KEY from .env");
    this.encryptor = new Cryptr(ENCRYPTION_KEY!);
  }

  encrypt(text: string): string {
    return this.encryptor.encrypt(text);
  }
  decrypt(text: string): string {
    const decrypted = this.encryptor.decrypt(text);

    if (decrypted == null) throw Error("Bad key. It can't be decrypted");

    return decrypted;
  }
}
