import nodemailer from "nodemailer";
import { logger } from "../logger";

export function createMailer({user, password}: {user: string, password: string}){
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: password,
    },
  });

  async function sendEmail(receiver: string, subject: string, text: string) {
    const info = await transporter.sendMail({
      from: user,
      to: receiver,
      subject,
      text,
    });

    return info;
  }

  const sendEmailLogger = logger(
    sendEmail,
    ({ timing }) => `Email sent at ${timing.end}`
  );

  return {sendEmail, sendEmailLogger}
}
