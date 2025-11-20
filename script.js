let pokemonActual = null;

// BUSCAR POKEMON
function searchPokemon() {
    const nombre = document.getElementById("nombre_pokemon").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            pokemonActual = {
                name: data.name,
                img: data.sprites.front_default
            };

            document.getElementById("namePoke").innerHTML = `
                <h4>${data.name.toUpperCase()}</h4>
                <img src="${data.sprites.front_default}">
            `;
        })
        .catch(() => alert("Pokémon no encontrado"));
}

// GUARDAR FAVORITO
function saveFavorite() {
    if (!pokemonActual) return alert("Busca un Pokémon primero");

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.some(p => p.name === pokemonActual.name)) {
        return alert("Ese Pokémon ya está en favoritos");
    }

    favoritos.push(pokemonActual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    updateFavoritesList();
}

// ELIMINAR FAVORITO
function deleteFavorite(name) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(p => p.name !== name);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    updateFavoritesList();
}

// MOSTRAR FAVORITOS
function updateFavoritesList() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const cont = document.getElementById("favoritos");

    cont.innerHTML = "";

    favoritos.forEach(poke => {
        const card = document.createElement("div");
        card.classList.add("fav-item");

        card.innerHTML = `
            <h5>${poke.name}</h5>
            <img src="${poke.img}">
            <button class="btn-delete" onclick="deleteFavorite('${poke.name}')">Eliminar</button>
        `;

        cont.appendChild(card);
    });
}

window.onload = updateFavoritesList;

