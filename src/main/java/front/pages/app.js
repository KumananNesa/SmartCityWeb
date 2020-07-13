
var httpRequest = new XMLHttpRequest();


httpRequest.onreadystatechange = function () {

    if (httpRequest.readyState === 4) {



        if (httpRequest.status === 200) {

            var myArray = JSON.parse(httpRequest.responseText)
            buildTable(myArray)

        }

    }
}

httpRequest.open('get', 'data/rankings.json', true);
httpRequest.send()



function buildTable(data) {
    var table = document.getElementById('myTable')

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].sensortype}</td>
                            <td>${data[i].numberofvehicle}</td>
                            <td>${data[i].adresse}</td>
                      </tr>`
        table.innerHTML += row


    }
}