document.addEventListener('DOMContentLoaded', () => {

    const editForm = document.querySelector('#edit-form');
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');

    if (!gameId) {
        alert('ID do jogo não encontrado!');
        window.location.href = 'index.html';
        return;
    }

    function carregarDadosDoJogo() {
        fetch(`http://localhost:8080/games/${gameId}`)
            .then(resp => {
                if (!resp.ok) throw new Error('Jogo não encontrado');
                return resp.json();
            })
            .then(game => {
                document.querySelector('#game-id').value = game.id;
                document.querySelector('#title').value = game.title;
                document.querySelector('#img_url').value = game.img_url;
                document.querySelector('#genre').value = game.genre;
                document.querySelector('#short_description').value = game.short_description;
                document.querySelector('#long_description').value = game.long_description;

                document.querySelector('#year').value = game.year;
                document.querySelector('#platforms').value = game.platforms;
                document.querySelector('#score').value = game.score;
            })
            .catch(error => {
                console.error('Erro ao buscar dados do jogo:', error);
                alert('Não foi possível carregar os dados do jogo.');
            });
    }

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(editForm);
        const updatedGame = Object.fromEntries(formData.entries());

        console.log('Enviando atualização:', updatedGame);

        fetch(`http://localhost:8080/games/${gameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGame)
        })
        .then(resp => {
            if (!resp.ok) {
                return resp.text().then(text => { 
                    throw new Error(`Falha ao atualizar o jogo: ${text}`);
                });
            }
            return resp.json();
        })
        .then(data => {
            alert('Jogo atualizado com sucesso!');
            window.location.href = 'index.html'; 
        })
        .catch(error => {
            console.error('Erro ao atualizar:', error);
            alert(`Erro ao atualizar: ${error.message}`);
        });
    });

    carregarDadosDoJogo();
});