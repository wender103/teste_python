document.getElementById("btnSpotify").addEventListener("click", function() {
    enviarComando();
});

document.getElementById("btnLigarPC").addEventListener("click", function() {
    ligarPC();
});

document.addEventListener('keypress', (e) => {
    let KeyPress = e.keyCode
    if (KeyPress == 13) {
        enviarComando();
    }
})

comandoSpotify.addEventListener('keypress', (e) => {
    let KeyPress = e.keyCode
    if (KeyPress == 13) {
        enviarComando();
    }
})

function enviarComando() {
    // Obter o conteúdo do textarea
    const comandoTexto = document.getElementById("comandoSpotify").value;

    // Interpretar o texto e criar o objeto JSON
    const comando = {
        Comando: "",
        Programa: "",
        Tocar: false,
        Musica: ""
    };

    if (comandoTexto.toLowerCase().includes("abrir") || comandoTexto.toLowerCase().includes("abra")) {
        comando.Comando = "Abrir";
    }

    if (comandoTexto.toLowerCase().includes("spotify")) {
        comando.Programa = "Spotify";
    }

    if (comandoTexto.toLowerCase().includes("toque") || comandoTexto.toLowerCase().includes("tocar")) {
        comando.Tocar = true;
    }

    comando.Musica = comandoTexto;

    // Enviar solicitação ao servidor
    //http://${location.hostname}:8000
    fetch(`https://ligar-pc-remotamente.onrender.com/open_spotify
    `, {
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
    // Enviar solicitação ao servidor para ligar o PC
    fetch(`https://ligar-pc-remotamente.onrender.com/ligar_pc`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao enviar solicitação para ligar o PC: ${response.statusText}`);
        }
        // Não tentar analisar JSON aqui, pois a resposta é vazia
        console.log("Solicitação para ligar o PC enviada com sucesso!");
    })
    .catch(error => console.error(error));
}
