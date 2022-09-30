import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  port: 25, // true for 465, false for other ports
  host: "smtp.freesmtpservers.com",
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
});
