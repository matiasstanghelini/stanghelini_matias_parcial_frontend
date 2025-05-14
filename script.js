// Activar tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

document.getElementById('carForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const anio = parseInt(document.getElementById('anio').value);
    const color = document.getElementById('color').value;
    const warningMessage = document.getElementById('warning');

    if (!marca || !modelo || !anio || anio < 1886 || !color) {
        warningMessage.style.display = 'block';
        return;
    }

    warningMessage.style.display = 'none';

    const tableBody = document.getElementById('car-table-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${marca}</td>
        <td>${modelo}</td>
        <td>${anio}</td>
        <td class="color-cell">${color}</td>
    `;

    tableBody.appendChild(row);

    document.querySelectorAll('.color-cell').forEach(cell => {
        cell.addEventListener('mouseover', function() {
            this.style.backgroundColor = this.textContent;
        });
        cell.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
        });
    });

    document.getElementById('carForm').reset();
});

// Función para agregar un auto a la lista
function addCarToList(marca, modelo, anio, color) {
    const autosList = document.getElementById('autosList');
    
    // Crear el elemento de la lista
    const listItem = document.createElement('div');
    listItem.className = 'list-group-item list-group-item-action animate__animated animate__fadeIn';
    
    // Contenido del elemento de la lista
    listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${marca}</h5>
            <div>
                <button class="btn btn-sm btn-outline-primary mr-2" title="Editar"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-outline-danger" title="Eliminar"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <p class="mb-1">${modelo} - ${anio}</p>
        <small class="text-muted">Color: <span class="color-sample">${color}</span></small>
    `;
    
    // Añadir al inicio de la lista
    autosList.prepend(listItem);
    
    // Encontrar la muestra de color
    const colorSample = listItem.querySelector('.color-sample');
    
    // Agregar el evento de mouseover para cambiar el color de fondo
    colorSample.addEventListener('mouseover', function() {
        colorSample.style.backgroundColor = color;
        colorSample.style.padding = '0 10px';
        colorSample.style.color = 'white';
        colorSample.style.borderRadius = '3px';
    });
    
    // Agregar el evento de mouseout para restaurar el color de fondo
    colorSample.addEventListener('mouseout', function() {
        colorSample.style.backgroundColor = '';
        colorSample.style.padding = '';
        colorSample.style.color = '';
        colorSample.style.borderRadius = '';
    });
    
    // Configurar los botones de acción
    const editButton = listItem.querySelector('.btn-outline-primary');
    const deleteButton = listItem.querySelector('.btn-outline-danger');
    
    deleteButton.addEventListener('click', function() {
        listItem.classList.add('animate__fadeOut');
        setTimeout(() => {
            autosList.removeChild(listItem);
        }, 500);
    });
}

