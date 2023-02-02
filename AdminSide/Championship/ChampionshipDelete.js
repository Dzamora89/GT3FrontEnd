//Todo: Jquery Events

var requestOptions = {
    method: 'GET', redirect: 'follow'
};
//Todo: Cambiar los Select al evento de Jquery para Change on Select

fetch("http://localhost/gt3prostats/api/championship/getallchampionship.php", requestOptions)
    .then(response => response.json())
    .then(data => data.forEach((dato) => {
        let select = document.getElementById('updateSelect')
        let option = document.createElement("option")
        option.value = dato.championshipID
        option.text = `${dato.name} ${dato.season}`
        select.add(option);
    }))
    .catch(error => console.log('error', error));

$('#updateSelect').change(function () {
    var requestOptions = {
        method: 'GET', redirect: 'follow'
    };

    let url = `http://localhost/gt3prostats/api/championship/getchampionshipByID.php?championshipID=${document.getElementById("updateSelect").value}`

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            $('#showChampionship').html(` 
    <form class="d-flex flex-wrap justify-content-center w-100 gap-3">

        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Championship Name</span>
            <input id="name" type="text" class="form-control" value="${result.name}"
                   aria-label="name" aria-describedby="name">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="Class">Country</span>
            <input id="country" type="text" class="form-control" value="${result.country}" aria-label="country"
                   aria-describedby="country">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="number">Season</span>
            <input id="season" type="number" class="form-control" value="${result.season}" aria-label="season"
                   aria-describedby="season">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Championship Website</span>
            <input id="website" type="text" class="form-control" value="${result.website}"
                   aria-label="website" aria-describedby="website">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Facebook</span>
            <input id="facebook" type="text" class="form-control" value="${result.facebook}"
                   aria-label="facebook" aria-describedby="facebook">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Twitter</span>
            <input id="twitter" type="text" class="form-control" value="${result.twitter}/"
                   aria-label="twitter" aria-describedby="twitter">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Youtube Channel</span>
            <input id="YouTube" type="text" class="form-control" value="${result.youtube}/"
                   aria-label="YouTube" aria-describedby="YouTube">
        </div>

    </form>
    <button class="btn bg-success align-items w-50 m-auto mt-5" onclick="deleteChampionship(${result.championshipID})"">delete championship
    </button>`)

            $(':input').prop("disabled", true)
            $(':input').eq($(':input').length-1).prop("disabled",false)


        })
        .catch(error => console.log('error', error));
})

function deleteChampionship(championshipID) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

        var raw = `{\r\n    \"championshipID\" : \"${championshipID}\"
    \r\n}`;

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost/gt3prostats/api/championship/Deletechampionship.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Championship Deleted
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
                Championship NOT DELETED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

}