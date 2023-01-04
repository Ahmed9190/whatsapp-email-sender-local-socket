import { io } from "socket.io-client";
import { envKeys } from "./core/constants/env.const";
import { EnvFileHandler } from "./core/handlers/env-file.handler";
import { EmailListenerEvents } from "./features/email/constants/email-events.const";
import * as fs from "fs";
import * as path from "path";
import { WhatsappListenerEvents } from "./features/whatsapp/constants/whatsapp-events.const";

const url: string = EnvFileHandler.getEnvValue(envKeys.SERVER_URL)!;
const socket = io(url, { autoConnect: true });

socket.on("connect", () => {
  socket.emit("LOCAL_CLIENT:REGISTER_TO_LISTENER", {
    uuid: EnvFileHandler.getEnvValue(envKeys.UUID)!,
  });
  console.log("connected");
});

const eventListeners = { ...EmailListenerEvents, ...WhatsappListenerEvents };

for (const key in eventListeners) {
  if (Object.prototype.hasOwnProperty.call(eventListeners, key)) {
    const { name: eventName, callback } =
      eventListeners[key as keyof typeof eventListeners];
    socket.on(eventName, (data) => {
      callback(data)
        .then(() => {
          socket.emit("LOCAL_CLIENT:RESPONSE", {
            uuid: EnvFileHandler.getEnvValue(envKeys.UUID),
            hasError: false,
            body: "success",
          });
        })
        .catch((error) => {
          appendErrorInLogFile(error);
          socket.emit("LOCAL_CLIENT:RESPONSE", {
            uuid: EnvFileHandler.getEnvValue(envKeys.UUID),
            hasError: true,
            body: error,
          });
        });
    });
  }
}

process.on("uncaughtException", appendErrorInLogFile);

function appendErrorInLogFile(err: any) {
  fs.appendFileSync(
    path.join(__dirname, "../log.txt"),
    `[${new Date().toLocaleString()}] : ${err}\n`
  );

  console.log(err);
}
