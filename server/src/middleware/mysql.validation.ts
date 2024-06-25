import { mysqlDb } from '../mysql/mysql.init.js';

export default async function isConnectDb(): Promise<boolean> {
  const query = 'CREATE DATABASE IF NOT EXISTS ?';
  const values = [process.env.MYSQL_DATABASE];
  const connect = await mysqlDb.query(query, values);
  if (connect && (connect[0] as unknown as string).length > 0) return true;
  return false;
}
