const bookContainer = document.querySelector("#book-container");
console.log(bookContainer.children);
const urlParams = new URLSearchParams(window.location.search);
const filter = urlParams.get('filter');

async function getBooksByFilter() {
  // Dependiendo del filtro activo,
  // se obtiene una ruta a la cual hacer la
  // petición
  const apiRoute = getApiRouteFromFilter();
  try {
    const response = await fetch(apiRoute);
    if (response.ok) {
      return await response.json();
    } else {
      const { errors } = await response.json();
      if (errors) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: errors[0].msg,
        });
      }
      return { books: [] };
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal. Revise su conexión a Internet.",
      footer: "Si no funciona, contáctese con los desarrolladores",
    });
  }
}

async function showBooks() {
  // Si no hay filtro, se muestran todos los libros
  if (!filter) {
    const { books } = await getBooksByFilter();
    renderBookInfo(books, bookContainer);
    return;
  }
  // Si el filtro es 'genre' filtramos por género
  if (filter == 'genre') {
    const { genres } = await getBooksByFilter();

    const childCount = bookContainer.children.length;
    for (let i = 0; i < childCount; i++) {
      bookContainer.removeChild(bookContainer.firstChild)
    }

    for (const genre of genres) {
      const sectionContainer = document.createElement('div');

      sectionContainer.innerHTML += `
        <hgroup class="w-100 d-flex justify-content-between align-items-center">
          <h2>${genre.description}</h2>
          <span class="ms-auto d-block fs-5 lead">
            <i class="bi bi-book me-1"></i>
            ${genre.books.length} libros
          </span>
        <hgroup>`
      sectionContainer.classList.add('genre-section');

      const bookListContainer = document.createElement('div');
      bookListContainer.classList.add('genre-section', 'row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3');
      await renderBookInfo(genre.books, bookListContainer);
      sectionContainer.append(bookListContainer);
      bookContainer.append(sectionContainer);
    }

  }

}

async function renderBookInfo(books, bookContainer) {
  console.log(books);
  if (books.length == 0) {
    bookContainer.innerHTML = `<span class="lead fs-2 mx-auto text-center w-100">No hay libros que mostrar</span>`;
    return;
  }
  bookContainer.innerHTML = books
    .map((book) => {
      return `<div class="col"><div class="card position-relative shadow-sm overflow-hidden"><div class="cover">
        <img src=/uploads/${book.coverImagePath} class="object-fit-cover"
            alt="">
    </div>
    <div class="card-body card-slide-up z-2">
        <div class="pb-4">
            <h6 class="book-title">${book.title}</h6>
            <div class="d-flex justify-content-between align-items-center">
              <span class="lead author-name">${book.authorId.surname}, ${
                book.authorId.name}</span>
              <span>${book.pageCount ? `${book.pageCount} páginas` : ''}</span>
            </div>
            <div class="py-2"></div>
            <span class="genre-name">${
              book.genreId?.description ?? "Género desconocido"
            }</span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
                <a type="button" href="/book-form.html?bookId=${book._id}" class="btn btn-sm btn-brand d-flex align-items-center">
                    <i class="bi bi-pencil pe-1"></i>
                    Editar
                </a>
                <button type="button" data-id="${book._id}" onclick="deleteBook(event)" class="btn btn-sm btn-brand d-flex align-items-center">
                    <i class="bi bi-trash pe-1"></i>
                    Borrar
                </button>
            </div>
            <small class="text-body-secondary">${book.publicationYear}</small>
        </div>
    </div></div></div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => showBooks());

async function deleteBook(evt) {
  const id = evt.target.dataset.id;
  try {
    const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Libro eliminado correctamente',
        });
        showBooks();
    } else {
      if (response.status == 404)  {
        Swal.fire({
          icon: 'error',
          title: "No se encontró el libro"
        })
        return;
      }
      const { errors } = await response.json();

      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: errors[0].msg,
      });
      return [];
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal. Revise su conexión a Internet.",
      footer: "Si no funciona, contáctese con los desarrolladores",
    });
  }
}

async function fillGenreFilters() {
  try {
    const response = await fetch('/api/genres');
    if (!response.ok) throw response;

    const { genres } = await response.json();

    for (const genre of genres) {
      filterInput.innerHTML = `
        <option value=${genre._id}>${genre.description}</option> 
      `
    }

  } catch(err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error inesperado. Revise su conexión a Internet'
    })
  }

}

function getApiRouteFromFilter() {
  switch (filter) {
    case null: return '/api/books'
    case 'genre': return '/api/genres/books'
  }
}