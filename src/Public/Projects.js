document.addEventListener("DOMContentLoaded", async function() {
    await cargarProyectos();
});

// 🟢 Función para cargar proyectos desde la API
async function cargarProyectos() {
    try {
        let response = await fetch("/mis-proyectos");
        let proyectos = await response.json();
        let tabla = document.getElementById("tabla-proyectos");

        tabla.innerHTML = ""; // ✅ Limpia la tabla antes de agregar nuevos datos

        proyectos.forEach(proyecto => {
            let row = `<tr>
                <td>${proyecto.IdProyecto}</td>
                <td>${proyecto.NombreProy}</td>
                <td>${proyecto.DescProy}</td>
                <td>${proyecto.LenguajeProy}</td>
                <td>${proyecto.HorasInvertidas}</td>
                <td>
                    <button class="btn-update" onclick="cargarProyecto(${proyecto.IdProyecto})">Editar</button>
                    <button class="btn-danger" onclick="eliminarProyecto(${proyecto.IdProyecto})">Eliminar</button>
                </td>
            </tr>`;
            tabla.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
    }
}

// 🟡 Función para cargar datos en el formulario al editar
async function cargarProyecto(id) {
    try {
        let response = await fetch(`/proyecto/${id}`);
        let proyecto = await response.json();

        document.getElementById("id-proyecto").value = proyecto.IdProyecto;
        document.getElementById("nombre").value = proyecto.NombreProy;
        document.getElementById("descripcion").value = proyecto.DescProy;
        document.getElementById("lenguaje").value = proyecto.LenguajeProy;
        document.getElementById("horas").value = proyecto.HorasInvertidas;
    } catch (error) {
        console.error("Error al cargar proyecto:", error);
    }
}

// 🔴 Función para eliminar proyectos con confirmación
async function eliminarProyecto(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar este proyecto?")) return;

    try {
        let response = await fetch("/delete-proyecto", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ IdProyecto: id })
        });

        if (response.ok) {
            alert("Proyecto eliminado exitosamente.");
            cargarProyectos();
        } else {
            alert("Error al eliminar proyecto.");
        }
    } catch (error) {
        console.error("Error al eliminar proyecto:", error);
    }
}

// 🟢 Función para guardar o actualizar proyecto
document.getElementById("project-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // ✅ Evita recarga de página

    let id = document.getElementById("id-proyecto").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let lenguaje = document.getElementById("lenguaje").value;
    let horas = document.getElementById("horas").value;

    let endpoint = id ? `/update-proyecto/${id}` : "/proyectos";
    let metodo = id ? "PUT" : "POST";

    try {
        let response = await fetch(endpoint, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ NombreProy: nombre, DescProy: descripcion, LenguajeProy: lenguaje, HorasInvertidas: horas })
        });

        if (response.ok) {
            alert(id ? "Proyecto actualizado correctamente." : "Proyecto agregado correctamente.");
            cargarProyectos();
            document.getElementById("project-form").reset();
        } else {
            alert("Error al guardar proyecto.");
        }
    } catch (error) {
        console.error("Error al guardar proyecto:", error);
    }
});
