import { ListenerEvents } from "../../../core/interfaces/listener-events";
import { EmailFacade } from "../email-facade";

const emailFacade = new EmailFacade();

export const EmailListenerEvents: ListenerEvents = {
  update: {
    name: "SERVER:EMAIL_UPDATE",
    callback: emailFacade.update,
  },
  send: {
    name: "SERVER:EMAIL_SEND",
    callback: emailFacade.send,
  },
};
