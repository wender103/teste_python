document.getElementById("btnSpotify").addEventListener("click", enviarComando);

document.getElementById("btnLigarPC").addEventListener("click", ligarPC);

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        enviarComando();
    }
});

comandoSpotify.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        enviarComando();
    }
});

function enviarComando() {
    const comandoTexto = document.getElementById("comandoSpotify").value.toLowerCase();
    
    const comando = {
        Comando: comandoTexto.includes("abrir") ? "Abrir" : "",
        Programa: comandoTexto.includes("spotify") ? "Spotify" : "",
        Tocar: comandoTexto.includes("toque") || comandoTexto.includes("tocar"),
        Musica: comandoTexto
    };

    fetch("https://ligar-pc-remotamente.onrender.com/open_spotify", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comando),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Erro ao enviar solicitação:", error));
}

function ligarPC() {
    fetch("https://ligar-pc-remotamente.onrender.com/ligar_pc", {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao enviar solicitação para ligar o PC: ${response.statusText}`);
        }
        console.log("Solicitação para ligar o PC enviada com sucesso!");
    })
    .catch(error => console.error(error));
}