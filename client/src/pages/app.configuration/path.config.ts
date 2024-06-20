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
  signupSuccess: '/attente_de_validation',
  resetSuccess: '/mot_de_passe_reinitialise',
  validateEmail: '/validation_email',
  resendEmail: '/renvoyer_lien_validation_email',
  forgot: '/mot_de_passe_oublie',
  reset: '/reinitialiser_mot_de_passe',
  errorServer: '/erreur_server',
  errorInternal: '/erreur_interne',
  getMe: 'données_utilisateur',
  initProfile: '/initialisation_profil',
  home: '/accueil',
  signout: '/deconnexion',
};

export const bgc = [
  {
    img: './background/10060.jpg',
    author: 'pch.vector',
    site: 'http://www.freepik.com',
  },
  {
    img: './background/6006133.jpg',
    author: 'pch.vector',
    site: 'http://www.freepik.com',
  },
  {
    img: './background/5608639.jpg',
    author: 'pch.vector',
    site: 'http://www.freepik.com',
  },
  {
    img: './background/vecteezy_cartoon-couple-talking-and-drinking-wine-sitting-at-chair_8739125.jpg',
    author: 'Art Vectors by Vecteezy',
    site: 'https://www.vecteezy.com/free-vector/art',
  },
];
