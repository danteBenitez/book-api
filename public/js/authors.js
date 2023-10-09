const authorContainer = document.querySelector("#author-container");

async function getAuthors() {
  try {
    const response = await fetch("/api/authors");
    if (response.ok) {
      const { authors } = await response.json();
      return authors;
    } else {
      const { errors } = await response.json();
      if (errors) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: errors[0].msg,
        });
      }
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

async function renderAuthors() {
  const authors = await getAuthors();

  if (authors.length == 0) {
    authorContainer.innerHTML = `<span class="lead fs-2 mx-auto text-center">No hay autores que mostrar</span>`;
    return;
  }

  authorContainer.innerHTML = authors
    .map((author) => {
      return `<div class="author">
                            <div class="list-group-item py-3 pe-5 border-2 rounded-3" for="listGroupRadioGrid1">
                                <strong class="fw-semibold fs-3">${author.surname}, ${author.name}</strong>
                                <span class="d-block small author-bio opacity-75">
                                    ${author.bio}
                                </span>
                                <div class="btn-group mt-3 d-flex justify-content-center">
                                    <a type="button" href="/author-form.html?authorId=${author._id}" class="btn btn-sm btn-brand d-flex justify-content-center align-items-center">
                                        <i class="bi bi-pencil pe-1"></i>
                                        Editar
                                    </a>
                                    <button type="button" onclick="deleteAuthor(event)" data-id="${author._id}" class="btn btn-sm btn-brand justify-content-center align-items-center">
                                        <i class="bi bi-trash pe-1"></i>
                                        Borrar
                                    </button>
                                </div>
                            </div>
                            
                        </div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderAuthors);

async function deleteAuthor(evt) {
  const id = evt.target.dataset.id;
  try {
    const response = await fetch(`/api/authors/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Autor eliminado correctamente",
      });
      renderAuthors();
    } else {
      if (response.status == 404)  {
        Swal.fire({
          icon: 'error',
          title: "No se encontró el autor"
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
