import { io } from "socket.io-client";
import { envKeys } from "./core/constants/env.const";
import { EnvFileHandler } from "./core/handlers/env-file.handler";
import { EmailListenerEvents } from "./features/email/constants/email-events.const";
import * as fs from "fs";

const url: string = EnvFileHandler.getEnvValue(envKeys.SERVER_URL)!;
const socket = io(url, { autoConnect: true });

socket.on("connect", () => {
  socket.emit("LOCAL_CLIENT:REGISTER_TO_LISTENER", {
    uuid: EnvFileHandler.getEnvValue(envKeys.UUID)!,
  });
  console.log("connected");
});

const eventListeners = { ...EmailListenerEvents };

for (const key in eventListeners) {
  if (Object.prototype.hasOwnProperty.call(eventListeners, key)) {
    const { name: eventName, callback } =
      eventListeners[key as keyof typeof eventListeners];

    socket.on(eventName, callback);
  }
}

process.on("uncaughtException", function (err) {
  fs.writeFile("/Users/joe/test.txt", "Caught exception: " + err, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });

  console.log("Caught exception: " + err);
});
