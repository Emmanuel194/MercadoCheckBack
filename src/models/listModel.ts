import { RowDataPacket } from "mysql2/promise";
import pool from "../config/database";

export interface List {
  id?: number;
  user_id: number;
  name: string;
  items: string;
}

export const createList = async (list: List) => {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "INSERT INTO lists (user_id, name, items) VALUES (?, ?, ?)",
    [list.user_id, list.name, list.items]
  );
  conn.release();
  return result;
};

export const getUserLists = async (user_id: number): Promise<List[]> => {
  const conn = await pool.getConnection();
  const [rows] = await conn.query<RowDataPacket[]>(
    "SELECT * FROM lists WHERE user_id = ?",
    [user_id]
  );
  conn.release();
  return rows as List[];
};

export const updateList = async (id: number, name: string, items: string) => {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "UPDATE lists SET name = ?, items = ? WHERE id = ? AND is_active = TRUE",
    [name, items, id]
  );
  conn.release();
  return result;
};

export const inactivateList = async (id: number) => {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "UPDATE lists SET is_active = FALSE WHERE id = ?",
    [id]
  );
  conn.release();
  return result;
};
