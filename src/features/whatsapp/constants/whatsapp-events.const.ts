import { ListenerEvents } from "../../../core/interfaces/listener-events";
import { WhatsappFacade } from "../whatsapp-facade";

export const WhatsappListenerEvents: ListenerEvents = {
  open: {
    name: "SERVER:WHATSAPP_OPEN",
    callback: WhatsappFacade.open,
  },
  sendMessage: {
    name: "SERVER:WHATSAPP_SEND_MESSAGE",
    callback: WhatsappFacade.sendMessage,
  },
  sendFile: {
    name: "SERVER:WHATSAPP_SEND_FILE",
    callback: WhatsappFacade.sendFile,
  },
  sendFileWithMessage: {
    name: "SERVER:WHATSAPP_SEND_FILE_WITH_MESSAGE",
    callback: WhatsappFacade.sendFileWithMessage,
  },
};
