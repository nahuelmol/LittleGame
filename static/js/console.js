document.getElementById("seed_contacts").addEventListener("click", () => {
    let ncontacts = document.getElementById("contacts_n").value;
    let href = "api/seed/" + ncontacts;
    window.location.href = href;
});
