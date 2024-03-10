const resultadoScreen = document.getElementById("resultadoScreen");

for (let i = 0; i <= 9; i++) document.getElementById(i).addEventListener("click", () => operandoNuevo(i));

const signos = [
  { id: "suma", signo: "+" },
  { id: "raiz", signo: "√" },
  { id: "resta", signo: "-" },
  { id: "division", signo: "/" },
  { id: "cuadrado", signo: "^2" },
  { id: "multiplicacion", signo: "*" },
];
const botones = {};
for (const id of [...signos.map((s) => s.id), "igual", "clear"]) botones[id] = document.getElementById(id);

let operando = 0;
let valorActual = 0;
let operandoTemp = 0;
let operacionPendiente = null;

for (const { id, signo } of signos.filter((s) => s.id !== "raiz"))
  botones[id].addEventListener("click", () => {
    resultadoScreen.innerHTML += signo;
    operacionPendiente = id;
    console.log(operacionPendiente);
    operandoTemp = operando;
    operando = 0;
  });

botones.raiz.addEventListener("click", function () {
  if (resultadoScreen.innerHTML === "0") resultadoScreen.innerHTML = "√";
  else resultadoScreen.innerHTML += "√";

  operacionPendiente = "raiz";
  console.log(operacionPendiente);
  operandoTemp = operando;
  operando = 0;
});

botones.igual.addEventListener("click", function () {
  // Realiza la operación pendiente si existe
  switch (operacionPendiente) {
    case "suma":
      valorActual += operando + operandoTemp; //Si el temporal vale 0, no afecta nada
      break;

    case "resta":
      valorActual -= operando - operandoTemp;
      break;

    case "multiplicacion": //Si el temporal vale 0 afecta, no podemos multiplicar por 0
      if (valorActual === 0) valorActual = operando * operandoTemp;
      else valorActual *= operando;
      break;

    case "division":
      if (valorActual === 0) valorActual = operandoTemp / operando;
      else valorActual /= operando;
      break;

    case "cuadrado":
      if (valorActual === 0) valorActual = operandoTemp ** 2; // Aquí también importa el orden
      else valorActual **= 2;
      break;

    case "raiz":
      if (valorActual === 0) valorActual = Math.sqrt(operando + operandoTemp); // Aquí también importa el orden
      else valorActual = Math.sqrt(valorActual);
      break;

    default:
      alert("Mamahuevo");
  }

  operando = 0;
  operacionPendiente = null;
  resultadoScreen.innerHTML = valorActual;
});

botones.clear.addEventListener("click", function () {
  operando = 0;
  valorActual = 0;
  operacionPendiente = null;
  resultadoScreen.innerHTML = "0";
});

function operandoNuevo(value) {
  operando = parseInt(operando.toString() + value);

  // Este if solo hace que si hay un cero al iniciar, lo borre de la barra y ponga el operando
  if (resultadoScreen.innerHTML == 0) resultadoScreen.innerHTML = value; //Aquí lo asigna, "quitando el cero"
  else resultadoScreen.innerHTML += value;

  console.log(operando);
}
