const form = document.querySelector("#book-form");
const coverInput = document.querySelector('[name=cover]');

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("bookId");
const updating = !!bookId;

form.addEventListener("submit", async (evt) => {

  evt.preventDefault();
  const formData = new FormData(form);

  // Recuperar la portada como archivo y mandarla con el 
  console.log(formData);
  try {
    const response = await fetch(`/api/books/${bookId ?? ''}`, {
        method: updating ? "PUT" : "POST",
        body: formData,
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: `Libro ${updating ? "actualizado" : "creado"} exitosamente`,
      });
      setTimeout(() => window.location.assign("/"), 3000);
    } else {
      const { errors } = await response.json();
      Swal.fire({
        icon: "error",
        title: "Error de invalidación",
        text: errors[0].msg,
      });
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal. Revise su conexión a Internet.",
      footer: "Si el problema persiste, contáctese con los desarrolladores",
    });
  }
});

async function loadBookData() {
    if (!updating) return;
    try {
        const response = await fetch(`/api/books/${bookId}`);
        if (!response.ok) {
          if (response.status == 404) {
            Swal.fire({
                icon: "error",
                title: "Libro no encontrado.",
                text: errors[0].msg,
            });
          }
          throw response;
        }

        const { book } = await response.json();

        const fieldNames = Object.keys(book);
        console.log(fieldNames);
        for (const field of fieldNames) {
            console.log(book[field]);
            const input = form.querySelector(`[name=${field}]`);
            if (!input) continue;
            // Si el campo es un documento embebido, el valor del input
            // pasa a ser el _id de ese objeto
            if (book[field] instanceof Object) {
              input.value = book[field]._id;
              continue;
            } 
            input.value = book[field];
        }

      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal. Revise su conexión a Internet.",
          footer: "Si el problema persiste, contáctese con los desarrolladores",
        });
      }
}

document.addEventListener('DOMContentLoaded', () => {
  fillOptions();
  loadBookData()
});

const authorInput = document.querySelector('[name=authorId]');
const genreInput = document.querySelector('[name=genreId]');

async function fillOptions() {
    try {
        const [
          authorResponse,
          genreResponse
        ] = await Promise.all([
          fetch('/api/authors'),
          fetch('/api/genres')
        ])

        if (!genreResponse.ok) {
          throw genreResponse;
        }
        
        if (authorResponse.status === 404) {
          throw {
            message: 'No se encontraron autores. Cree uno primero y luego intente crear un libro suyo.'
          }
        } else if (!authorResponse.ok) {
          throw authorResponse;
        }

        const { authors } = await authorResponse.json();
        const { genres } = await genreResponse.json();

        for (const author of authors) {
          authorInput.innerHTML += `
            <option value=${author._id}>${author.name} ${author.surname}</option>
          `
        }

        for (const genre of genres) {
          genreInput.innerHTML += `
            <option value=${genre._id}>${genre.description}</option>
          `
        }


      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message ?? "Algo salió mal. Revise su conexión a Internet.",
          footer: err.message ? '' : "Si el problema persiste, contáctese con los desarrolladores",
        });
      }
}