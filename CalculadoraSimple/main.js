const resultadoScreen = document.getElementById('resultadoScreen')

const boton1 = document.getElementById('1');
const boton2 = document.getElementById('2');
const boton3 = document.getElementById('3');
const boton4 = document.getElementById('4');
const boton5 = document.getElementById('5');
const boton6 = document.getElementById('6');
const boton7 = document.getElementById('7');
const boton8 = document.getElementById('8');
const boton9 = document.getElementById('9');
const boton0 = document.getElementById('0');

const botonSuma = document.getElementById('+');
const botonResta = document.getElementById('-');
const botonMulti = document.getElementById('x');
const botonDivi = document.getElementById('/');
const botonCuadr = document.getElementById('cuadrado');
const botonRaiz = document.getElementById('raiz');
const botonIgual = document.getElementById('=');
const botonClear = document.getElementById('clear');

let valorActual = 0;
let operandoTemp = 0;
let operando = 0;
let operacionPendiente = null;

boton1.addEventListener('click', function () { operandoNuevo('1'); });
boton2.addEventListener('click', function () { operandoNuevo('2') });
boton3.addEventListener('click', function () { operandoNuevo('3') });
boton4.addEventListener('click', function () { operandoNuevo('4') });
boton5.addEventListener('click', function () { operandoNuevo('5') });
boton6.addEventListener('click', function () { operandoNuevo('6') });
boton7.addEventListener('click', function () { operandoNuevo('7') });
boton8.addEventListener('click', function () { operandoNuevo('8') });
boton9.addEventListener('click', function () { operandoNuevo('9') });
boton0.addEventListener('click', function () { operandoNuevo('0') });

botonSuma.addEventListener('click', function () {
    resultadoScreen.innerHTML += '+'; //Queremos pintar esto en la pantalla
    operacionPendiente = 'suma';
    console.log(operacionPendiente)
    operandoTemp = operando;
    operando = 0;
});

botonResta.addEventListener('click', function () {
    resultadoScreen.innerHTML += '-';
    operacionPendiente = 'resta';
    console.log(operacionPendiente)
    operandoTemp = operando;
    operando = 0;
});

botonMulti.addEventListener('click', function () {
    resultadoScreen.innerHTML += '*';
    operacionPendiente = 'multiplicacion';
    console.log(operacionPendiente)
    operandoTemp = operando;
    operando = 0;
});

botonDivi.addEventListener('click', function () {
    resultadoScreen.innerHTML += '/';
    operacionPendiente = 'division';
    console.log(operacionPendiente)
    operandoTemp = operando;
    operando = 0;
});

botonCuadr.addEventListener('click', function () {
    resultadoScreen.innerHTML += '^2';
    operacionPendiente = 'cuadrado';
    console.log(operacionPendiente)
    operandoTemp = operando;
    operando = 0;
});

botonRaiz.addEventListener('click', function () {
    if (resultadoScreen.innerHTML = '0') {
        resultadoScreen.innerHTML = '√'
        operacionPendiente = 'raiz';
        console.log(operacionPendiente)
        operandoTemp = operando;
        operando = 0;
    } else {
        resultadoScreen.innerHTML += '√';
        operacionPendiente = 'raiz';
        console.log(operacionPendiente)
        operandoTemp = operando;
        operando = 0;
    }

});


botonIgual.addEventListener('click', function () {
    // Realiza la operación pendiente si existe
    switch (operacionPendiente) {
        case 'suma':
            valorActual += (operando + operandoTemp); //Si el temporal vale 0, no afecta nada
            operando = 0;
            operacionPendiente = null;
            resultadoScreen.innerHTML = valorActual;
            break;

        case 'resta':
            valorActual -= (operando - operandoTemp);
            operando = 0;
            operacionPendiente = null;
            resultadoScreen.innerHTML = valorActual;
            break;

        case 'multiplicacion': //Si el temporal vale 0 afecta, no podemos multiplicar por 0
            if (valorActual === 0) {
                valorActual = (operando * operandoTemp);
            } else {
                valorActual *= operando;
            }
            operando = 0;
            operacionPendiente = null;
            resultadoScreen.innerHTML = valorActual;
            break;

        case 'division':
            if (valorActual === 0) {
                valorActual = (operandoTemp / operando);
            } else {
                valorActual /= operando;
            }
            operando = 0;
            operacionPendiente = null;
            resultadoScreen.innerHTML = valorActual;
            break;

        case 'cuadrado':
            if (valorActual === 0) {
                valorActual = operandoTemp ** 2; // Aquí también importa el orden
            } else {
                valorActual **= 2;
            }
            operando = 0;
            operacionPendiente = null;
            resultadoScreen.innerHTML = valorActual;
            break;

        case 'raiz':
            if (valorActual === 0) {
                valorActual = Math.sqrt(operando + operandoTemp); // Aquí también importa el orden
            } else {
                valorActual = Math.sqrt(valorActual);
            }
            operando = 0;
            operacionPendiente = null;
            resultadoScreen.innerHTML = valorActual;
            break;

        default:
            alert('Mamahuevo');
            break;
    }

});

botonClear.addEventListener('click', function () {
    resultadoScreen.innerHTML = '0';
    valorActual = 0;
    operando = 0;
    operacionPendiente = null;
})

function operandoNuevo(value) {
    if (resultadoScreen.innerHTML == 0) { //Este if solo hace que si hay un cero al iniciar, lo borre de la barra y ponga el operando
        operando = parseInt(operando.toString() + value);
        resultadoScreen.innerHTML = value; //Aquí lo asigna, "quitando el cero"
        console.log(operando);
    } else {
        operando = parseInt(operando.toString() + value);
        resultadoScreen.innerHTML += value;
        console.log(operando);
    }
}