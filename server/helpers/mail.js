import { createTransport } from "nodemailer";

export function generateMailTransporter() {
  return createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    }
  });
}