import * as fs from "fs";
import * as path from "path";
import express from "express";
import emailRouter from "./features/email/email-router";
import whatsappRouter from "./features/whatsapp/whatsapp-router";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use("/email", emailRouter);
app.use("/whatsapp", whatsappRouter);

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});

process.on("uncaughtException", appendErrorInLogFile);

function appendErrorInLogFile(err: any) {
  fs.appendFileSync(
    path.join(__dirname, "../log.txt"),
    `[${new Date().toLocaleString()}] : ${err}\n`
  );

  console.log(err);
}
