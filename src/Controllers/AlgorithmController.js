import { poolPromise, sql } from "../Model/Connection.js";

const AlgorithmController = {
    // 📌 Obtener todos los algoritmos
    async getAlgorithms(req, res) {
        try {
            let pool = await poolPromise;
            let result = await pool.request().query("SELECT * FROM Algoritmos");
            res.json(result.recordset);
        } catch (error) {
            console.error("Error al obtener algoritmos:", error);
            res.status(500).json({ error: "Error en el servidor." });
        }
    },

    // 📌 Obtener algoritmo por ID
    async getAlgorithmById(req, res) {
        try {
            const { IdAlgoritmo } = req.params;
            let pool = await poolPromise;
            let result = await pool.request()
                .input("IdAlgoritmo", sql.Int, IdAlgoritmo)
                .query("SELECT * FROM Algoritmos WHERE IdAlgoritmo = @IdAlgoritmo");

            if (!result.recordset.length) {
                return res.status(404).json({ error: "Algoritmo no encontrado." });
            }
            res.json(result.recordset[0]);
        } catch (error) {
            console.error("Error al obtener algoritmo:", error);
            res.status(500).json({ error: "Error en el servidor." });
        }
    },

    // 📌 Agregar nuevo algoritmo
    async addAlgorithm(req, res) {
        try {
            const { EnunciadoAlgor, LenguajeSolucion, SolucionRuta } = req.body;
            let pool = await poolPromise;
            let result = await pool.request()
                .input("EnunciadoAlgor", sql.VarChar, EnunciadoAlgor)
                .input("LenguajeSolucion", sql.VarChar, LenguajeSolucion)
                .input("SolucionRuta", sql.VarChar, SolucionRuta)
                .query("INSERT INTO Algoritmos (EnunciadoAlgor, LenguajeSolucion, SolucionRuta) VALUES (@EnunciadoAlgor, @LenguajeSolucion, @SolucionRuta)");

            res.json({ message: "Algoritmo añadido exitosamente."});
        } catch (error) {
            console.error("Error al crear algoritmo:", error);
            res.status(500).json({ error: "Error en el servidor." });
        }
    },

    // 📌 Actualizar algoritmo existente
    async updateAlgorithm(req, res) {
        try {
            const { IdAlgoritmo } = req.params;
            const { EnunciadoAlgor, LenguajeSolucion, SolucionRuta } = req.body;
            let pool = await poolPromise;
            await pool.request()
                .input("IdAlgoritmo", sql.Int, IdAlgoritmo)
                .input("EnunciadoAlgor", sql.VarChar, EnunciadoAlgor)
                .input("LenguajeSolucion", sql.VarChar, LenguajeSolucion)
                .input("SolucionRuta", sql.VarChar, SolucionRuta)
                .query("UPDATE Algoritmos SET EnunciadoAlgor = @EnunciadoAlgor, LenguajeSolucion = @LenguajeSolucion, SolucionRuta = @SolucionRuta WHERE IdAlgoritmo = @IdAlgoritmo");

            res.json({ message: "Algoritmo actualizado correctamente." });
        } catch (error) {
            console.error("Error al actualizar algoritmo:", error);
            res.status(500).json({ error: "Error en el servidor." });
        }
    },

    // 📌 Eliminar algoritmo
    async deleteAlgorithm(req, res) {
        try {
            const { IdAlgoritmo } = req.body;
            let pool = await poolPromise;
            await pool.request()
                .input("IdAlgoritmo", sql.Int, IdAlgoritmo)
                .query("DELETE FROM Algoritmos WHERE IdAlgoritmo = @IdAlgoritmo");

            res.json({ message: "Algoritmo eliminado correctamente." });
        } catch (error) {
            console.error("Error al eliminar algoritmo:", error);
            res.status(500).json({ error: "Error en el servidor." });
        }
    }
};

export default AlgorithmController;
