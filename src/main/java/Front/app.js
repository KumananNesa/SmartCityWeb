


const rankingsBody = document.querySelector("#rankings-table > tbody")



function loadRankings() {

    const request = new XMLHttpRequest();

    request.open('get', 'data/rankings.json', true);
    request.send();



    request.onload = () => {

        try {
            var json = JSON.parse(request.responseText);
            populateRankings(json);
        } catch (e) {

           /// console.log("Could not load rankings ! : (")

        }



    };



}

function populateRankings(json) {
    //clear existing table data
    while (rankingsBody.firstChild) {

        rankingsBody.removeChild(rankingsBody.firstChild)

    }

    // populate teble
    json.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cell)=> {
            
            console.log(cell);
            const td = document.createElement('td');

            td.textContent = cell;
            tr.appendChild(td);
            });

        rankingsBody.appendChild(tr);

    });

}

document.addEventListener("DOMContentLoaded", () => {
    loadRankings();

})