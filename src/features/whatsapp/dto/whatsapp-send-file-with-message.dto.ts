import { Base64File } from "../../../core/interfaces/base64-file";

export interface WhatsappSendFileWithMessageDto {
  number: string;
  message: string;
  base64Files: Base64File[];
}
