// Función para buscar un libro por ISBN o título
async function fetchBook(searchTerm) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const bookInfoDiv = document.getElementById('bookInfo');
        bookInfoDiv.innerHTML = ''; // Limpiar resultados anteriores

        if (data.items && data.items.length > 0) {
            const book = data.items[0].volumeInfo; // Tomar el primer libro

            // Verificar si existen las imágenes
            const coverImage = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'https://via.placeholder.com/200x300?text=Sin+Portada'; // Imagen por defecto si no hay portada
            bookInfoDiv.innerHTML = `
                <h2>Título: ${book.title}</h2>
                <p><strong>Autor:</strong> ${book.authors ? book.authors.join(', ') : 'No disponible'}</p>
                <p><strong>Fecha de publicación:</strong> ${book.publishedDate || 'No disponible'}</p>
                <img class="cover" src="${coverImage}" alt="Portada">
            `;
        } else {
            bookInfoDiv.innerHTML = '<p>No se encontró el libro.</p>';
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud Fetch:', error);
    }
}

// Evento del botón para buscar
document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        fetchBook(searchTerm);
    } else {
        alert('Por favor, ingresa un ISBN o título.');
    }
});
