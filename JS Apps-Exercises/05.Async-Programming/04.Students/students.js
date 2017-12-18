$(document).ready(function() {

    let authHead = { "Authorization": "Basic " + btoa("guest:guest") };

    let getRequest = {
        method: "GET",
        url: "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students",
        headers: authHead
    };
    $.ajax(getRequest)
        .then(printStudents)
        .fail(showError);


    function printStudents(data) {
        let html = "";
        let data1 = data.sort((a, b) => a.ID - b.ID);
        for (let obj of data1) {
            html += `<tr><td>${obj.ID}</td><td>${obj.FirstName}</td><td>${obj.LastName}</td><td>${obj.FacultyNumber}</td><td>${obj.Grade}</td></tr>`;
        }
        $("#results").append(html);
    }

    function showError(err) {
        console.dir(err.status);
    }
});