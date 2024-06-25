import isConnectDb from '../middleware/mysql.validation.js';
import connectDatabase, { mysqlDb } from './mysql.init.js';
import { listSchema, userSchema } from './mysql.schemas.js';
import fs from 'fs';

export default async function disconnect(): Promise<void> {
  await mysqlDb.end();
  return;
}

export async function initializeDatabase(): Promise<boolean> {
  let ret: boolean = false;
  while (!ret) {
    ret = await connectDatabase();
  }
  console.log('Connected to MySQL');
  await createDatabase();
  if (!(await isConnectDb())) return false;
  await createTables();
  await fakeData();
  return true;
}

export async function createDatabase(): Promise<void> {
  const db = process.env.MYSQL_DATABASE;
  const query = `CREATE DATABASE IF NOT EXISTS ${db}`;
  await mysqlDb.query(query);
}

export async function createTables(): Promise<void> {
  const queryUser = `CREATE TABLE IF NOT EXISTS User ${userSchema}`;
  const queryList = `CREATE TABLE IF NOT EXISTS List ${listSchema}`;
  await mysqlDb.query(queryUser);
  await mysqlDb.query(`SELECT * FROM User`);
  await mysqlDb.query(queryList);
  await mysqlDb.query(`SELECT * FROM List`);
}

export async function fakeData(): Promise<void> {
  if (
    fs.existsSync('./src/mysql/mysql_users.json') === false ||
    fs.existsSync('./src/mysql/mysql_list.json') === false
  )
    return;

  const userData = JSON.parse(
    fs.readFileSync('./src/mysql/mysql_users.json', 'utf8'),
  );
  const listData = JSON.parse(
    fs.readFileSync('./src/mysql/mysql_list.json', 'utf8'),
  );

  userData.forEach(async (user: any) => {
    //Verify if data already exists
    const queryCheck = `SELECT COUNT(*) AS count FROM User WHERE username = ? OR email = ?`;
    const [rows]: any = await mysqlDb.query(queryCheck, [
      user.username,
      user.email,
    ]);
    //Insert data if not exists
    if (rows[0].count === 0) {
      const queryUser = `INSERT INTO User SET ?`;
      await mysqlDb.query(queryUser, user);
    }
  });

  listData.forEach(async (list: any) => {
    //Verify if data already exists
    const queryCheck = `SELECT COUNT(*) AS count FROM List WHERE userSenderId = ?`;
    const [rows]: any = await mysqlDb.query(queryCheck, list.userSenderId);
    //Insert data if not exists
    if (rows[0].count === 0) {
      const queryList = `INSERT INTO List SET ?`;
      await mysqlDb.query(queryList, list);
    }
  });
}
