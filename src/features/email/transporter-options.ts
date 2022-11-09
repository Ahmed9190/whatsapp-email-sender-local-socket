import SMTPTransport from "nodemailer/lib/smtp-transport";

export class TransporterOptions {
  public static google = function (
    email: string,
    password: string
  ): SMTPTransport.Options {
    return {
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: email,
        pass: password,
      },
    };
  };

  public static microsoft = function (
    email: string,
    password: string
  ): SMTPTransport.Options {
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
      },
    };
  };
}

export type EmailService = "google" | "microsoft";
