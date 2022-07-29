const url = document.getElementById("url");
const domain = document.getElementById("domain");
const update = document.getElementById("update");
const create = document.getElementById("create");
const expire = document.getElementById("expire");
const registar = document.getElementById("registar");
const country = document.getElementById("country");
const urlInput = document.getElementById("name");
const button = document.getElementById("button");
const loader = document.getElementById("loader");

const getData = (input) => {
  console.log(input);
  console.log("hi");
  //   const data = await axios.get(`http://localhost:3000/${urlInput.value}`);
  //   console.log(data);
};

button.addEventListener("click", async function () {
  loader.classList.remove("hide");
  const data = await axios.get(
    `http://localhost:3000/api/?id=${urlInput.value}`
  );
  console.log(data);
  url.innerText = urlInput.value;
  domain.innerText = data.data.domain;
  update.innerText = data.data.updated_date;
  create.innerText = data.data.creation_date;
  expire.innerText = data.data.expiration_date;
  registar.innerText = data.data.registar;
  country.innerText = data.data.reg_country;
  urlInput.value = "";
  loader.classList.add("hide");
});
