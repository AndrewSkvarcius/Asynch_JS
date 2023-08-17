let fav_num = 8;

let BASE_URL  = "http://numbersapi.com";
//PART 1

// Question 1 
$.getJSON(`${BASE_URL}/${fav_num}?json`, function(data){
    console.log(data);
})

// Question 2 
let fav_nums = [8, 42, 666];

$.getJSON(`${BASE_URL}/${fav_nums}?json`, function(data){
    console.log(data);
})

// Question 3
let fav_facts = [];

$.getJSON(`${BASE_URL}/${fav_num}?json`, function(data){
    fav_facts.push(data.text);
    $.getJSON(`${BASE_URL}/${fav_num}?json`, function(data){
        fav_facts.push(data.text);
        $.getJSON(`${BASE_URL}/${fav_num}?json`, function(data){
            fav_facts.push(data.text);
            $.getJSON(`${BASE_URL}/${fav_num}?json`, function(data){
                fav_facts.push(data.text);
                fav_facts.forEach(fact =>{
                    $("body").append(`<p>${fact}</p>`);
                })
            })
        })
    })
})

//Part 2

let base_url_cards = 'https://deckofcardsapi.com/api/deck';


//Question 1

$.getJSON(`${base_url_cards}/new/draw/`, function(data) {
    let {suit, value} = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
});

//Question 2

$.getJSON(`${base_url_cards}/new/draw/`, function(data) {
let card1 = data.cards[0];
let deckId = data.deck_id;
$.getJSON(`${base_url_cards}/new/draw/`, function(data) {
    let card2 = data.cards[0];
    [card1, card2].forEach(function(card){
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
    });
  })
});

//Question 3
 
let deckId = null;
let $btn = $('button');
let $cardArea = $(`#card-area`);

$.getJSON(`${base_url_cards}/new/shuffle/`, function(data) {
    deckId = data.deck_id;
    $btn.show();
});

$btn.on('click', function(){
    $.getJSON(`${base_url_cards}/${deckId}/draw/`, function(data){
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
          $cardArea.append(
            $('<img>', {src: cardSrc, css:
                {transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`}})
          );
          if (data.remaining === 0) $btn.remove()
    });
});
