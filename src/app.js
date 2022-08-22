const feedDisplay = document.querySelector('#feed');

fetch(`http://localhost:3000/results`)
    .then(response => response.json())
    .then(data => {
        data.forEach(deckRef => {
            const name = `<h3>${deckRef.name}</h3>`;
        });
    });