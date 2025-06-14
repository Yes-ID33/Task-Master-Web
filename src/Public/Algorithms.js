document.addEventListener("DOMContentLoaded", async function() {
    await cargarAlgoritmos();
});

// 🟢 Función para cargar algoritmos desde la API
async function cargarAlgoritmos() {
    try {
        let response = await fetch("/mis-algoritmos");
        let algoritmos = await response.json();
        let tabla = document.getElementById("tabla-algoritmos");

        tabla.innerHTML = ""; // Limpiar tabla antes de cargar datos
        algoritmos.forEach(algoritmo => {
            let row = `<tr>
                <td>${algoritmo.IdAlgoritmo}</td>
                <td>${algoritmo.EnunciadoAlgor}</td>
                <td>${algoritmo.LenguajeSolucion}</td>
                <td>${algoritmo.SolucionRuta}</td>
                <td>
                    <button class="btn-update" onclick="cargarAlgoritmo(${algoritmo.IdAlgoritmo})">Editar</button>
                    <button class="btn-danger" onclick="eliminarAlgoritmo(${algoritmo.IdAlgoritmo})">Eliminar</button>
                </td>
            </tr>`;
            tabla.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al obtener algoritmos:", error);
    }
}

// 🟡 Función para cargar datos en el formulario al editar
async function cargarAlgoritmo(id) {
    try {
        let response = await fetch(`/algoritmo/${id}`);
        let algoritmo = await response.json();

        document.getElementById("id-algoritmo").value = algoritmo.IdAlgoritmo;
        document.getElementById("enunciado").value = algoritmo.EnunciadoAlgor;
        document.getElementById("lenguaje").value = algoritmo.LenguajeSolucion;
        document.getElementById("ruta").value = algoritmo.SolucionRuta;
    } catch (error) {
        console.error("Error al cargar algoritmo:", error);
    }
}

// 🔴 Función para eliminar algoritmos con confirmación
async function eliminarAlgoritmo(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar este algoritmo?")) return;

    try {
        let response = await fetch("/delete-algoritmo", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ IdAlgoritmo: id })
        });

        if (response.ok) {
            alert("Algoritmo eliminado exitosamente.");
            cargarAlgoritmos();
        } else {
            alert("Error al eliminar algoritmo.");
        }
    } catch (error) {
        console.error("Error al eliminar algoritmo:", error);
    }
}

// 🟢 Función para guardar o actualizar algoritmo
document.getElementById("algorithm-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita recarga de página

    let id = document.getElementById("id-algoritmo").value;
    let enunciado = document.getElementById("enunciado").value;
    let lenguaje = document.getElementById("lenguaje").value;
    let ruta = document.getElementById("ruta").value;

    let endpoint = id ? `/update-algoritmo/${id}` : "/algoritmos";
    let metodo = id ? "PUT" : "POST";

    try {
        let response = await fetch(endpoint, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ EnunciadoAlgor: enunciado, LenguajeSolucion: lenguaje, SolucionRuta: ruta })
        });

        if (response.ok) {
            alert(id ? "Algoritmo actualizado correctamente." : "Algoritmo agregado correctamente.");
            cargarAlgoritmos();
            document.getElementById("algorithm-form").reset();
        } else {
            alert("Error al guardar algoritmo.");
        }
    } catch (error) {
        console.error("Error al guardar algoritmo:", error);
    }
});

function abrirArchivo() {
  const lenguaje = document.getElementById("lenguaje").value;

  if (!lenguaje) {
    alert("Debes seleccionar un lenguaje antes de elegir el archivo.");
    return;
  }

  const input = document.createElement("input");
  input.type = "file";

  input.onchange = (event) => {
    const archivo = event.target.files[0];
    if (!archivo) return;

    let rutaBase;

    switch (lenguaje) {
      case "Python":
        rutaBase = "C:/RoadMap2025/Algoritmos/Ejercicios Python y R/";
        break;
      case "C#":
        rutaBase = "C:/RoadMap2025/Algoritmos/Ejercicios C++ y C#/";
        break;
      case "JavaScript":
        rutaBase = "C:/RoadMap2025/Algoritmos/Ejercicios Js/";
        break;
    }

    const rutaCompleta = rutaBase + archivo.name;
    document.getElementById("ruta").value = rutaCompleta;
  };

  input.click();
}
