import { EncryptionHandler } from "../../../core/handlers/encryption.handler";

describe("test encryption", () => {
  let encryptor: EncryptionHandler;
  const text: string = "text";

  beforeEach(() => {
    encryptor = new EncryptionHandler();
  });

  test("should return encrypt text when some text passed as parameter to encryptor.encrypt", () => {
    // act
    const enencryptedText = encryptor.encrypt(text);
    // assert
    expect(enencryptedText).not.toBe(text);
  });

  test("should return decrypt text when encrypted text passed as parameter to encryptor.decrypt", () => {
    // arrange
    const enencryptedText = encryptor.encrypt(text);
    // act
    const decryptedText = encryptor.decrypt(enencryptedText);
    // assert
    expect(decryptedText).toBe(text);
  });
});
