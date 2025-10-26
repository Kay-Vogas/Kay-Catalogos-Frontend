function rowCardGames(game){
    
    return ` 
            <a href="pageGame.html?id=${game.id}" class="game-card-link">
                    <div class="game-card" id=${game.id} >
                            <img src="${game.img_url}" alt="${game.title}">
                            <h3>${game.title}</h3>
                            <p class="genre-tag">${game.genre}</p>
                            <p>${game.short_description}</p>
                    </div> 
                </a>
    `
}

function carregarTodosGames(){

    const divCardGames = document.querySelector("#bodyCardsTodosGames");

    divCardGames.innerHTML= '';

    fetch(`http://localhost:8080/games`)
    .then(resp => resp.json())
    .then(game=>{
        game.forEach(games => {
            divCardGames.innerHTML += rowCardGames(games);
        });
    })
}

function carregarGamesAventura(){

    const divCardGames = document.querySelector("#bodyCardsAventuraGames");

    divCardGames.innerHTML= '';

    fetch(`http://localhost:8080/lists/1/games`)
    .then(resp => resp.json())
    .then(game=>{
        game.forEach(games => {
            divCardGames.innerHTML += rowCardGames(games);
        });
    })
}

function carregarGamesPlataforma(){

    const divCardGames = document.querySelector("#bodyCardGamesPlataforma");

    divCardGames.innerHTML= '';

    fetch(`http://localhost:8080/lists/2/games`)
    .then(resp => resp.json())
    .then(game=>{
        game.forEach(games => {
            divCardGames.innerHTML += rowCardGames(games);
        });
    })
}

carregarGamesAventura();
carregarGamesPlataforma();