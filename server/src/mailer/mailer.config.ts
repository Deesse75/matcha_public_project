import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'smtps',
  host: process.env.MAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,
  },
  pool: true,
});
