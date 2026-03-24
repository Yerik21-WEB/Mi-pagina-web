import { data } from './data.js'


const btn = document.querySelector('.btn-agregar')
const list_items = document.querySelector('.menu-items');
const lista_admin = document.querySelector('.lista-admin')
console.log(lista_admin)

let menuInfo = JSON.parse(localStorage.getItem('miMenuGuardado')) || data.menu;

const getId = () => {
  if (!menuInfo || menuInfo.length === 0) return 0; 
  return menuInfo.at(-1).id; 

}


const eliminarItem = (idParaBorrar) => {
  menuInfo = menuInfo.filter(item => item.id !== idParaBorrar);
  localStorage.setItem('miMenuGuardado', JSON.stringify(menuInfo));
  
  renderMenu();
  renderAdminList();
};


const renderAdminList = () => {
  lista_admin.innerHTML = ''; 

  menuInfo.forEach(element => {
    console.log(element)
    const li = document.createElement('li');
    li.classList.add('admin-item');
    li.innerText = element.nombre;

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.innerText = 'Eliminar';
    
    btnEliminar.addEventListener('click', () => {
      eliminarItem(element.id);
    });

    li.appendChild(btnEliminar);
    lista_admin.appendChild(li);
  });
};


const renderMenu = () => {
  list_items.innerHTML = ''

    menuInfo.forEach(element => {
    const listItem = document.createElement('li')
    const listLink = document.createElement('a')

    listLink.setAttribute('href', element.enlace)
    listLink.innerText = element.nombre

    listItem.classList.add('list-item')

    listItem.appendChild(listLink)
    list_items.appendChild(listItem)
  });

}

document.addEventListener('DOMContentLoaded',  () => {
  renderMenu()
  renderAdminList()

})


btn.addEventListener('click', async () => {
  const input = document.querySelector('#agregar')
  const lstID = getId()

  const newItem = {
    'id' : lstID + 1,
    'nombre': input.value,
    'enlace': `/${input.value.toLowerCase()}`

  }

  menuInfo.push(newItem)
  localStorage.setItem('MenuActualizado', JSON.stringify(menuInfo))
  input.value = ''
  renderMenu()
  renderAdminList()

})