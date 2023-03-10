//Todo: Jquery Events
var requestOptions = {
    method: 'GET', redirect: 'follow'
};
//Todo: Cambiar los Select al evento de Jquery para Change on Select

fetch("http://localhost/gt3prostats/backend/api/championship/getallchampionship.php", requestOptions)
    .then(response => response.json())
    .then(data => data.forEach((dato) => {
        let select = document.getElementById('updateSelect')
        let option = document.createElement("option")
        option.value = dato.championshipID
        option.text = `${dato.championshipName} ${dato.championshipSeason}`
        select.add(option);
    }))
    .catch(error => console.log('error', error));


$('#updateSelect').change(function () {
    var requestOptions = {
        method: 'GET', redirect: 'follow'
    };

    let url = `http://localhost/gt3prostats/backend/api/championship/getchampionshipByID.php?championshipID=${$('#updateSelect').val()}`

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            $('#showChampionship').html(` 
    <form class="d-flex flex-wrap justify-content-center w-100 gap-3">

        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Championship Name</span>
            <input id="championshipName" type="text" class="form-control" value="${result.championshipName}"
                   aria-label="name" aria-describedby="name">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="Class">Country</span>
            <input id="championshipCountry" type="text" class="form-control" value="${result.championshipCountry}" aria-label="country"
                   aria-describedby="country">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="number">Season</span>
            <input id="championshipSeason" type="number" class="form-control" value="${result.championshipSeason}" aria-label="season"
                   aria-describedby="season">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Championship Website</span>
            <input id="championshipWebsite" type="text" class="form-control" value="${result.championshipWebsite}"
                   aria-label="website" aria-describedby="website">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Facebook</span>
            <input id="championshipFacebook" type="text" class="form-control" value="${result.championshipFacebook}"
                   aria-label="facebook" aria-describedby="facebook">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Twitter</span>
            <input id="championshipTwitter" type="text" class="form-control" value="${result.championshipTwitter}/"
                   aria-label="twitter" aria-describedby="twitter">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Youtube Channel</span>
            <input id="championshipYoutube" type="text" class="form-control" value="${result.championshipYoutube}/"
                   aria-label="YouTube" aria-describedby="YouTube">
        </div>

    </form>
    <button class="btn bg-success align-items w-50 m-auto mt-5" onclick="updateChampionship(${result.championshipID})">Update championship
    </button>`)


        })
        .catch(error => console.log('error', error));
})

function updateChampionship() {

    let championshipID = $('#updateSelect').val()
    let championshipName = $('#championshipName').val()
    let championshipCountry = $('#championshipCountry').val()
    let championshipSeason = $('#championshipSeason').val()
    let championshipWebsite = $('#championshipWebsite').val()
    let championshipFacebook = $('#championshipFacebook').val()
    let championshipTwitter = $('#championshipTwitter').val()
    let championshipYoutube = $('#championshipYoutube').val()

    const raw = `{ "championshipID" : "${championshipID}",
    "championshipName" : "${championshipName}",
    "championshipCountry" : "${championshipCountry}",
    "championshipSeason" : "${championshipSeason}",
    "championshipWebsite" : "${championshipWebsite}",
    "championshipFacebook" : "${championshipFacebook}",
    "championshipTwitter" : "${championshipTwitter}",
    "championshipYoutube" : "${championshipYoutube}"}`;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
        method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'
    };


    fetch("http://localhost/gt3prostats/backend/api/championship/updatechampionship.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Championship Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .catch(error => {
            console.log('error', error)
            let alert = document.createElement("div")
            alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Championship Not Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

}