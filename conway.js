/*CONWAY'S GAME OF LIFE
The rules of the game are:

    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    Any live cell with more than three live neighbours dies, as if by overcrowding.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any dead cell with exactly three live neighbours becomes a live cell.*/

//Variables
let ren, col, sizeElegido, id;
let colTodas = [];
let startButton = document.getElementById('start');

//Obtiene el div contenido y le inserta una tabla
let contenido = document.getElementById('contenido');
let tabla = document.createElement('table');
contenido.appendChild(tabla);

//Ejecuta al dar clic en una celda
function cambiaFondo(i) {
  colTodas[i].style.background = 'rgb(200, 0, 0)';
  if (colTodas[i].innerHTML == '0') {
    colTodas[i].innerHTML = '1';
  } else if (colTodas[i].innerHTML == '1') {
    colTodas[i].innerHTML = '0';
  }
}

//Obtiene el tamaño deseado para la tabla
function createTable () {  
  
  //Resetea la tabla y el arreglo de las casillas
  tabla.innerHTML = '';
  colTodas = [];
  //Obtiene tamaño deseado (inputSize)
  let input1 = document.getElementById('inputSize');
  let size = Math.abs(parseInt(input1.value));
  sizeElegido = size;
  if (size > 250 || size < 10) {
    size = 10;
    input1.value = 10;
  } 
  //Crea la tabla de tamaño inputSize
  let index = 0;
  for (let i = 0; i < size; i++) {
    ren = tabla.insertRow(-1);
    for (let j = 0; j < size; j++) {
      col = ren.insertCell(-1);
      col.id = index;
      col.innerHTML = '';
      col.style.cursor = 'pointer';
      //Crea célula viva o muerta al azar
      let azar = Math.round(Math.random());
      if (azar == 1) col.style.background = 'rgb(200, 0, 0)';
      index++;
    }  
  }
  
  //Agrega el evento clic a cada celda
  for (let i = 0; i < size**2; i++) {
    colTodas.push(document.getElementById(i));
    colTodas[i].addEventListener('mouseover', () => cambiaFondo(i), false);  
  }

  //Habilita botón 'start'
  startButton.disabled = false;
}

//RUN
function run() {
  //Obtiene los colores de las celdas y los convierte en un arreglo. Rojo = 1,
  let cells = [], index = 0;
  for (let i = 0; i < sizeElegido; i++) {
    cells.push([]);
    for (let j = 0; j < sizeElegido; j++) {        
      if (colTodas[index].style.background == 'rgb(200, 0, 0)') {
        cells[i].push('1');
      } else {
        cells[i].push('0');
      }
      index++;        
    }        
  }
  //console.log(JSON.stringify(cells));
  //console.log('ejecutando...');
  //Ejecuta la siguiente generación
  let x = cells[0].length, y = cells.length;
  let cellsNext = JSON.parse(JSON.stringify(cells));
  //Para cada celda
  for (let j = 0; j < y; j++) {
    for (let k = 0; k < x; k++) {
      //Para cada celda aledaña
      let vecinos = 0;
      for (let l = -1; l < 2; l++) {
        for (let m = -1; m < 2; m++) {
          //Si no es la propia celda
          if (m != 0 || l != 0) {
            let incrx = k + m, incry = j + l;
            //Si está dentro de rango
            if (incrx >= 0 && incrx < x && incry >= 0 && incry < y) {
              //Suma los vecinos
              if (cells[incry][incrx] == 1) vecinos++;
            }
          }                    
        }          
      }
      //console.log(`(${k}, ${j}) tiene ${vecinos} vecinos`);

      //Célula viva 
      if (cells[j][k] == 1) {
        //Menos de 2 o más de 3 vecinos => muere
        if (vecinos < 2 || vecinos > 3) {
          cellsNext[j][k] = 0;
          //2 o 3 vecinos => vive
        } else {
          cellsNext[j][k] = 1;
        }
        //Célula muerta con 3 vecinos => vive
      } else if (vecinos == 3) {
        cellsNext[j][k] = 1;
      }        
    }      
  }
  //Coloca los colores de las celdas con la siguiente generación
  index = 0;
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {

      if (cellsNext[i][j] == '1') {
        colTodas[index].style.background = 'rgb(200, 0, 0)';
      } else {
        colTodas[index].style.background = '';
      }
      index++;        
    }        
  }
}

//Inicia las generaciones
function startGens() {
  if (startButton.innerHTML == 'Start') {
    startButton.innerHTML = 'Stop';
    //Obtiene velocidad o delay
    let inputDelay = document.getElementById('inputDelay');
    let delay = Math.abs(parseInt(inputDelay.value));
    if (delay > 1000 || delay < 10) {
      delay = 150;
      inputDelay.value = '150';
    }
    id = setInterval(run, delay);
  } else {
    startButton.innerHTML = 'Start';
    clearInterval(id);
  }
}