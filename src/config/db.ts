import pg from 'pg';

const createClient = () => {
  const client = new pg.Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();

  return client;
}

export { createClient };
