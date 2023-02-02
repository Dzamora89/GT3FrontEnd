//Todo: Jquery
function createDriver() {

    let firstName = document.getElementById('firstNameInput').value
    let lastName = document.getElementById('lastNameInput').value
    let country = document.getElementById('countryInput').value
    let url = document.getElementById('urlInput').value
    let twitter = document.getElementById('twitterInput').value
    let status = document.getElementById('driverStatusInput').value
    let initialElo = document.getElementById('initialEloInput').value
    let birthday = document.getElementById('birthDayInput').value



    var raw = `{\r\n    \"firstName\" : \"${firstName}\",
    \r\n    \"lastName\" : \"${lastName}\",
    \r\n    \"country\" : \"${country}\",
    \r\n    \"dateOfBirth\" : \"${birthday}\",
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






    let result = fetch("http://localhost/gt3prostats/api/driver/CreateDriver.php", requestOptions)
        .then(response => response.text())
        .then(result => {
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
