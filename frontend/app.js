async function  loadLinks() {
    try {
        const tag = document.getElementById("tag-filter").value;
        const url = tag ? `/links?tag=${tag}` : `/links`;
        const response = await fetch(url);
        const data = await response.json(); 
    
        console.log(data, response)

        const tbody = document.getElementById("readlater-body"); 
        tbody.innerHTML=""; 
        data.forEach(link => {
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
}); 