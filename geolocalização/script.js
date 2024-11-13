// script.js
let map;  // Variável para armazenar o mapa

// Função chamada ao clicar no botão
function getLocation() {
    // Verifica se a API de geolocalização está disponível
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showPosition,  // Sucesso
            showError      // Erro
        );
    } else {
        document.getElementById("output").innerHTML = "<p id='error'>A geolocalização não é suportada pelo seu navegador.</p>";
    }
}

// Função que exibe a posição no mapa
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Exibe as coordenadas no formato legível
    document.getElementById("output").innerHTML = `<p>Latitude: ${latitude}°</p><p>Longitude: ${longitude}°</p>`;

    // Se o mapa ainda não foi inicializado, cria o mapa
    if (!map) {
        map = L.map('map').setView([latitude, longitude], 13);  // Inicializa o mapa com a posição do usuário
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    // Adiciona um marcador para a posição do usuário
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup("<b>Você está aqui!</b>")
        .openPopup();
}

// Função chamada em caso de erro
function showError(error) {
    let errorMessage;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "Usuário negou a solicitação de geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "A localização não pôde ser determinada.";
            break;
        case error.TIMEOUT:
            errorMessage = "A solicitação de geolocalização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "Ocorreu um erro desconhecido.";
            break;
    }
    document.getElementById("output").innerHTML = `<p id='error'>${errorMessage}</p>`;
}
