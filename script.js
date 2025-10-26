document.getElementById("formCambio").addEventListener("submit", async function (event) {
    event.preventDefault();

    const monedaOrigen = document.getElementById("monedaOrigen").value;
    const monedaDestino = document.getElementById("monedaDestino").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const resultadoDiv = document.getElementById("resultado");

    // Tu API key personalizada
    const API_KEY = "bb86deff6b2b60cab7348948";

    // Validación básica
    if (!monedaOrigen || !monedaDestino || isNaN(monto)) {
        resultadoDiv.textContent = "Por favor, complete todos los campos correctamente.";
        resultadoDiv.classList.add("text-danger");
        return;
    }

    // Mostrar mensaje de carga
    resultadoDiv.textContent = "Consultando tasa de cambio...";
    resultadoDiv.classList.remove("text-danger");
    resultadoDiv.classList.remove("text-success");

    try {
        // URL de la API con tu key y moneda de origen
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${monedaOrigen}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.result !== "success") {
            throw new Error("Error en la respuesta de la API.");
        }

        const tasa = datos.conversion_rates[monedaDestino];
        const montoConvertido = (monto * tasa).toFixed(2);

        resultadoDiv.classList.add("text-success");
        resultadoDiv.textContent = `${monto} ${monedaOrigen} = ${montoConvertido} ${monedaDestino}`;

    } catch (error) {
        resultadoDiv.classList.add("text-danger");
        resultadoDiv.textContent = "Error al obtener los datos de la API. Verifique su conexión o API key.";
        console.error(error);
    }
});
