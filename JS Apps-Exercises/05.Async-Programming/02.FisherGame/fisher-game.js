$(document).ready(function() {
    const authHead = { "Authorization": "Basic " + btoa("guest:guest") };

    $(".load").click(loadCatches);
    $(".add").click(addCatch);
    $(document).on('click', '.delete', deleteCatch);
    $(document).on('click', '.update', updateCatches);



    function loadCatches() {
        let getRequest = {
            method: "GET",
            url: "https://baas.kinvey.com/appdata/kid_SyAGWmHox/biggestCatches",
            headers: authHead
        };

        $.ajax(getRequest)
            .then(showCatches)
            .fail(showError);

        function showCatches(data) {
            $("#catches").empty();
            for (let obj of data) {
                let html = `<div class="catch" data-id="${obj._id}">` +
                    `<label>Angler</label>` +
                    `<input type="text" class="angler" value="${obj.angler}"/>` +
                    `<label>Weight</label>` +
                    `<input type="number" class="weight" value="${obj.weight}"/>` +
                    `<label>Species</label>` +
                    `<input type="text" class="species" value="${obj.species}"/>` +
                    `<label>Location</label>` +
                    `<input type="text" class="location" value="${obj.location}"/>` +
                    `<label>Bait</label>` +
                    `<input type="text" class="bait" value="${obj.bait}"/>` +
                    `<label>Capture Time</label>` +
                    `<input type="number" class="captureTime" value="${obj.captureTime}"/>` +
                    `<button class="update">Update</button>` +
                    `<button class="delete">Delete</button>` +
                    `</div>`;
                $("#catches").append(html);
            }
        }
    }

    function showError(err) {
        console.dir(err.status);
    }

    function addCatch() {
        let angler = document.getElementById("angler").value;
        let weight = document.getElementById("weight").value;
        let species = document.getElementById("species").value;
        let location = document.getElementById("location").value;
        let bait = document.getElementById("bait").value;
        let captureTime = document.getElementById("captureTime").value;

        let data = {
            "angler": angler,
            "weight": weight,
            "species": species,
            "location": location,
            "bait": bait,
            "captureTime": captureTime
        };

        let postRequest = {
            method: "POST",
            url: "https://baas.kinvey.com/appdata/kid_SyAGWmHox/biggestCatches",
            headers: authHead,
            data: data,
        };
        $.ajax(postRequest)
            .then(loadCatches)
            .fail(showError);
    }

    function deleteCatch() {
        let id = $(this).closest('.catch').attr('data-id');
        let deleteRequest = {
            method: "DELETE",
            url: "https://baas.kinvey.com/appdata/kid_SyAGWmHox/biggestCatches/" + id,
            headers: authHead
        };
        $.ajax(deleteRequest)
            .then(loadCatches)
            .fail(showError);
    }

    function updateCatches() {
        let id = $(this).closest('.catch').attr('data-id');
        let angler = $(this).parent('div').find('input[class="angler"]').val();
        let weight = $(this).parent('div').find('input[class="weight"]').val();
        let species = $(this).parent('div').find('input[class="species"]').val();
        let location = $(this).parent('div').find('input[class="location"]').val();
        let bait = $(this).parent('div').find('input[class="bait"]').val();
        let captureTime = $(this).parent('div').find('input[class="captureTime"]').val();
        let data = {
            "angler": angler,
            "weight": weight,
            "species": species,
            "location": location,
            "bait": bait,
            "captureTime": captureTime
        };

        let updateRequest = {
            method: "PUT",
            url: "https://baas.kinvey.com/appdata/kid_SyAGWmHox/biggestCatches/" + id,
            headers: authHead,
            data: data
        };
        $.ajax(updateRequest)
            .then(loadCatches)
            .fail(showError);
    }
});