var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


fetch("http://localhost/gt3prostats/api/Team/getAllTeam.php", requestOptions)
    .then(response => response.json())
    .then(data => data.forEach( (dato) => {
        $('#teamName').append(`<option value="${dato.teamID}">${dato.teamName}</option>`)
    }  ))
    .catch(error => console.log('error', error));

function createRace(){

    let manufacturer = $('#carManufacturer').val()
    let teamID = $('#teamName').val()
    let number = $('#carNumber').val()
    let clase = $('#className').val()



    var raw = `{\r\n    \"manufacturer\" : \"${manufacturer}\",
    \r\n    \"teamID\" : \"${teamID}\",
    \r\n    \"number\" : \"${number}\",
    \r\n    \"class\" : \"${clase}\"}`;




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };






    let result = fetch("http://localhost/gt3prostats/api/Car/CreateCar.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Car Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .catch(error => {
            console.log('error', error)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Car Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

}