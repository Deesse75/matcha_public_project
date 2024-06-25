import { mysqlDb } from "./mysql.init.js";

export default async function disconnect(): Promise<void> {
  try {
    await mysqlDb.end();
    return;
  } catch (error) {
    throw new Error('>> Error disconnecting from MySQL <<');
  }
};
