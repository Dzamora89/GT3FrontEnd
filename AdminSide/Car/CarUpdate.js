$(document).ready(getSelect())

function getSelect() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost/gt3prostats/api/Car/getallCar.php", requestOptions)
        .then(response => response.json())
        .then(data => data.forEach( (dato) => {
            let select = document.getElementById('updateSelect')
            let option = document.createElement("option")
            option.value = dato.carID
            option.text = `#${dato.number} --> ${dato.manufacturer} --> ${dato.teamName} `
            select.add(option);
        }  ))
        .catch(error => console.log('error', error));
}
$('#updateSelect').change(() => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `http://localhost/gt3prostats/api/Car/getCarByID.php?carID=${document.getElementById("updateSelect").value}`

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            let jsonResult = JSON.parse(result)
            let div = document.getElementById('showCar')
            div.innerHTML = `
            <form class="d-flex flex-wrap justify-content-center w-100 gap-3">
            <div class="input-group mb-3 ">
                <span class="input-group-text w-25">Manufacturer</span>
                <input id="carManufacturer" type="text" class="form-control" placeholder="Manufacturer" aria-label="Manufacturer" aria-describedby="Manufacturer" value="${jsonResult.manufacturer}">
            </div>
            <div class="input-group mb-3 ">
                <span class="input-group-text" id="number">Number</span>
                <input id="carNumber" type="text" class="form-control"  aria-label="Number" aria-describedby="Number" value="${jsonResult.number}">
        </div>
            <div class="input-group mb-3 ">
                <span class="input-group-text" id="Class">class</span>
                <input id="className" type="text" class="form-control"  aria-label="Class" aria-describedby="Class" value="${jsonResult.classCar}">
        </div>
        <select id="teamName" class="form-select w-50" aria-label="Team Select">
           

        </select>
        </form>
        <button class="btn bg-success align-items w-50 m-auto mt-5" onclick="updateCar()"> Update Car </button>
    </div>
        </form>
    
    `;
            let team = jsonResult.teamID

            fetch("http://localhost/gt3prostats/api/Team/getAllTeam.php", requestOptions)
                .then(response => response.json())
                .then(data => data.forEach( (dato) => {
                    if (dato.teamID === team){
                        $('#teamName').append(`<option value="${dato.teamID}" selected>${dato.teamName}</option>`)
                    }else {
                        $('#teamName').append(`<option value="${dato.teamID}">${dato.teamName}</option>`)
                    }

                }  ))
                .catch(error => console.log('error', error));

        })
        .catch(error => console.log('error', error));
})


function updateCar() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");


    let carID = document.getElementById("updateSelect").value
    let manufacturer = $('#carManufacturer').val()
    let teamID = $('#teamName').val()
    let number = $('#carNumber').val()
    let clase = $('#className').val()


    var raw = `{\r\n    \"carID\" : \"${carID}\", 
    \"manufacturer\" : \"${manufacturer}\",   
    \r\n    \"teamID\" : \"${teamID}\",
    \r\n    \"number\" : \"${number}\",
    \r\n    \"classCar\" : \"${clase}\"}`;

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost/gt3prostats/api/car/UpdateCar.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Car Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .catch(error => {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Car NOT UPDATED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });
    getSelect()
}