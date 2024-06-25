import isConnectDb from "../middleware/mysql.validation.js";
import { mysqlDb } from "./mysql.init.js";

export default async function disconnect(): Promise<void> {
  try {
    await mysqlDb.end();
    return;
  } catch (error) {
    throw new Error('>> Error disconnecting from MySQL <<');
  }
};

export async function createDatabase(): Promise<boolean> {
  const db = process.env.MYSQL_DATABASE;
  const query = `CREATE DATABASE IF NOT EXISTS ${db}`;
  await mysqlDb.query(query);
  return isConnectDb();
};
