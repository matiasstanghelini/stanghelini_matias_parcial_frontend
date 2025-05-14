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

    // Asignamos los eventos de hover a la celda de color recién creada
    const colorCell = row.querySelector('.color-cell');
    
    // Función para obtener el color CSS a partir del texto
    function getBackgroundColor(colorText) {
        colorText = colorText.toLowerCase();
        
        if (colorText === 'rojo') return 'red';
        if (colorText === 'verde') return 'green';
        if (colorText === 'azul') return 'blue';
        return colorText; // Por si se usa un color válido en CSS
    }
    
    // Evento para cuando se pasa el cursor sobre la celda de color
    colorCell.addEventListener('mouseover', function() {
        const colorText = this.textContent;
        const backgroundColor = getBackgroundColor(colorText);
        
        // Cambiar solo el color de fondo de esta celda
        this.style.backgroundColor = backgroundColor;
    });
    
    // Evento para cuando se quita el cursor de la celda de color
    colorCell.addEventListener('mouseout', function() {
        // Restaurar el color de fondo de esta celda
        this.style.backgroundColor = '';
    });

    document.getElementById('carForm').reset();
});
