$(document).ready(fillTheTable())
function fillTheTable() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
//Todo Investiga que Carajos hay aqui
    fetch("http://localhost/gt3prostats/backend/api/race/getallRace.php", requestOptions)
        .then(response => response.json())
        .then(dataRaces => {
            dataRaces.forEach((dato) =>{
                $('#raceTable').append(`<tr>
                <td>${dato.raceID}</td>
                <td>${dato.raceTrack}</td>
                <td>${dato.raceDateOfRace}</td>
                <td>${dato.raceCountry}</td>
                <td >${dato.raceName}</td>
                </tr>`)
            })})
        .catch(error => console.log('error', error));


}

