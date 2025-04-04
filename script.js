let list;
// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // renderItems(data)
        list = data;
        populateSelect(data);
        showNPCList(data)
    })



function showNPCList(npcs) {
    const container = document.getElementById('npc-list');
    const npcDisplay = document.getElementById('npc-display');

    npcs.forEach(npc => {
        const card = document.createElement('div');
        card.className = 'npc-card';
        card.innerHTML = `
            <img src="${npc.image}" alt="${npc.name}">
            <div><strong>${npc.name}</strong></div>
          `;
        card.addEventListener('click', () => {
            container.classList.add('hidden');        // Hide NPC grid
            npcDisplay.classList.remove('hidden');    // Show gift view
            displayGifts({ value: npc.name });
        });
        container.appendChild(card);
    });
}


const populateSelect = (npcList) => {
    const npcSelect = document.getElementById('npc-select')

    npcList.forEach(npc => {
        const item = `<option value="${npc.name}">${npc.name}</option>`
        npcSelect.insertAdjacentHTML('beforeend', item)
    });

}

const displayGifts = (npcSelect) => {

    document.getElementById('npc-list').classList.add('hidden');
    document.getElementById('npc-display').classList.remove('hidden');


    const selectedNPC = list.find((item) => item.name === npcSelect.value)

    const npcDisplay = document.getElementById('npc-display')

    let item = `<button onclick="goBack()">Back to NPC List</button><h2>${selectedNPC.name}</h2><img src="${selectedNPC.image}"></img><p>${selectedNPC.Birthday}</p>
    <section><h3>Loved gifts</h3><ul>`

    selectedNPC.Loves.forEach(lovedGift => {
        item = item + `<li><span>${lovedGift.name}</span><img src="${lovedGift.image}"></img></li>`
    })
    item = item + '</ul></section><section class="gift-section-container"><h3>Liked Gifts</h3><ul>'

    selectedNPC.Likes.forEach(likedGift => {
        item = item + `<li><span>${likedGift.name}</span><img src="${likedGift.image}"></img></li>`
    })
    item = item + '</ul></section><h3>Neutral Gifts</h3><ul>'

    selectedNPC.Neutral.forEach(neutralGift => {
        item = item + `<li><span>${neutralGift.name}</span><img src="${neutralGift.image}"></img></li>`
    })
    item = item + '</ul></section><h3>Disliked Gifts</h3><ul>'

    selectedNPC.Dislikes.forEach(dislikedGift => {
        item = item + `<li><span>${dislikedGift.name}</span><img src="${dislikedGift.image}"></img></li>`
    })
    item = item + '</ul></section><h3>Hated Gifts</h3><ul>'

    selectedNPC.Hates.forEach(hatedGift => {
        item = item + `<li><span>${hatedGift.name}</span><img src="${hatedGift.image}"></img></li>`
    })
    item = item + '</ul></section>'


    npcDisplay.innerHTML = item;
}


const npcSearch = document.getElementById('npc-search');
const npcSelect = document.getElementById('npc-select');

// getting input in the search bar
npcSearch.addEventListener('input', () => {
    const inputValue = npcSearch.value.toLowerCase().trim();

    // matching NPC by name
    const match = list.find(npc => npc.name.toLowerCase().startsWith(inputValue));

    if (match) {
        npcSelect.value = match.name;
        displayGifts(npcSelect);
    }
});



let universalData = {};

fetch('universalgifts.json')
    .then(res => res.json())
    .then(data => universalData = data);

function showUniversalGifts(category) {
    const modal = document.getElementById("universalModal");
    const title = document.getElementById("modalTitle");
    const list = document.getElementById("universalGiftList");

    title.textContent = category;
    list.innerHTML = "";

    (universalData[category] || []).forEach(gift => {
        list.innerHTML += `
      <li>
        <img src="${gift.image}" alt="${gift.name}">
        <br>${gift.name}
      </li>
    `;
    });

    modal.classList.remove("hidden");
}

function closeModal() {
    document.getElementById("universalModal").classList.add("hidden");
}


function goBack() {
    document.getElementById('npc-display').classList.add('hidden');
    document.getElementById('npc-list').classList.remove('hidden');
  }





