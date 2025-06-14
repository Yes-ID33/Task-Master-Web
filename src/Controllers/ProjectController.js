import { poolPromise, sql } from '../Model/Connection.js';

const ProjectController = {
    //todos los proyectos
    async getProjects(req, res){
        try {
            let pool = await poolPromise;
            let result = await pool.request().query("SELECT * FROM Proyectos");
            res.json(result.recordset);
        } catch (error) {
            console.error("Error al obtener los proyectos :", error);
            res.status(500).json({ error: "Error en el servidor"});
        }
    },

    //proyecto por ID
    async getProjectById(req, res){
        try {
            const { IdProyecto } = req.params;
            let pool = await poolPromise;
            let result = await pool.request()
                .input("IdProyecto", sql.Int, IdProyecto)
                .query("SELECT * FROM Proyectos WHERE IdProyecto = @IdProyecto");
            
            if(!result.recordset.length){
                return res.status(404).json({ error: "Proyecto no encontrado"});
            }
            res.json(result.recordset[0]);
        } catch (error) {
            console.error("Error al obtener el proyecto :", error);
            res.status(500).json({ error: "Error en el servidor"});
        }
    },

    //crear nuevo proyecto
    async addProject(req, res){
        try {
            const { NombreProy, DescProy, LenguajeProy, HorasInvertidas } = req.body;
            let pool = await poolPromise;
            let result = await pool.request()
                .input("NombreProy", sql.VarChar, NombreProy)
                .input("DescProy", sql.VarChar, DescProy)
                .input("LenguajeProy", sql.VarChar, LenguajeProy)
                .input("HorasInvertidas", sql.Int, HorasInvertidas)
                .query("INSERT INTO Proyectos (NombreProy, DescProy, LenguajeProy, HorasInvertidas) VALUES (@NombreProy, @DescProy, @LenguajeProy, @HorasInvertidas)");
            res.json({ message: "Proyecto guardado exitosamente."});
        } catch (error) {
            console.error("Error al crear el proyecto:", error);
            res.status(500).json({ error: "Error en el servidor"});    
        }
    },

    //actualizar proyecto existente
    async updateProject(req, res){
        try {
            const { IdProyecto } = req.params;
            const { NombreProy, DescProy, LenguajeProy, HorasInvertidas } = req.body;
            let pool = await poolPromise;
            await pool.request()
                .input("IdProyecto", sql.Int, IdProyecto)
                .input("NombreProy", sql.VarChar, NombreProy)
                .input("DescProy", sql.VarChar, DescProy)
                .input("LenguajeProy", sql.VarChar, LenguajeProy)
                .input("HorasInvertidas", sql.Int, HorasInvertidas)
                .query("UPDATE Proyectos SET NombreProy = @NombreProy, DescProy = @DescProy, LenguajeProy = @LenguajeProy, HorasInvertidas = @HorasInvertidas WHERE IdProyecto = @IdProyecto");
            
            res.json({ message: "Proyecto actualizado correctamente"});
        } catch (error) {
            console.error("Error al actualizar el proyecto:", error);
            res.status(500).json({ error: "Error en el servidor"});
        }
    },

    //eliminar un proyecto existente
    async deleteProject (req, res){
        try {
            const { IdProyecto } = req.body;
            let pool = await poolPromise;
            await pool. request()
                .input("IdProyecto", sql.Int, IdProyecto)
                .query("DELETE FROM Proyectos WHERE IdProyecto = @IdProyecto");
            res.json({ message: "Proyecto eliminado correctamente"});
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
            res.status(500).json({ error: "Error en el servidor"});
        }
    }
};

export default ProjectController;