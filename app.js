const buttons = document.querySelectorAll('button[type=submit]');
for(let btn of buttons){
    btn.addEventListener('click', e => {
        e.preventDefault();
    });
}

const searchWord = document.querySelector('#searchWord');
const searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', ajaxCall);


function ajaxCall(){
    let elem = document.querySelector('.wordDetails');
    elem.innerHTML =  "loading...";
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.value}`;
    makeRequest(url).then(response => {
        
        let html = '' ;
        response[0].meanings.forEach(mean =>{
            html +=`<div class="text-muted fst-italic">${mean.partOfSpeech}</div>`
            mean.definitions.forEach(define =>{
                let example = define.example == undefined ? '': define.example;
                html += `<div class="ms-3">${define.definition}</div>
                <div class="ms-3 text-muted">${example}</div>
                <div class="ms-3 text-muted">${define.synonyms}</div>
                <div class="ms-3 text-muted">${define.antonyms}</div>`
            });
        });
        elem.innerHTML = `<h4>${response[0].word}</h4>` + html;
    }).catch(error =>{
        console.log('Error Message: '+ error.statusText);
    });
}


function makeRequest(url){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function(){
            if(this.status >= 200 && this.status < 300){
                resolve(JSON.parse(this.responseText));
            }else{
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        };
        xhr.send();
    });
}