import pg from 'pg';

// DB와의 연결 통
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

export default pool;