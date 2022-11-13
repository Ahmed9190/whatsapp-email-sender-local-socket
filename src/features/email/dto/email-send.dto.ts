import { Base64File } from "../../../core/interfaces/base64-file";

export interface EmailSendDto {
  to: string;
  subject: string;
  text: string;
  base64Files: Base64File[];
}
