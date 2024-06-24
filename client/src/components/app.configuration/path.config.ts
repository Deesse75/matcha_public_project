const PORT = import.meta.env.VITE_PORT_BACK;
const HOST = import.meta.env.VITE_HOST_BACK;
const PATH = `http://${HOST}:${PORT}`;

export const appRoute = {
  geoloc: 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&',
  init: `${PATH}/app/init`,
  signin: `${PATH}/auth/signin`,
  signup: `${PATH}/auth/signup`,
  validateEmail: `${PATH}/auth/validate_email`,
  validatePassCode: `${PATH}/auth/validate_passcode`,
  resendEmail: `${PATH}/auth/resend_email`,
  forgotPassword: `${PATH}/auth/forgot_password`,
  reinitPassword: `${PATH}/auth/reinit_password`,
  getMe: `${PATH}/user/get_me`,
  signout: `${PATH}/user/signout`,
  delete: `${PATH}/user/delete`,
  stats: `${PATH}/display/stats`,
  getList: `${PATH}/display/get_list`,
  getOneProfile: `${PATH}/display/get_one_profile`,
  updateFirstname: `${PATH}/user/updateFirstname`,
  updateLastname: `${PATH}/user/updateLastname`,
  updateUsername: `${PATH}/user/updateUsername`,
  updateEmail: `${PATH}/user/updateEmail`,
  updateValideEmail: `${PATH}/user/updateValideEmail`,
  updatePassword: `${PATH}/user/updatePassword`,
  updateProfile: `${PATH}/user/updateProfile`,
};

export const appRedir = {
  loading: '/',
  signin: '/connexion',
  signup: '/inscription',
  signout: '/deconnexion',
  delete: '/suppression',
  validateEmail: '/validation_email',
  resendEmail: '/renvoyer_lien_validation_email',
  forgotPassword: '/mot_de_passe_oublie',
  errorServer: '/erreur_server',
  errorInternal: '/erreur_interne',
  getMe: '/données_utilisateur',
  initProfile: '/initialisation_profil',
  home: '/accueil',
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
