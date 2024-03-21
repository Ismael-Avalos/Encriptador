//Restricción al textarea para permitir solo Minúsculas y no permitir caracteres especiales a 
//excepción de espacios en blanco, signo de admiracion final y pregunta
function restrictInput(event) {
    const input = event.target;
    const inputValue = input.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    input.value = inputValue.replace(/[^a-z\s!?]/g, "");
}

//Declaración de variables para el manejo del DOM
const encryptButton = document.querySelector('.encryptor__buttons--encrypt')
const decryptButton = document.querySelector('.encryptor__buttons--decrypt')
const figure = document.querySelector('.output__figure')
const container = document.querySelector('.output__tip')
const result = document.querySelector('.output__result--text')

//Evento Onclick de los botones para encriptar o desencriptar
//Reciben en el arrow function como parametro un valor booleano (true o falso)
encryptButton.onclick = () => encryptOrDecrypt(true);
decryptButton.onclick = () => encryptOrDecrypt(false);

//Función para recuperar el texto del textarea en el html
function recoverText() {
    let textBox = document.querySelector('.encryptor__input')
    return textBox.value
}

//Función para escoger entre encriptación o desencriptación
//La condición para el valor booleano la manejamos con el operador ternario (? :)
//True = encriptar, False = desencriptar
function encryptOrDecrypt(encrypting) {
    hideAhead();
    const textBoxContent = recoverText();
    result.textContent = encrypting ? encryptText(textBoxContent) : decryptText(textBoxContent);
}

//Función que agrega una clase "hide" a los elementos html almacenados en las constantes
//figure, y container.
//También remueve la clase "result" al elemento html almacenado en la constante result
function hideAhead() {
    figure.classList.add('hide')
    container.classList.add('hide')
    result.classList.remove('result')
}

//Objeto (llave:valor) que contiene el valor de cada llave (a,e,i,o,u) que nos servirá
//para la encriptación
const substitutionMap = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

//Función para encriptar
function encryptText(message) {
    return message.replace(/[aeiou]/g, match => substitutionMap[match] || match);
}

//Función para desencriptar
function decryptText(message) {
    return message.replace(/ai|enter|imes|ober|ufat/g, match => Object.keys(substitutionMap).find(key => substitutionMap[key] === match) || match);
}

//Constante que almacena el botón copiar
const btnCopy = document.querySelector('.output__button')

//Función para copiar el texto del output al esuchar el evento "click" del botón copiar
btnCopy.addEventListener("click", function copyToClipboard() {
    const content = result.textContent;
    navigator.clipboard.writeText(content);
});

//Refresh de la página al tocar el logo
document.getElementById("logo").addEventListener("click", function(event){
        event.preventDefault();
        location.reload();
 })