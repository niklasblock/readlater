async function  loadLinks() {
    try {
        const tag = document.getElementById("tag-filter").value;
        const readFilter = document.getElementById("read-filter").value;

        let url = `/links`;
        const params = [];
        if (tag) params.push(`tag=${tag}`);
        if (params.length > 0) url += `?${params.join("&")}`;

        const response = await fetch(url);
        const data = await response.json();

        // Client-seitig nach gelesen/ungelesen filtern
        const filtered = readFilter === "read" 
            ? data.filter(l => l.read)
            : readFilter === "unread"
            ? data.filter(l => !l.read)
            : data;

        const tbody = document.getElementById("readlater-body"); 
        tbody.innerHTML=""; 
        filtered.forEach(link => {
            const row = document.createElement("tr"); 
            const statusBtn = link.read
                ? `<button class="status-btn read" onclick="toggleStatus(${link.id})">✓ gelesen</button>`
                : `<button class="status-btn unread" onclick="toggleStatus(${link.id})">ungelesen</button>`;
            row.innerHTML = `
                <td>${link.saved_at}</td> 
                <td><a href="${link.url}" target="_blank">${link.title || link.url}</a></td>
                <td>${link.tags || "—"}</td>
                <td>${link.note || "—"}</td>
                <td>${statusBtn}</td>
                <td><button class="delete-btn" onclick="deleteLink(${link.id})">x</button></td>
            `; 
            tbody.appendChild(row); 

        });
    
    } catch (error) {
        console.error('Fehler beim Aufrufen:', error)
    }
}


async function toggleStatus(id) {
    await fetch(`/links/${id}/read`, {method: "PATCH"});
    loadLinks();
}

async function deleteLink(id) {
    await fetch(`/links/${id}`, {method: "DELETE"});
    document.getElementById("readlater-body").innerHTML = "";
    loadLinks();
}

// --- Event Listener 
document.addEventListener("DOMContentLoaded", () => {
    loadLinks(); 
    document.getElementById("tag-filter").addEventListener("input", () => {
        loadLinks();
    });
    document.getElementById("read-filter").addEventListener("change", () => {
        loadLinks();
    });
}); 