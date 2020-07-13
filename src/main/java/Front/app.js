
/*var myArray = [
        {'name':'Michael', 'age':'25', 'birthdate':'11/10/1989'},
        {'name':'Mila', 'age':'32', 'birthdate':'10/1/1989'},
        {'name':'Paul', 'age':'29', 'birthdate':'10/14/1990'},
        {'name':'Dennis', 'age':'25', 'birthdate':'11/29/1993'},
        {'name':'Tim', 'age':'27', 'birthdate':'3/12/1991'},
        {'name':'Erik', 'age':'24', 'birthdate':'10/31/1995'},
    ]*/



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
                            <td>${data[i].name}</td>
                            <td>${data[i].age}</td>
                            <td>${data[i].birthdate}</td>
                      </tr>`
        table.innerHTML += row


    }
}