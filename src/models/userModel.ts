import { RowDataPacket } from "mysql2/promise";
import pool from "../config/database";
import bcrypt from "bcryptjs";

export interface User {
  id?: number;
  name: string;
  email: string;
  dob: string;
  password: string;
}

export const createUser = async (user: User) => {
  const conn = await pool.getConnection();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const [result] = await conn.query(
    "INSERT INTO users (name, email, dob, password) VALUES (?, ?, ?, ?)",
    [user.name, user.email, user.dob, hashedPassword]
  );
  conn.release();
  return result;
};

export const findUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const conn = await pool.getConnection();
  const [rows] = await conn.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  conn.release();
  return rows.length > 0 ? (rows[0] as User) : undefined;
};
