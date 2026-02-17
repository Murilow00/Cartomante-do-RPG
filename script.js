
const suits = [
    { symbol: '♥', color: 'red' },
    { symbol: '♦', color: 'red' },
    { symbol: '♣', color: 'black' },
    { symbol: '♠', color: 'black' }
];

const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


const jokers = [
    { symbol: '🤡', color: 'red', value: 'JOKER' },    
    { symbol: '🃏', color: 'purple', value: 'JOKER' } 
];


const handContainer = document.getElementById('handContainer');
const btnDeal = document.getElementById('btnDeal');
const qtySelect = document.getElementById('cardQty');


function createCardElement() {
    let cardData = {};

    
    const totalPossibilities = 54;
    const chance = Math.floor(Math.random() * totalPossibilities);

    if (chance < 52) {
        
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        
        cardData = {
            symbol: suit.symbol,
            value: value,
            color: suit.color,
            isJoker: false
        };
    } else {
        
        const jokerIndex = chance - 52; 
        cardData = {
            symbol: jokers[jokerIndex].symbol,
            value: jokers[jokerIndex].value,
            color: jokers[jokerIndex].color,
            isJoker: true
        };
    }

    // --- Criação do HTML ---
    const scene = document.createElement('div');
    scene.className = 'card-scene';

    const cardObj = document.createElement('div');
    cardObj.className = 'card-object';

    const backFace = document.createElement('div');
    backFace.className = 'face back';

    const frontFace = document.createElement('div');
    frontFace.className = `face front ${cardData.color}`;

    
    const cornerClass = cardData.isJoker ? 'corner top-left joker-corner' : 'corner top-left';
    const cornerClassBottom = cardData.isJoker ? 'corner bottom-right joker-corner' : 'corner bottom-right';

    frontFace.innerHTML = `
        <div class="${cornerClass}">
            <span>${cardData.value}</span>
        </div>
        <div class="center-suit">${cardData.symbol}</div>
        <div class="${cornerClassBottom}">
            <span>${cardData.value}</span>
        </div>
    `;

    
    cardObj.appendChild(backFace);
    cardObj.appendChild(frontFace);
    scene.appendChild(cardObj);

    
    scene.addEventListener('click', () => {
        scene.classList.toggle('flipped');
    });

    return scene;
}

function dealCards() {
    btnDeal.disabled = true;
    btnDeal.textContent = "Invocando...";
    
    handContainer.innerHTML = '';
    const qty = parseInt(qtySelect.value);

    for (let i = 0; i < qty; i++) {
        const card = createCardElement();
        handContainer.appendChild(card);

        setTimeout(() => {
            card.classList.add('enter-stage');
        }, i * 200);
    }

    setTimeout(() => {
        btnDeal.disabled = false;
        btnDeal.textContent = "Invocar Cartas";
    }, qty * 200 + 500);
}

btnDeal.addEventListener('click', dealCards);
window.onload = dealCards;