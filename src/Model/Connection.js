import sql from "mssql";

const config = {
    user: "sa",
    password: "s3rv3r",
    server: "DESKTOP-DQC08B4",
    database: "RoadMap2025",
    options: {
        encrypt: true, // Requerido para conexiones seguras
        enableArithAbort: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10,  // ✅ ConnectionLimit: Máximo número de conexiones activas
        min: 1,   // Mínimo de conexiones
        idleTimeoutMillis: 30000, // Tiempo antes de cerrar una conexión inactiva
    }
};

// 📌 Creación del pool de conexiones
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("✅ Conexión a SQL Server exitosa.");
        return pool;
    })
    .catch(err => {
        console.error("❌ Error al conectar con SQL Server:", err);
        throw err;
    });

// 📌 Métodos de la base de datos (Optimizado con `poolPromise`)
const db = {
    // 🟢 Buscar usuario por email
    async findByEmail(email) {
        try {
            let pool = await poolPromise;
            let result = await pool.request()
                .input("email", sql.VarChar, email)
                .query("SELECT * FROM users WHERE email = @email");

            return result.recordset[0];
        } catch (error) {
            console.error("❌ Error al buscar usuario por email:", error.message);
            throw error;
        }
    },

    // 🟡 Crear un nuevo usuario
    async createUser(name, email, hashedPassword) {
        try {
            let pool = await poolPromise;
            let result = await pool.request()
                .input("name", sql.VarChar, name)
                .input("email", sql.VarChar, email)
                .input("password", sql.VarChar, hashedPassword)
                .query("INSERT INTO users (name, email, password) VALUES (@name, @email, @password)");

            return result;
        } catch (error) {
            console.error("❌ Error al crear usuario:", error.message);
            throw error;
        }
    },

    // 🔵 Ejecutar consulta directa (Para otros casos)
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
