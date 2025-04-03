import { pool } from './db'

export async function initializeDatabase() {
  const client = await pool.connect()
  try {
    // Acquire exclusive lock
    await client.query('BEGIN')
    
    // Drop and recreate tables
    await client.query(`
      DROP TABLE IF EXISTS campaign_tags CASCADE;
      DROP TABLE IF EXISTS campaigns CASCADE;
      
      CREATE TABLE campaigns (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        cover_image VARCHAR(255),
        coach VARCHAR(255) NOT NULL,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        max_participants INTEGER NOT NULL,
        current_participants INTEGER DEFAULT 0,
        duration VARCHAR(50) NOT NULL,
        sessions INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'upcoming' NOT NULL,
        campaign_goals TEXT[] NOT NULL,
        target_audience TEXT NOT NULL,
        budget VARCHAR(50) NOT NULL,
        timeline VARCHAR(50) NOT NULL,
        preferred_channels TEXT[] NOT NULL,
        message_style VARCHAR(255) NOT NULL,
        kpis TEXT[] NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP
      );

      CREATE TABLE campaign_tags (
        campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
        tag VARCHAR(50) NOT NULL,
        PRIMARY KEY (campaign_id, tag)
      );
    `)

    // Insert sample data
    await client.query(`INSERT INTO campaigns (...) VALUES (...);`)
    
    // Insert tags
    await client.query(`
      INSERT INTO campaign_tags (campaign_id, tag)
      SELECT id, unnest(ARRAY['Leadership', 'Management', 'Development'])
      FROM campaigns WHERE status = 'active';
    `)

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error initializing database:', error)
  } finally {
    client.release()
  }
} 