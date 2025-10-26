 
function infoGameSelect(game) {

    return ` <h2>${game.title}</h2>

            <div class="game-main-content">
                <img src="${game.img_url}" alt="Capa do ${game.title}">
                
                <div class="game-meta">
                    <h3>Detalhes</h3>
                    <ul>
                        <li><strong>Gênero:</strong> ${game.genre}</li>
                        <li><strong>Lançamento:</strong> ${game.year}</li>
                        <li><strong>Plataforma:</strong> ${game.platforms}</li>
                    </ul>
                    <span class="genre-tag">${game.genre}</span>
                </div>
            </div>

            <div class="game-description">
                <h3>Sobre o Jogo</h3>
                <p>${game.long_description}</p>
            </div>
    `;  
}


 
function carregarGameSelect() {

    const divGame = document.querySelector("#GameTodo");

    divGame.innerHTML = ''; 

    const urlParams = new URLSearchParams(window.location.search);

    const gameId = urlParams.get('id');


    if (!gameId) {
        divGame.innerHTML = "<h2>Erro: Jogo não especificado.</h2>";
        return;
    }

    fetch(`http://localhost:8080/games/${gameId}`)
        .then(resp => {
            if (!resp.ok) {
                console.log(resp.ok);
                throw new Error(`Jogo não encontrado (Status: ${resp.status})`);
            }
            return resp.json();
        })
        .then(game => {
            // 'game' é o objeto JSON retornado pela API
            // Agora, passamos esse objeto para a função de template
            divGame.innerHTML = infoGameSelect(game);
        })
        .catch(error => {
            // Captura qualquer erro (falha de rede, 404, etc.)
            console.error("Erro ao buscar detalhes do jogo:", error);
            divGame.innerHTML = `<h2>Erro ao carregar o jogo.</h2><p>${error.message}</p>`;
        });
}

document.addEventListener('DOMContentLoaded', carregarGameSelect);