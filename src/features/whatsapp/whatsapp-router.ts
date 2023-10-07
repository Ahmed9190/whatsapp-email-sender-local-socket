import express from "express";
import { WhatsappController } from "./whatsapp-controller";

const whatsappRouter = express.Router();

const whatsappController = new WhatsappController();

whatsappRouter.post("/open", whatsappController.open);
whatsappRouter.post("/send-message", whatsappController.sendMessage);
whatsappRouter.post("/send-file", whatsappController.sendFile);
whatsappRouter.post(
  "/send-file-with-message",
  whatsappController.sendFileWithMessage
);

export default whatsappRouter;
