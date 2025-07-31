import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // obligatorio para SSL en Supabase
  },
});

pool.connect()
  .then(() => {
    console.log('✅ Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('❌ Error al conectar:', err);
  });

  export default pool;