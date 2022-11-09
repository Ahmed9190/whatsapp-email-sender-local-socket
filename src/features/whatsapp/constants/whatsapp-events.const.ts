import { ListenerEvents } from "../../../core/interfaces/listener-events";
import { WhatsappFacade } from "../whatsapp-facade";

const whatsappFacade = new WhatsappFacade();

export const WhatsappListenerEvents: ListenerEvents = {
  open: {
    name: "SERVER:WHATSAPP_OPEN",
    callback: whatsappFacade.open,
  },
  sendMessage: {
    name: "SERVER:WHATSAPP_SEND_MESSAGE",
    callback: whatsappFacade.sendMessage,
  },
  sendFile: {
    name: "SERVER:WHATSAPP_SEND_FILE",
    callback: whatsappFacade.sendFile,
  },
};
