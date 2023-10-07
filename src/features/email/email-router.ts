import express from "express";
import { EmailController } from "./email-controller";

const emailRouter = express.Router();

const emailController = new EmailController();

emailRouter.post("/send", emailController.send);
emailRouter.put("/update", emailController.update);

export default emailRouter;
