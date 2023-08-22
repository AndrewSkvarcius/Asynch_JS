//PART 1

let favoriteNum = 6;
let baseUrl = "http://numbersapi.com";

//Question 1\

async function part1() {
    let data = await $.getJSON(`${baseUrl}/${favoriteNum}?json`);
    console.log(data);
}
part1();

//Question 2\

let favNums = [8,9,11]

async function part2() {
    let data = await $.getJSON(`${baseUrl}/${favNums}?json`);
    console.log(data);
}
part2();


//Question 3\
async function part3(){
    let fav_facts = await Promise.all(
        Array.from({ length: 4}, () => $.getJSON(`${baseUrl}/${favoriteNum}?json`))
        );
        fav_facts.forEach(data => {
            $('body').append(`<h3>${data.text}</h3>`)
        });
}



//PART 2
$(function() {
let cardUrl = 'https://deckofcardsapi.com/api/deck';

// Question 1
async function partOne() {
    let data = await $.getJSON(`${cardUrl}/new/draw`);
    let { suit, value} = data.cards[0];
    console.log(`${value.toLowercase()} of ${suit.toLowercase()}`);
}

// Question 2
async function partTwo() {
let firstCardData = await $.getJSON(`${cardUrl}/new/draw`);
let deck_id = firstCardData.deck_id;
let secondCardData = await $.getJSON(`${cardUrl}/${deck_id}/darw/`);
[firstCardData, secondCardData]. forEach(card => {
    let { suit, value } = card.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});
}
// Question 3
async function partThree(){
    let $btn = $('button');
    let $cardTable = $(`#card-area`);

    let deckData = await $.getJSON(`${cardUrl}/new/shuffle/`);
    $btn.show().on('click', async function(){
        let cardData = await $.getJSON(`${cardUrl}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardTable.append(
            $('<img>', {
                src: cardSrc,
                css: {
                  transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
              })
            );
            if (cardData.remaining === 0) $btn.remove();
          });
        }
        partThree();
      });
      

