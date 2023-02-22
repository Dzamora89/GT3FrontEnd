//Todo: Jquery Events
$(document).ready(championshipSelect())
$(document).ready(teamSelect())



function championshipSelect() {
    let requestOptions = {
        method: 'GET', redirect: 'follow'
    };

    fetch("http://localhost/gt3prostats/api/championship/getallchampionship.php", requestOptions)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('championShipSelect')
            let option = document.createElement("option")
            option.value = dato.championshipID
            option.text = `${dato.championshipName} ${dato.championshipSeason}`
            select.add(option);
        }))
        .catch(error => console.log('error', error));
}

function teamSelect() {
    const requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
    };


    fetch("http://localhost/gt3prostats/api/team/getallteam.php", requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('TeamSelect')
            let option = document.createElement("option")
            option.value = dato.teamID
            option.text = `${dato.teamName} , ${dato.teamCarBrand} `
            select.add(option);
        }))
        .catch(error => console.log('error', error));

}