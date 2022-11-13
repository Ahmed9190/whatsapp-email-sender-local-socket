import SMTPTransport from "nodemailer/lib/smtp-transport";

export const TransporterOptions = {
  google: function (email: string, password: string): SMTPTransport.Options {
    return {
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: email,
        pass: password,
      },
    };
  },

  microsoft: function (email: string, password: string): SMTPTransport.Options {
    return {
      host: "outlook.office365.com",
      port: 587,
      secure: false,
      requireTLS: true,
      service: "Outlook365",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    };
  },

  zoho: function (email: string, password: string): SMTPTransport.Options {
    return {
      host: "smtp.zoho.com",
      secure: true,
      port: 465,
      auth: {
        user: email,
        pass: password,
      },
    };
  },
};

export type EmailService = keyof typeof TransporterOptions;
