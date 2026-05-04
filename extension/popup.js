document.getElementById("save-btn").addEventListener("click", async () => {
    const tags = document.getElementById("tags").value;
    const note = document.getElementById("note").value;
    const status = document.getElementById("status");

    // Aktuelle Tab URL und Titel holen
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    const payload = {
        url: tab.url,
        title: tab.title,
        tags: tags || null,
        note: note || null
    };

    try {
        const response = await fetch("http://127.0.0.1:8001/links", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            status.textContent = "✓ Gespeichert!";
            status.className = "success";
            setTimeout(() => window.close(), 1000);
        } else {
            status.textContent = "Fehler beim Speichern.";
            status.className = "error";
        }
    } catch (error) {
        status.textContent = "API nicht erreichbar.";
        status.className = "error";
    }
});
// URL Preview laden
chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    const preview = document.getElementById("url-preview");
    preview.textContent = tab.url;
    preview.title = tab.url;
});