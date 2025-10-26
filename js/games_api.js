const API_URL = "http://localhost:3000/games";

async function buscarGames() {
    try{
        const response = fetch(API_URL);

        if(!response.ok){
            throw new Error("Erro na rede"+ await response.statusText);
        }


        const games = await response.json();

        console.log("Games"+games);

    }catch(error){

        console.error('Falha ao buscar jogos:', error);

    }
}

buscarGames(); 