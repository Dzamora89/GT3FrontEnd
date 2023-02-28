//Todo: Jquery Events
$(document).ready(championshipSelect())
$(document).ready(teamSelect())



function championshipSelect() {
    let requestOptions = {
        method: 'GET', redirect: 'follow'
    };

    fetch("http://localhost/gt3prostats/backend/api/championship/getallchampionship.php", requestOptions)
        .then(response => response.json())
        .then(data => data.sort((a,b) => {
            if (a.championshipSeason > b.championshipSeason) {
                return 1
            } else {
                return -1
            }
            return 0
        }))
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('championshipEntryChampionshipID')
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


    fetch("http://localhost/gt3prostats/backend/api/team/getallteam.php", requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('championshipEntryTeamID')
            let option = document.createElement("option")
            option.value = dato.teamID
            option.text = `${dato.teamName} , ${dato.teamCarBrand} `
            select.add(option);
        }))
        .catch(error => console.log('error', error));

}

$('#championshipEntryTeamID').on('change' ,() => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `http://localhost/gt3prostats/backend/api/Car/getCarByTeamID.php?carTeamID=${document.getElementById("championshipEntryTeamID").value}`
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            $('#CarSelect').html('<option selected hidden="hidden">Select the Car</option>')
            data.forEach((dato) => {
                let select = document.getElementById('championshipEntryCarID')
                let option = document.createElement("option")
                option.value = dato.carID
                option.text = `#${dato.carNumber} , ${dato.carManufacturer}`
                select.add(option);
            })})
        .catch(error => console.log('error', error));
})

let driverCount = 1;
$('#championshipEntryCarID').on('change', () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost/gt3prostats/backend/api/driver/getalldriver.php", requestOptions)
        .then(response => response.json())
        .then(data => data.sort((a,b) =>{
            if (a.driverLastName > b.driverLastName){
                return 1
            }else {
                return -1
            }
            return 0
    }))
        .then(data => {
            data.forEach( (dato) => {
                    let select = document.getElementById(`DriverSelect-${driverCount}`)
                    let option = document.createElement("option")
                    option.value = dato.driverID
                    option.text = `${dato.driverLastName} , ${dato.driverFirstName}`
                    select.add(option);

                }

            )
            driverCount++
            $(`#DriverSelect-${driverCount}`).after(`<select id="DriverSelect-${driverCount+1}" class="form-select" aria-label="ChampionshipSelect">
                 <option selected>Select the Driver</option>
                    </select>`)

        })

        .catch(error => console.log('error', error));


})



    $(`#drivers`).on('change','.selectDriver', () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        $(`#drivers`).append(`<select id="DriverSelect-${driverCount}" class="form-select selectDriver" aria-label="ChampionshipSelect">
        <option selected>Select the Driver</option>
      </select>`)
        fetch("http://localhost/gt3prostats/backend/api/driver/getalldriver.php", requestOptions)
            .then(response => response.json())
            .then(data => data.sort((a,b) =>{
                if (a.driverLastName > b.driverLastName){
                    return 1
                }else {
                    return -1
                }
                return 0
            }))
            .then(data =>{
                data.forEach( (dato) => {
                    let select = document.getElementById(`DriverSelect-${driverCount}`)
                    let option = document.createElement("option")
                    option.value = dato.driverID
                    option.text = `${dato.driverLastName} , ${dato.driverFirstName}`
                    select.add(option);

                })
                driverCount++
            }   )
            .catch(error => console.log('error', error));
    })

function createChampionshipEntry() {

    let championshipEntryChampionshipID = $('#championshipEntryChampionshipID').val()
    let championshipEntryTotalPoints = 0
    let championshipEntryPosition = 1
    let championshipEntryClass = $('#championshipEntryClass').val()
    let championshipEntryCarID = $('#championshipEntryCarID').val()
    let championshipEntryTeamID = $('#championshipEntryTeamID').val()

    $('.selectDriver').last().remove()

    $('.selectDriver').each((index, element) => {
        let championshipEntryDriverID = $(element).val()
        const raw = `{
        "championshipEntryChampionshipID" : ${championshipEntryChampionshipID},
        "championshipEntryTotalPoints" : ${championshipEntryTotalPoints},
        "championshipEntryPosition" : ${championshipEntryPosition},
        "championshipEntryClass" : ${championshipEntryClass},
        "championshipEntryCarID" : ${championshipEntryCarID},
        "championshipEntryTeamID" : ${championshipEntryTeamID},
        "championshipEntryDriverID" : ${championshipEntryDriverID}        
        }`;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };






        let result = fetch("http://localhost/gt3prostats/backend/api/championshipEntry/CreatechampionshipEntry.php", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
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

    })


/*



 */
}







