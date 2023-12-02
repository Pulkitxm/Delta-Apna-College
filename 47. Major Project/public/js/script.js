(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const params = new URLSearchParams(window.location.search);

const startLoginParam = params.get("startlogin");
const startRegisterParam = params.get("startregister");
const showWithTaxes = params.get("showtaxes");

const loginModal = document.getElementById("exampleModalToggle");
const registerModal = document.getElementById("exampleModalToggle2");

if (startLoginParam === "true") {
  const bootstrapModal = new bootstrap.Modal(loginModal);
  bootstrapModal.show();
}

if (startRegisterParam === "true") {
  const bootstrapModal = new bootstrap.Modal(registerModal);
  bootstrapModal.show();
}

const taxSwitch = document.getElementById("taxSwitch");
const taxContainer = taxSwitch.parentElement.parentElement;
if (showWithTaxes=="false") {
  taxSwitch.checked = false;
}
if (showWithTaxes == "true") {
  taxSwitch.checked = true;
}

taxSwitch.addEventListener("click", () => {
    if (taxSwitch.checked) { 
      window.location.href = `/showtaxes/${false}`;
    } else {
      window.location.href = `/`;
    }
});

const cateogaryElements = Array.from(
  document.getElementsByClassName("cateogary")
);
cateogaryElements.forEach((i) => { 
  i.addEventListener("click", () => {
    window.location.href = `/cateogary/${i.id}`;
  });
})
if (window.innerWidth < 1000) {
  const search = document.getElementById("search");
  // const bootstrapModal = new bootstrap.Modal(search);
  // bootstrapModal.show();
  search.style.display = "none";
}