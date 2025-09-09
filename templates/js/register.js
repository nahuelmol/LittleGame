
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Detiene el envío del formulario tradicional

        // URL de tu API de backend. Cambia esta URL a la que corresponda.
        // const apiUrl = 'https://tu-api.com/upload-endpoint'; 

        const apiUrl = "http://127.0.0.1:8000/api/create-data-set"

        const nmo = document.querySelector('input[name="nmo"]');
        const ffi = document.querySelector('input[name="ffilter"]');
        const anx = document.querySelector('input[name="anex"]');

        if (nmo.checked){
            console.log("nmo")
        }

        // Crea un objeto FormData a partir del formulario HTML.
        // Esto automáticamente incluye todos los campos,
        // ¡incluso el archivo binario!
        const formData = new FormData(form);

        try {
            // Usa 'fetch' para enviar los datos. 'fetch' se encarga
            // de configurar el encabezado 'Content-Type' correctamente.
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Si la respuesta es exitosa (código 200-299)
                const result = await response.json();
                console.log('succesful upload', result);
                alert('form sent sucesfuly.');
            } else {
                // Si hay un error en la respuesta del servidor
                const error = await response.json();
                console.error('Err uploading:', error);
                alert(`Err: ${error.message}`);
            }
        } catch (error) {
            // Si hay un problema de conexión a la red
            console.error('Connection err: ', error);
            alert('Connection cannot be done');
        }
    });
});
