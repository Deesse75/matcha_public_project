import { transporter } from './mailer.config.js';

export const sendEmail = (to: string, subject: string, text: string): void => {
  transporter.sendMail(
    {
      from: `no-reply <${process.env.MAILER_EMAIL}>`,
      to: to,
      subject: subject,
      html: text,
    },
    (error, info) => {
      if (error) {
        throw new Error(error.message);
      }
    },
  );
};

export const validateEmailText = (token: string) => {
  return `
  <p>Bonjour et bienvenue sur Matcha,</p>
  </br>
  <p>Pour valider votre compte, veuillez cliquer sur le lien ci-dessous:</p>
  <p><a href="${process.env.VALIDATE_ROUTE}?token=${token}">Valider mon compte</a></p>
  </br>
  <p>Si vous n'avez pas créé de compte sur Matcha, veuillez ignorer cet email.</p>
  </br>
  <p>L'équipe Matcha</p>
  `;
};

export const sendEmailCode = (num: number) => {
  const numberToString = num.toString();
  const code = `${numberToString[0]}  ${numberToString[1]}  ${numberToString[2]}  ${numberToString[3]}  ${numberToString[4]}  ${numberToString[5]}`;
  return `
  <p>Bonjour,</p>
  </br>
  <p>Pour valider votre nouvelle adresse email, renseigner les chiffres ci-dessous:</p>
  <p style="font-size: 25px; text-align: center;" >${code}</p>
  </br>
  <p>Si vous n'avez pas demandé le changement de votre adresse email, veuillez ignorer cet email.</p>
  </br>
  <p>L'équipe Matcha</p>
  `;
};
export const sendPasswordCode = (num: number) => {
  const numberToString = num.toString();
  const code = `${numberToString[0]}  ${numberToString[1]}  ${numberToString[2]}  ${numberToString[3]}  ${numberToString[4]}  ${numberToString[5]}`;
  return `
  <p>Bonjour,</p>
  </br>
  <p>Afin de modifier votre mot passe, renseigner les chiffres ci-dessous:</p>
  <p style="font-size: 25px; text-align: center;" >${code}</p>
  </br>
  <p>Si vous n'avez pas demandé le changement de votre adresse email, veuillez ignorer cet email.</p>
  </br>
  <p>L'équipe Matcha</p>
  `;
};
