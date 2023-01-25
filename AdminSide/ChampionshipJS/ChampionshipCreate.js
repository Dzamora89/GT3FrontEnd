function createChampionship(){

    let name = $('#name').val()
    let country = $('#country').val()
    let season = $('#season').val()
    let website = $('#website').val()
    let facebook = $('#facebook').val()
    let twitter = $('#twitter').val()
    let youTube = $('#YouTube').val()


    var raw = `{\r\n    \"name\" : \"${name}\",
    \r\n    \"country\" : \"${country}\",
    \r\n    \"season\" : \"${season}\",
    \r\n    \"website\" : \"${website}\",
    \r\n    \"facebook\" : \"${facebook}\",
    \r\n    \"twitter\" : \"${twitter}\",
    \r\n    \"YouTube\" : \"${youTube}\"}`;




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };






    let result = fetch("http://localhost/gt3prostats/api/championship/Createchampionship.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Championship Created
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
                Championship Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

}