const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')

async function run() {
  const dbType = process.env.DB_TYPE || 'json'
  if (dbType !== 'mysql') {
    console.log('DB_TYPE != mysql; skipping migrations')
    return
  }
  const host = process.env.DB_HOST || 'localhost'
  const user = process.env.DB_USER || 'root'
  const password = process.env.DB_PASSWORD || ''
  const database = process.env.DB_NAME || 'notesdb'
  const connection = await mysql.createConnection({ host, user, password, database })
  try {
    const sqlPath = path.resolve(__dirname, '../migrations/notes_init.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    for (const stmt of sql.split(';').map(s => s.trim()).filter(Boolean)) {
      await connection.query(stmt)
    }
    console.log('Migrations run')
  } finally {
    await connection.end()
  }
}
run().catch(e => {
  console.error(e)
  process.exit(1)
})
