// Importando la biblioteca web3
import Web3 from 'web3';

// URL del ABI del contrato
const abiUrl = 'https://raw.githubusercontent.com/SorosLabsdevs/Smartcontract-telcolicitacion/main/abi.json';

// Dirección del contrato
const contractAddress = '0x988527647cDC2A710C8a7570b39E06ed3Cb89a9C';

// Creando una instancia de web3 y configurando el provider
let web3 = new Web3(new Web3.providers.HttpProvider('https://skynet.soroschain.com/'));

// Creando una variable para almacenar el contrato
let contract;

// Función para cargar el ABI y configurar el contrato
async function setupContract() {
    try {
        // Obteniendo el ABI del contrato desde la URL
        const response = await fetch(abiUrl);
        const abi = await response.json();

        // Configurando el contrato
        contract = new web3.eth.Contract(abi, contractAddress);
    } catch (error) {
        console.error("Error setting up the contract: ", error);
    }
}

// Función para registrar una empresa
async function registrarEmpresa(nombre) {
    try {
        // Obteniendo la cuenta actualmente seleccionada en Metamask
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Llamando a la función registrarEmpresa del contrato
        await contract.methods.registrarEmpresa(nombre).send({ from: account });
    } catch (error) {
        console.error("Error registering the company: ", error);
    }
}

// Función para hacer una oferta
async function hacerOferta(monto) {
    try {
        // Obteniendo la cuenta actualmente seleccionada en Metamask
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Llamando a la función hacerOferta del contrato
        await contract.methods.hacerOferta(monto).send({ from: account });
    } catch (error) {
        console.error("Error making a bid: ", error);
    }
}

// Función para cerrar la ronda actual
async function cerrarRonda() {
    try {
        // Obteniendo la cuenta actualmente seleccionada en Metamask
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Llamando a la función cerrarRonda del contrato
        await contract.methods.cerrarRonda().send({ from: account });
    } catch (error) {
        console.error("Error closing the round: ", error);
    }
}

// Función para emitir una penalización
async function emitirPenalizacion(idRonda, razon) {
    try {
        // Obteniendo la cuenta actualmente seleccionada en Metamask
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Llamando a la función emitirPenalizacion del contrato
        await contract.methods.emitirPenalizacion(idRonda, razon).send({ from: account });
    } catch (error) {
        console.error("Error issuing a penalty: ", error);
    }
}

// Inicializando el contrato cuando se carga la página
window.onload = setupContract;

// Exportando las funciones para que puedan ser utilizadas en otros archivos
export { registrarEmpresa, hacerOferta, cerrarRonda, emitirPenalizacion };
