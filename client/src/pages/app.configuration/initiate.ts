function checkEnvFile(): boolean {
  //verifier si toutes les variables sont definies dans le fichier .env
  return true;
}

async function firstRequest(): Promise<string> {
  // token navigateur connu
  // token Matcha active
  //verifier token user si existe
  // geolocalisation
  return 'Serveur activé';
}

export default async function initializeMatcha(): Promise<string> {
  if (!checkEnvFile()) {
    return 'Erreur: Fichier .env manquant';
  }
  const server = await firstRequest();
  if (server !== 'Serveur activé') {
    return 'Erreur: Serveur désactivé';
  }
  return 'ok';
}
