const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "notesdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function ensureTable() {
  const conn = await pool.getConnection();
  try {
    await conn.query(`CREATE TABLE IF NOT EXISTS notes (
      id VARCHAR(36) PRIMARY KEY,
      title TEXT,
      content TEXT,
      created_at DATETIME,
      updated_at DATETIME
    )`);
  } finally {
    conn.release();
  }
}

module.exports = {
  async create(note) {
    await ensureTable();
    const [r] = await pool.query("INSERT INTO notes SET ?", note);
    return note;
  },
  async findAll() {
    await ensureTable();
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
  },
  async findById(id) {
    await ensureTable();
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
    return rows[0] || null;
  },
  async update(id, updated) {
    await ensureTable();
    const set = Object.assign({}, updated, {
      updated_at: new Date().toISOString(),
    });
    await pool.query("UPDATE notes SET ? WHERE id = ?", [set, id]);
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
    return rows[0] || null;
  },
  async delete(id) {
    await ensureTable();
    const [r] = await pool.query("DELETE FROM notes WHERE id = ?", [id]);
    return r.affectedRows > 0;
  },
};
