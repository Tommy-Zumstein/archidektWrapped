import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import axios from 'axios';
import cors from 'cors';
const app = express();
const router = express.Router();
app.use('/', router);
app.use(cors());


//Todos:
/*
    - Handle Page 
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app.METHOD(PATH, HANDLER)

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname , '/index.html'));
})

router.get('/results',function(req,res){

    //Start API Fetch
    console.log(req.query);

    let id = req.query.id;
    //https://archidekt.com/user/65431/
    axios.get(`https://archidekt.com/api/decks/cards/?orderBy=-createdAt&ownerexact=true&pageSize=50&formats=3&owner=${id}`)
    .then(function (response) {
    // handle success
    // console.log(response);
    if(!response.statusText){
        throw Error('Err');
    }  
    return response.data;
    }).then (function (data) {
    // console.log('Data response:');
    // console.log('--------------------------------------------------------------------');
    // console.log(data);
    let i = 0;
    let deckIds = [];
    data.results.forEach(deckData => {
        
        console.log('\nDECK ID: ' + i);
        deckIds.push({
            id: deckData.id,
            name: deckData.name,
            previewImage: deckData.featured
        });
        i++;
        // console.log('------------------------');
        
    });
    // console.log(deckIds);
    //res.send(deckIds);

    //Removed HTML construction -- use later in fetches???
    let html;
    var decksHtml = deckIds.map((deckRef) =>{
        
        return `
            <a href="https://archidekt.com/decks/${deckRef.id}" target='_bank'><img class= "deck_img" src=${deckRef.previewImage}></a>
            <p>Name: ${deckRef.name}</p>
        `;

    })
    .join("");
    //console.log(decksHtml);
    html = `<div class = "card_gallery"> <div class = "card_gallery_inner"> ${decksHtml} </div></div>`; 
    // console.log('html');
    // console.log(html);
    res.send(html);
    //   document
    //       .querySelector('#app')
    //       .insertAdjacentHTML("afterbegin", html);
        
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .then(function () {
    // always executed
    });

});


app.listen(process.env.PORT || 3000, () => console.log(`App Available on http://localhost:3000`));