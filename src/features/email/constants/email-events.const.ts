import { ListenerEvents } from "../../../core/interfaces/listener-events";
import { EmailFacade } from "../email-facade";

export const EmailListenerEvents: ListenerEvents = {
  update: {
    name: "SERVER:EMAIL_UPDATE",
    callback: EmailFacade.update,
  },
  send: {
    name: "SERVER:EMAIL_SEND",
    callback: EmailFacade.send,
  },
};
