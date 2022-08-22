function fetchData(){
    console.log("Start Fetch");
    fetch('https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=false&order=usd&page=1&q=set%3Acm2&unique=cards')
    .then(response =>{
        console.log(response);
        if(!response.ok){
            throw Error('Err');
        }  
        return response.json();
    }).then(data =>{
        console.log('data');
        console.log(data.data);
        var html = data.data.map((card, index) =>{
            var card_img_arr = card.image_uris;
            //console.log(card_img_arr.small);
            return `
                <figure class=”gallery__item gallery__item--${index}">
                    <img class= "card_img" src=${card_img_arr.small}>
                    <p>Artist: ${card.artist}</p>
                </figure>
            `;

        })
        .join("");
        html = `<div class = "card_gallery"> <div class = "card_gallery_inner"> ${html} </div></div>`; 
        console.log('html');
        console.log(html);
        document
            .querySelector('#app')
            .insertAdjacentHTML("afterbegin", html);
            
    }).catch(error =>{
        console.log('Someting\'s fucky');
        console.log(error);
    });
}

fetchData();