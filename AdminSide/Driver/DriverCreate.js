
function createDriver() {

    let firstName = $('#firstNameInput').val()
    let lastName = $('#lastNameInput').val()
    let country = $('#countryInput').val()
    let url = $('#urlInput').val()
    let twitter = $('#twitterInput').val()
    let status = $('#driverStatusInput').val()
    let initialElo = $('#initialEloInput').val()
    let birthday = $('#birthDayInput').val()


// TODO NOmbres de los ID y las Variables
    var raw = `{\r\n    \"driverFirstName\" : \"${firstName}\",
    \r\n    \"driverLastName\" : \"${lastName}\",
    \r\n    \"driverCountry\" : \"${country}\",
    \r\n    \"driverDateOfBirth\" : \"${birthday}\",
    \r\n    \"driverWebsite\" : \"${url}\",
    \r\n    \"driverTwitter\" : \"${twitter}\",
    \r\n    \"driverLicenseLevel\" : \" \",
    \r\n    \"driverStatus\" : \"${status}\",
    \r\n    \"driverELO\" : \"${initialElo}\"\r\n}`;




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };






    let result = fetch("http://localhost/gt3prostats/backend/api/driver/CreateDriver.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Driver Created
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
                Driver Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

}
