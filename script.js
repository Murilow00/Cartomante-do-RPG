
const suits = [
    { symbol: '♥', color: 'red' },
    { symbol: '♦', color: 'red' },
    { symbol: '♣', color: 'black' },
    { symbol: '♠', color: 'black' }
];

const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


const handContainer = document.getElementById('handContainer');
const btnDeal = document.getElementById('btnDeal');
const qtySelect = document.getElementById('cardQty');


function createFullDeck() {
    let deck = [];
    
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push({
                symbol: suit.symbol,
                value: value,
                color: suit.color,
                isJoker: false
            });
        }
    }
    
    
    deck.push({ symbol: '🤡', color: 'red', value: 'JOKER', isJoker: true });
    deck.push({ symbol: '🃏', color: 'purple', value: 'JOKER', isJoker: true });
    
    return deck;
}


function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Troca a carta da posição i com a j
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}


function createCardElement(cardData) {
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
    // Trava o botão
    btnDeal.disabled = true;
    btnDeal.textContent = "Embaralhando...";
    
    
    handContainer.innerHTML = '';
    
    
    const qty = parseInt(qtySelect.value);

    
    let deck = createFullDeck();
    deck = shuffleDeck(deck);

    
    const hand = deck.slice(0, qty);

    
    hand.forEach((cardData, index) => {
        const cardElement = createCardElement(cardData);
        handContainer.appendChild(cardElement);

        
        setTimeout(() => {
            cardElement.classList.add('enter-stage');
        }, index * 200);
    });

  
    setTimeout(() => {
        btnDeal.disabled = false;
        btnDeal.textContent = "Invocar Cartas";
    }, qty * 200 + 500);
}


btnDeal.addEventListener('click', dealCards);
window.onload = dealCards;