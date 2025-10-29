-- Crear la base de datos
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'RoadMap2025')
BEGIN
    CREATE DATABASE RoadMap2025;
END
GO

USE RoadMap2025;

GO

-- Tabla de proyectos
IF OBJECT_ID('Proyectos', 'U') IS NULL
BEGIN
    CREATE TABLE Proyectos (
        IdProyecto INT IDENTITY(1,1) PRIMARY KEY,
        NombreProy VARCHAR(100) NOT NULL,
        DescProy VARCHAR(255),
        LenguajeProy VARCHAR(50),
        HorasInvertidas INT
    );
END
GO

-- Tabla de algoritmos
IF OBJECT_ID('Algoritmos', 'U') IS NULL
BEGIN
    CREATE TABLE Algoritmos (
        IdAlgoritmo INT IDENTITY(1,1) PRIMARY KEY,
        EnunciadoAlgor VARCHAR(255) NOT NULL,
        LenguajeSolucion VARCHAR(50),
        SolucionRuta VARCHAR(255)
    );
END
GO

PRINT '✅ Script init.sql ejecutado correctamente';
GO
