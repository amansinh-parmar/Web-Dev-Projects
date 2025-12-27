const container = document.querySelector('#container');
const generateBtn = document.getElementById('generateBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const input = document.getElementById('pokemonCount');
const searchInput = document.getElementById('searchInput');

// Capitalize helper
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Create and append one Pokémon card
async function createPokemonCard(id) {
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');

    const img = document.createElement('img');
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    img.alt = `Pokemon #${id}`;
    img.onerror = () => {
        img.src = "https://via.placeholder.com/96?text=No+Image";
    };

    const label = document.createElement('span');

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Invalid");
        const data = await res.json();
        label.innerText = `#${id} ${capitalize(data.name)}`;
    } catch {
        label.innerText = `#${id} Unknown`;
    }

    pokemon.appendChild(img);
    pokemon.appendChild(label);
    container.appendChild(pokemon);
}

// Generate all Pokémon according to count
function generatePokemon() {
    container.innerHTML = '';
    const count = parseInt(input.value);
    if (isNaN(count) || count < 1) {
        alert("Please enter a valid number");
        return;
    }

    // Save current count in localStorage
    localStorage.setItem('pokemonCount', count);

    for (let i = 1; i <= count; i++) {
        createPokemonCard(i);
    }
}

// Toggle dark mode and save preference
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Save dark mode state
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Search functionality
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim().toLowerCase();
    container.innerHTML = '';

    if (!query) {
        // On clearing search, restore count-based display & localStorage value
        const savedCount = localStorage.getItem('pokemonCount') || 10;
        input.value = savedCount;
        generatePokemon();
        return;
    }

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!res.ok) throw new Error("Not found");

        const data = await res.json();
        createPokemonCard(data.id);
    } catch {
        container.innerHTML = `<p style="text-align:center;">No Pokémon found with that name or ID.</p>`;
    }
});

generateBtn.addEventListener('click', generatePokemon);

// On page load, restore saved count & dark mode preference
window.addEventListener('DOMContentLoaded', () => {
    const savedCount = localStorage.getItem('pokemonCount');
    if (savedCount) {
        input.value = savedCount;
        generatePokemon();
    } else {
        input.value = 10;  // default value
        generatePokemon();
    }

    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark');
    }
});
