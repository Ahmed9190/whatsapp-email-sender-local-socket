import { WhatsappService } from "./whatsapp-service";
import { WhatsappSendMessageDto } from "./dto/whatsapp-send-message.dto";
import { WhatsappSendFileDto } from "./dto/whatsapp-send-file.dto";
import { WhatsappSendFileWithMessageDto } from "./dto/whatsapp-send-file-with-message.dto";
import { Request, Response } from "express";

export class WhatsappController {
  public async open(req: Request, res: Response) {
    try {
      await WhatsappService.open();
      res.status(200).send({ message: "Whatsapp opened" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async sendMessage(req: Request, res: Response) {
    try {
      const dto = req.body as WhatsappSendMessageDto;
      await WhatsappService.sendMessage(dto);
      res.status(200).send({ message: "Message sent" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async sendFile(req: Request, res: Response) {
    try {
      const dto = req.body as WhatsappSendFileDto;
      await WhatsappService.sendFile(dto);
      res.status(200).send({ message: "File sent" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async sendFileWithMessage(req: Request, res: Response) {
    try {
      const dto = req.body as WhatsappSendFileWithMessageDto;
      await WhatsappService.sendFileWithMessage(dto);
      res.status(200).send({ message: "File sent with message" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
