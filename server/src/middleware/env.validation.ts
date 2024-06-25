export default function validateEnv(): boolean {
  const requiredEnvVars = [
    'DOMAINS_CORS',
    'MYSQL_HOST',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'MYSQL_ROOT_PASSWORD',
    'JWT_SECRET_TOKEN',
    'JWT_SECRET_MAIL',
    'MAILER_EMAIL',
    'MAILER_PASS',
    'MAILER_HOST',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) return false;
  }
  return true;
}