import { Base64File } from "../../../core/interfaces/base64-file";

export interface WhatsappSendFileDto {
  number: string;
  base64Files: Base64File[];
}
