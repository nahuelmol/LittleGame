
var message = document.getElementById('form-state')

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const apiUrl = "http://127.0.0.1:8000/api/create-data-set"
        const nmo = document.querySelector('input[name="nmo"]');
        const ffi = document.querySelector('input[name="ffilter"]');
        const anx = document.querySelector('input[name="anex"]');

        if (nmo.checked){
            console.log("nmo")
        }

        const formData = new FormData(form)

        const formEntries = Array.from(formData.entries());
        const metaEntries = formEntries.filter(([key, value]) => !(value instanceof File));
        const metaObject = Object.fromEntries(metaEntries);
        
        metaObject.nmo      = formData.has('nmo')
        metaObject.anex     = formData.has('anex')
        metaObject.ffilter  = formData.has('ffilter')

        metaObject.order    = Number(formData.get('order'))
        metaObject.cutoff   = Number(formData.get('cutoff'))
        metaObject.numtaps  = Number(formData.get('numtaps'))

        const metaJson = JSON.stringify(metaObject);

        formData.set('metadata', metaJson)
        console.log("Objeto de metadata a enviar:", metaObject);
        console.log("Cadena JSON de metadata:", metaJson);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const res = await response.json();
                message.textContent = "upload done!"
            } else {
                const err = await response.json();
                message.textContent = "err!"
            }
        } catch (err) {
            const p = document.createElement('p')
            message.textContent = "Connection err!"
        }
    });
});
