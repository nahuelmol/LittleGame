document.getElementById("seed_contacts").addEventListener("click", () => {
    let ncontacts = document.getElementById("contacts_n").value;
    let href = "api/seed/" + ncontacts;
    window.location.href = href;
});


document.getElementById("find_contacts").addEventListener("click", async () => {
    let fname = document.getElementById("fname_filter").value;
    let lname = document.getElementById("lname_filter").value;
    let body  = {
            fname:fname,
            lname:lname
    };
    await fetch("api/seed/find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
});

