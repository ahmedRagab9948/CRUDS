let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let mood = "create";
let tmp;

//************** */ get total ********************************

function getTotal() {
  if (price.value != "" && taxes.value != "") {
    let result =
      +price.value +
      +taxes.value -
      ((+price.value + +taxes.value) / 100) * +discount.value;
    total.innerHTML = result;
    total.style.background = "rgb(27 160 27)";
  } else {
    total.innerHTML = "";
    total.style.background = "#f00";
  }
}
//************** */ get total ********************************

// *************** create data *******************************
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 200
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
};
// *************** create data *******************************

// *************** clear data *******************************
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// *************** clear data *******************************

// *************** Show data (Read Operation) *******************************
function showData() {
  getTotal();
  let table = "";
  for (i = 0; i < dataPro.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].discount}%</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><i id="edit" onclick = "updateData(${i})" class="far fa-edit"></i></td>
                <td><i id="trash" onclick = "deleteData(${i})" class="fas fa-trash-alt"></i></td>
            </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onclick = "deleteAll()">Delete All Product (${dataPro.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

// *************** Show data (Read Operation) *******************************

// *************** Delete data (Delete Operation) *******************************
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
// *************** Delete data (Delete Operation) *******************************

// *************** Delete All data (Delete All) *******************************
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// *************** Delete All (Delete All) *******************************

// *************** Update Data ********************************************
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// *************** Update Data ********************************************

// ****************** Search **********************************************
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood === "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].discount}%</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><i id="edit" onclick = "updateData(${i})" class="far fa-edit"></i></td>
                <td><i id="trash" onclick = "deleteData(${i})" class="fas fa-trash-alt"></i></td>
            </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].discount}%</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><i id="edit" onclick = "updateData(${i})" class="far fa-edit"></i></td>
                <td><i id="trash" onclick = "deleteData(${i})" class="fas fa-trash-alt"></i></td>
            </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// ****************** Search **********************************************
