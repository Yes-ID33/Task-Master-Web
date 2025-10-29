### 🚀 Descripción

Task Master Web es una aplicación full-stack con backend Express y base de datos SQL Server, dockerizada para facilitar el desarrollo local. Este proyecto incluye un script de inicialización (`init.sql`) que crea la base de datos y sus tablas automáticamente.

---

### 🧱 Estructura de servicios (`docker-compose.yml`)

```yaml
services:
  app:         # Backend Express
  db:          # SQL Server
  db-init:     # Script de inicialización (crea la base y tablas)
```

---

### 🛠️ Requisitos

- Docker y Docker Compose instalados
- Puerto `1433` libre para SQL Server
- Archivo `.env` en la raíz con:

```env
DB_SERVER=db
DB_USER=sa
DB_PASSWORD=S3rv3r123!
DB_DATABASE=RoadMap2025
```

---

### ⚙️ Comandos de arranque (orden correcto)

#### 1. 🔧 Construir y levantar solo la base de datos y el script de inicialización

```bash
docker compose up --build db db-init
```

Esto:

- Levanta SQL Server (`db`)
- Ejecuta el script `init.sql` desde `db-init`
- Crea la base `RoadMap2025` y sus tablas

 Espera a ver en los logs:

``` bash
Changed database context to 'RoadMap2025'.
Script init.sql ejecutado
```

#### 2. 🛑 Detener servicios una vez creada la base

Presiona `Ctrl + C` para detener los contenedores. Esto es seguro porque la base ya fue creada y persistirá en el volumen `sqlvolume`.

#### 3. 🚀 Levantar el backend (`tareas-app`)

```bash
docker compose up --build app
```
Esto inicia el servidor Express y conecta con la base ya existente.

### 🧼 Para reiniciar desde cero

Si quieres borrar todo y empezar limpio:

```bash
docker compose down -v --remove-orphans
```