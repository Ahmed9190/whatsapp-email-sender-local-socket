const Service = require("node-windows").Service;

const svc = new Service({
  name: "whatsapp-email-sender-local-windows-7",
  description:
    "whatsapp-email-sender-local-windows-7 service description goes here.",
  script:
    "D:\\Programming\\Web-scraping\\whatsapp-email-sender\\whatsapp-email-sender-local-windows-7\\dist\\index.js",
});

svc.on("uninstall", function () {
  console.log("Uninstalled!");
});

svc.uninstall();
