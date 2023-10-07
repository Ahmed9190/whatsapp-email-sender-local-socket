import { Request, Response } from "express";
import { EmailService } from "./email-service";
import { EmailSendDto } from "./dto/email-send.dto";
import { EmailUpdateDto } from "./dto/email-update.dto";

export class EmailController {
  public async send(req: Request, res: Response) {
    const emailSendDto: EmailSendDto = req.body;
    await EmailService.send(emailSendDto);
    res.status(200).send();
  }

  public async update(req: Request, res: Response) {
    const emailUpdateDto: EmailUpdateDto = req.body;
    await EmailService.update(emailUpdateDto);
    res.status(200).send();
  }
}
