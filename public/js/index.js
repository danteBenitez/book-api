const bookContainer = document.querySelector("#book-container");

async function getBooks() {
  try {
    const response = await fetch("/api/books");
    if (response.ok) {
      const { books } = await response.json();
      return books;
    } else {
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

async function renderBookInfo() {
  const books = await getBooks();

  if (books.length == 0) {
    bookContainer.innerHTML += `<span class="lead fs-2">No hay libros que mostrar</span>`;
    return;
  }

  bookContainer.innerHTML += books
    .map((book) => {
      return `<div class="col"><div class="card position-relative shadow-sm overflow-hidden"><div class="cover">
        <img src=/uploads/${book.coverImagePath} class="object-fit-cover"
            alt="">
    </div>
    <div class="card-body card-slide-up z-2">
        <div class="pb-4">
            <h6 class="book-title">${book.title}</h6>
            <span class="lead author-name">${book.authorId.surname}, ${
        book.authorId.name
      }</span>
            <div class="py-2"></div>
            <span class="genre-name">${
              book.genreId?.description ?? "Género desconocido"
            }</span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
                <button type="button" class="btn btn-sm btn-brand d-flex align-items-center">
                    <i class="bi bi-pencil pe-1"></i>
                    Editar
                </button>
                <button type="button" data-id="${book._id}" onclick="deleteBook(event)" class="btn btn-sm btn-brand d-flex align-items-center">
                    <i class="bi bi-trash pe-1"></i>
                    Borrar
                </button>
            </div>
            <small class="text-body-secondary">1898</small>
        </div>
    </div></div></div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderBookInfo);

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
        renderBookInfo();
    } else {
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
