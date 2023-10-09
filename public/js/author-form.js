const form = document.querySelector("#new-author");

const urlParams = new URLSearchParams(window.location.search);
const authorId = urlParams.get("authorId");
const updating = !!authorId;


form.addEventListener("submit", async (evt) => {

  evt.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch(`/api/authors/${authorId ?? ''}`, {
        method: updating ? "PUT" : "POST",
        body: formData,
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: `Autor ${updating ? "actualizado" : "creado"} exitosamente`,
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

async function loadAuthorData() {
    if (!updating) return;
    try {
        const response = await fetch(`/api/authors/${authorId}`);
        if (!response.ok) {
          if (response.status == 404) {
            Swal.fire({
                icon: "error",
                title: "Error de invalidación",
                text: errors[0].msg,
            });
          }
          throw response;
        }

        const { author } = await response.json();

        const fieldNames = Object.keys(author);
        for (const field of fieldNames) {
            const input = form.querySelector(`[name=${field}]`);
            if (!input) continue;
            input.value = author[field];
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

document.addEventListener('DOMContentLoaded', loadAuthorData);