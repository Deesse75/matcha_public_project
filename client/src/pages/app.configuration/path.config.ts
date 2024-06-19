const PORT = import.meta.env.VITE_PORT_BACK;
const HOST = import.meta.env.VITE_HOST_BACK;
const PATH = `http://${HOST}:${PORT}`;

export const appRoute = {
  geoloc: 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&',
  init: `${PATH}/init`,
  signin: `${PATH}/signin`,
  signup: `${PATH}/signup`,
  validateEmail: `${PATH}/validate_email`,
  resendEmail: `${PATH}/resend_email`,
  forgot: `${PATH}/forgot`,
  reset: `${PATH}/reset`,
  ErrorInternal: `${PATH}/error_interne`,
};

export const appRedir = {
  loading: '/',
  signin: '/connexion',
  signup: '/inscription',
  validateEmail: '/validation_email',
  resendEmail: '/renvoyer_lien_validation_email',
  forgot: '/mot_de_passe_oublie',
  reset: '/reinitialiser_mot_de_passe',
  errorServer: '/erreur_server',
  errorInternal: '/erreur_interne',
};
