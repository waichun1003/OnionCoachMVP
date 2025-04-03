import { pool } from './db/db'

async function testConnection() {
  try {
    const result = await pool.query('SELECT current_user, current_database()')
    console.log('Connected as:', result.rows[0])
    
    const articleTest = await pool.query('SELECT COUNT(*) FROM "Article"')
    console.log('Article count:', articleTest.rows[0].count)
  } catch (error) {
    console.error('Database connection error:', error)
  } finally {
    await pool.end()
  }
}

testConnection() 