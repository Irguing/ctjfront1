// Simulated game data with thumbnails
const gameData = [
    { name: "Super Mario Bros", thumbnail: "img/super_mario_bros_thumbnail.webp" },
    { name: "The Legend of Zelda", thumbnail: "img/zelda.webp" },
    { name: "Donkey Kong", thumbnail: "img/donkey_kong.jpg" },
    { name: "Mario Kart", thumbnail: "img/mario_kart.jpg" },
    { name: "Super Mario Galaxy", thumbnail: "img/mario_galaxy.webp" },
    { name: "Super Mario Odyssey", thumbnail: "img/super_mario_odyssey.jpg" },
    { name: "Luigi's Mansion", thumbnail: "img/luigis_mansion.jpg" },
    { name: "Yoshi's Island", thumbnail: "img/yoshis_island.jpg" },
    { name: "Metroid", thumbnail: "img/metroid.jpg" },
    { name: "Kirby", thumbnail: "img/kirby.jpg" }
];

// Función para realizar la búsqueda simulada
function searchGames(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const results = gameData.filter(game => 
                game.name.toLowerCase().includes(query.toLowerCase())
            );
            resolve(results);
        }, 500); // Simulamos un retraso de 500ms
    });
}

// Manejador del evento de entrada en el buscador
document.getElementById('buscador').addEventListener('input', async function() {
    const query = this.value;
    const resultsContainer = document.getElementById('search-results');
    
    // Limpiar resultados anteriores
    resultsContainer.innerHTML = '';
    
    if (query.length > 1) { // Buscar a partir de 2 caracteres
        const results = await searchGames(query);
        
        if (results.length > 0) {
            results.forEach(game => {
                const div = document.createElement('div');
                div.classList.add('search-result');
                
                const img = document.createElement('img');
                img.src = game.thumbnail;  // Establecer miniatura
                img.alt = game.name;  // Establecer texto alternativo
                
                const textDiv = document.createElement('div');
                textDiv.textContent = game.name;
                
                div.appendChild(img);
                div.appendChild(textDiv);
                
                div.addEventListener('click', () => {
                    document.getElementById('buscador').value = game.name; // Asignar valor al campo de búsqueda
                    resultsContainer.innerHTML = '';  // Limpiar resultados
                });
                
                resultsContainer.appendChild(div);
            });
        } else {
            resultsContainer.innerHTML = '<div class="no-results">No se encontraron resultados</div>';
        }
    }
});

// Mapa de imágenes basado en los campos de entrada
const imageMap = {
    buscador: 'img/base.png',
    juego_completo: 'img/cajamanualzelda.png',
    juego_suelto: 'img/sonic.png',
    solo_caja: 'img/peach.png',
    pais: 'img/yoshi.png',
    NombreCliente: 'img/nombre.png',  // Verifica que sea el ID correcto en el HTML
    campocorreo: 'img/luigi.png',     // Verifica que sea el ID correcto en el HTML
    telefono: 'img/bowser.png',       // Verifica que sea el ID correcto en el HTML
    file: 'img/eggman.png',           // Verifica que sea el ID correcto en el HTML
};

// Cambiar imagen según el campo activo con animación de difuminado
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', (event) => {
        const field = event.target.id || event.target.className.split(' ')[0];
        const newImage = imageMap[field] || 'img/default_image.png';
        
        const imageElement = document.getElementById('dynamicImage');
        
        // Añadir la clase 'fade' para iniciar la animación
        imageElement.classList.add('fade');
        
        // Esperar el tiempo de la mitad de la animación (0.5s), luego cambiar la imagen
        setTimeout(() => {
            imageElement.src = newImage;
            
            // Remover la clase 'fade' después de la animación
            setTimeout(() => {
                imageElement.classList.remove('fade');
            }, 500); // Duración de la animación en milisegundos
        }, 500); // Tiempo para el "fade out" antes de cambiar la imagen
    });
});


// Mostrar caja de luz al enviar
document.getElementById('enviar').addEventListener('click', () => {
    document.getElementById('lightbox').classList.add('show');
});

// Cerrar caja de luz
document.getElementById('close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('show');
});

// Evento de arrastrar y soltar archivos en el área de subida
const fileDropArea = document.querySelector('.file-drop-area');
const fileInput = fileDropArea.querySelector('.file-input');
const fileMsg = fileDropArea.querySelector('.file-msg');

fileDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropArea.classList.add('dragover');
});

fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('dragover');
});

fileDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        fileMsg.textContent = files[0].name;
    }
});

// Manejar selección manual de archivo
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileMsg.textContent = fileInput.files[0].name;
    }
});
