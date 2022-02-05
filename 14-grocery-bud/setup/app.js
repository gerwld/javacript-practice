// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const input = document.getElementById('grocery');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clear = document.querySelector('.clear-btn');
const btn = form.querySelector('.submit-btn');
// edit option
let editElement;
let editFlag = false;
let editId = '';

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addForm);
clear.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);
// ****** FUNCTIONS **********
function addForm(e) {
    e.preventDefault();
    const value = input.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value);

        addToLocalStorage(id, value);
        //set to default
        setBackToDefault();
    }
    else if (value && editFlag) {
        editElement.innerHTML = input.value;
        editElement = '';
        
        //change localStorage
        editLocalStorage(editId, input.value);

        displayAlert('item changed', 'success');
        setBackToDefault();
    }
    else {
        displayAlert('please enter value', 'danger');
    }
}

//display alert 
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

//set back to default
function setBackToDefault() {
    input.value = '';
    editFlag = false;
    editId = '';
    btn.textContent = 'submit';

}

//clear all items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        })
    }
    container.classList.remove('show-container');
    localStorage.removeItem('list');
    displayAlert('Empty list', 'danger');
    setBackToDefault();
}

//edit element
function editItem(e) {
    //get parent id, set edit mode
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    editElement = element.querySelector('.title');

    input.value = editElement.innerHTML;
    editFlag = true;
    btn.textContent = 'edit';
    editId = id;
}
//delete element
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    //remove from local storage
    removeFromLocalStorage(id);

    displayAlert('item removed', 'success');
    setBackToDefault();
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = { id: id, value: value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}
function removeFromLocalStorage(id) {
    //get items from localStorage
    let items = getLocalStorage();
    //delete item by id
    items = items.filter(function (e) {
        if (e.id !== id) {
            return e;
        }
    })
    //set new array
    localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (e) {
        if(e.id === id) {
            e.value = value;
            return e;
        } else {
            return e;
        };
    })
    //set new array
    localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0) {
        items.map(function(e){
            createListItem(e.id, e.value);
        })
    }
}

function createListItem(id, value) {
  //create element
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  //add id
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `
  <p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  //append child
  list.appendChild(element);
  displayAlert('element added to the list', 'success');
  //show container;
  container.classList.add('show-container');

  const editBtn = element.querySelector('.edit-btn');
  const deleteBtn = element.querySelector('.delete-btn');
  editBtn.addEventListener('click', editItem);
  deleteBtn.addEventListener('click', deleteItem);
}