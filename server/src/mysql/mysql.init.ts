import mysql2 from 'mysql2/promise';

export const mysqlDb = mysql2.createPool({
  host: process.env.MYSQL_HOST || '',
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
});

export default async function connectDatabase(): Promise<boolean> {
  const connect = await mysqlDb.getConnection();
  if (connect) return true;
  return false;
}
