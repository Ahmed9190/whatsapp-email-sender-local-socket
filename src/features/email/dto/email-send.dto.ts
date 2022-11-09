export interface EmailSendDto {
  to: string;
  subject: string;
  text: string;
  fileName: string;
  base64: string;
}
