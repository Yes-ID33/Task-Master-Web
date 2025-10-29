import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 1,
    idleTimeoutMillis: 30000
  }
};

const MAX_RETRIES = 10;
const RETRY_DELAY = 3000;

async function connectWithRetry(attempt = 1) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    console.log("✅ Conexión a SQL Server exitosa.");
    return pool;
  } catch (err) {
    console.error(`❌ Intento ${attempt} fallido:`, err.message);
    if (attempt < MAX_RETRIES) {
      await new Promise(res => setTimeout(res, RETRY_DELAY));
      return connectWithRetry(attempt + 1);
    } else {
      throw new Error("❌ No se pudo conectar a SQL Server después de varios intentos.");
    }
  }
}

const poolPromise = connectWithRetry();

const db = {
  async query(sqlQuery, params = {}) {
    try {
      let pool = await poolPromise;
      let request = pool.request();

      for (const param in params) {
        request.input(param, params[param].type, params[param].value);
      }

      let result = await request.query(sqlQuery);
      return result.recordset;
    } catch (error) {
      console.error("❌ Error en consulta SQL:", error.message);
      throw error;
    }
  }
};

export { poolPromise, sql };
export default db;
