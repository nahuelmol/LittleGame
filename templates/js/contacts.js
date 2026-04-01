document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const apiUrl = 'firebase';  //this must have the Firebase endpoint 

        const formData      = new FormData(form)
        const formEntries   = Array.from(formData.entries());
        const metaEntries   = formEntries.filter(([key, value]) => !(value instanceof File));
        const metaObject    = Object.fromEntries(metaEntries);

        const metaJson = JSON.stringify(metaObject);
        formData.set("metadata", metaJson);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData
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
})
