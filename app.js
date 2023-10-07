const contractAddress = "0x988527647cDC2A710C8a7570b39E06ed3Cb89a9C"; 
const abiUrl = "https://raw.githubusercontent.com/SorosLabsdevs/Smartcontract-telcolicitacion/main/abi.json";
const web3 = new Web3("https://skynet.soroschain.com/"); // Reemplaza con tu RPC

let contract;
let accounts;

async function init() {
    try {
        const response = await fetch(abiUrl);
        const abi = await response.json();

        contract = new web3.eth.Contract(abi, contractAddress);

        accounts = await web3.eth.getAccounts();
        updateContractInfo();
    } catch (error) {
        console.error("Error al inicializar:", error);
    }
}

async function updateContractInfo() {
    try {
        const categoriaActual = await contract.methods.categoriaActual().call();
        const tipoFrecuenciaActual = await contract.methods.tipoFrecuenciaActual().call();
        const montoMinimoPuja = await contract.methods.montoMinimoPuja().call();
        const duracionRonda = await contract.methods.duracionRonda().call();
        const fechaFinRonda = await contract.methods.fechaFinRonda().call();

        document.getElementById("contractAddress").textContent = contractAddress;
        document.getElementById("categoriaActual").textContent = categoriaActual;
        document.getElementById("tipoFrecuenciaActual").textContent = tipoFrecuenciaActual;
        document.getElementById("montoMinimoPuja").textContent = montoMinimoPuja;
        document.getElementById("duracionRonda").textContent = duracionRonda;
        document.getElementById("fechaFinRonda").textContent = new Date(fechaFinRonda * 1000).toLocaleString();
    } catch (error) {
        console.error("Error al actualizar la información del contrato:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init();

    document.getElementById("registrarEmpresaButton").addEventListener("click", async () => {
        try {
            const nombreEmpresa = prompt("Ingrese el nombre de la empresa");
            if (nombreEmpresa) {
                await contract.methods.registrarEmpresa(nombreEmpresa).send({ from: accounts[0] });
                updateContractInfo();
                alert("Empresa registrada con éxito");
            }
        } catch (error) {
            console.error("Error al registrar la empresa:", error);
        }
    });

    document.getElementById("hacerOfertaButton").addEventListener("click", async () => {
        try {
            const montoOferta = prompt("Ingrese el monto de la oferta");
            if (montoOferta) {
                await contract.methods.hacerOferta(web3.utils.toWei(montoOferta, "ether")).send({ from: accounts[0] });
                updateContractInfo();
                alert("Oferta realizada con éxito");
            }
        } catch (error) {
            console.error("Error al hacer la oferta:", error);
        }
    });

    document.getElementById("cerrarRondaButton").addEventListener("click", async () => {
        try {
            await contract.methods.cerrarRonda().send({ from: accounts[0] });
            updateContractInfo();
            alert("Ronda cerrada con éxito");
        } catch (error) {
            console.error("Error al cerrar la ronda:", error);
        }
    });

    document.getElementById("emitirPenalizacionButton").addEventListener("click", async () => {
        try {
            const idRonda = prompt("Ingrese el ID de la ronda a penalizar");
            const razon = prompt("Ingrese la razón de la penalización");
            if (idRonda && razon) {
                await contract.methods.emitirPenalizacion(idRonda, razon).send({ from: accounts[0] });
                updateContractInfo();
                alert("Penalización emitida con éxito");
            }
        } catch (error) {
            console.error("Error al emitir la penalización:", error);
        }
    });
});
