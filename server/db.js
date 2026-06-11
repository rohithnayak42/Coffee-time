import pg from 'pg';
import dns from 'dns';

// Force Node.js to use Google DNS (bypasses broken local DNS)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const { Pool } = pg;

const connectionString = 'postgresql://neondb_owner:npg_okJdbcfy5OZ9@ep-frosty-night-aoxz9bnl-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
