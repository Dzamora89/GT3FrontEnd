$( document ).ready(getSelect() )

function getSelect() {
    $('#showRace').hide()
    $('#deleteSelect2').hide()
    const requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost/gt3prostats/backend/api/championship/getallchampionship.php", requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('deleteSelect')
            let option = document.createElement("option")
            option.value = dato.championshipID
            option.text = `${dato.championshipName} , ${dato.championshipSeason} `
            select.add(option);
        }))
        .catch(error => console.log('error', error));

}

$('#deleteSelect').change(() => {
    $('#deleteSelect2').show()
    $('#deleteSelect2').empty()
    const requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `http://localhost/gt3prostats/backend/api/race/getraceofchampionshipid.php?raceChampionshipID=${document.getElementById("deleteSelect").value}`

    fetch(url, requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('deleteSelect2')
            let option = document.createElement("option")

                option.value = dato.raceID
                option.text = `${dato.raceTrack} , ${dato.raceCountry} `
                select.add(option);

        }))
        .catch(error => console.log('error', error));

})

$('#deleteSelect2').change(() => {
    const requestOptions2 = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `http://localhost/gt3prostats/backend/api/Race/getRaceByID.php?raceID=${$('#deleteSelect2').val()}`
    $('#showRace').show();
    fetch(url, requestOptions2)
        .then(response => response.json())
        .then(jsonResult => {
            $('#showRace').html(`<form class="d-flex flex-wrap justify-content-center w-100 gap-3">
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Track Name</span>
            <input disabled value="${jsonResult.raceTrack}" id="track" type="text" class="form-control" placeholder="Circuit" aria-label="circuit" aria-describedby="circuit">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Country</span>
            <input disabled value="${jsonResult.raceCountry}" id="country" type="text" class="form-control" placeholder="Country" aria-label="Country" aria-describedby="Country">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Race date</span>
            <input disabled value="${jsonResult.raceDateOfRace}" id="dateOfRace" type="date" class="form-control"   aria-label="Race date" aria-describedby="Race-date">
        </div>
    </form>
    <button class="btn bg-danger align-items w-50 m-auto mt-5" onclick="deleteRace()">Delete a Race</button>`)
        }).catch(error => console.log('error', error));

})

function deleteRace() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    let raceID = $('#deleteSelect2').val()


    var raw = `{\r\n    \"raceID\" : \"${raceID}\"
    \r\n}`;

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost/gt3prostats/backend/api/race/Deleterace.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Race Deleted
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
                Race NOT DELETED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });
    $('#deleteSelect').empty()
    getSelect();
}