import pg from 'pg';

const createClient = () => {
  const user = process.env.DB_USERNAME;
  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  const password = process.env.DB_PASSWORD;
  const port = process.env.DB_PORT;

  const client = new pg.Client({
    user: user,
    host: host,
    database: database,
    password: password,
    port: Number(port)
  });
  client.connect();

  return client;
}

export {createClient};
