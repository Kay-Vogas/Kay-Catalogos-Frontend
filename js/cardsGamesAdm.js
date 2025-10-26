
function rowCardGames(game) {
    
    return ` 
        <div class="game-card" id="card-${game.id}">
            <img src="${game.img_url}" alt="${game.title}">
            
            <h3>
                <a href="pageGame.html?id=${game.id}" class="game-card-link-title">
                    ${game.title}
                </a>
            </h3>

            <p class="genre-tag">${game.genre}</p>
            <p>${game.short_description}</p>
            
            <div class="admin-actions">
                <a href="admin-edit.html?id=${game.id}" class="admin-btn edit">Editar</a>
                
                <button onclick="deletarGame(${game.id})" class="admin-btn delete">Deletar</button>
            </div>
        </div> 
    `;

}


function deletarGame(id) {

    if (!confirm(`Tem certeza que deseja deletar o jogo com ID ${id}?`)) {
        return; 
    }

    fetch(`http://localhost:8080/games/${id}`, {
        method: 'DELETE',
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`Erro ao deletar: ${resp.statusText}`);
        }
        
        console.log(`Jogo ${id} deletado com sucesso.`);
        const cardElement = document.getElementById(`card-${id}`);
        if (cardElement) {
            cardElement.remove(); 
        }
    })
    .catch(error => {

        console.error("Falha na requisição de delete:", error);
        alert(`Não foi possível deletar o jogo. Erro: ${error.message}`);
    });
}




function carregarGamesAventura() {
    const divCardGames = document.querySelector("#bodyCardsAventuraGames");
    divCardGames.innerHTML = '';

    fetch(`http://localhost:8080/lists/1/games`)
    .then(resp => resp.json())
    .then(games => { 
        games.forEach(game => { 
            divCardGames.innerHTML += rowCardGames(game);
        });
    })
    .catch(err => console.error("Erro ao carregar Aventura:", err));
}

function carregarGamesPlataforma() {
    const divCardGames = document.querySelector("#bodyCardGamesPlataforma");
    divCardGames.innerHTML = '';

    fetch(`http://localhost:8080/lists/2/games`)
    .then(resp => resp.json())
    .then(games => { 
        games.forEach(game => { 
            divCardGames.innerHTML += rowCardGames(game);
        });
    })
    .catch(err => console.error("Erro ao carregar Plataforma:", err));
}


carregarGamesAventura();
carregarGamesPlataforma();