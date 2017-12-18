function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_rJS6F0tzl/';
    const base64Auth = btoa('guest:pass');
    const authorization = { Authorization: `Basic ${base64Auth}` };
    let addedCountries = '';

    $('#loadCountries').click(loadCountries);

    function loadCountries() {
        $.get({
                url: url + 'countries',
                headers: authorization
            })
            .then(showCountries)
            .catch(showError)
    }

    function showCountries(countries) {
        $('#loadCountries').hide();
        $('#viewAddCountry').hide();
        $('#viewEditCountry').hide();
        $('#viewCountries').show();
        $('#countries').empty();
        $('#addBtn').click(showAddCountry);

        $('#countries').append(`<table>
            <tr>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </table>`);
        for (let country of countries) {
            let countryTable =
                $('<tr>')
                .append($('<td>')
                    .append($('<a href="#">').text(country.name)).click(() => getTowns(country.name)))
                .append($('<td>')
                    .append($('<a href="#">').text('[Edit]').click(() => showEditCountry(country)))
                    .append($('<a href="#">').text('[Delete]').click(() => deleteCountry(country._id))));

            $('#countries table').append(countryTable)
        }
    }

    function showAddCountry() {
        $('#viewAddCountry').show();
        $('#viewCountries').hide();
        $('#btnAddNewCountry').click(addCountry)
    }

    function addCountry() {
        let country = $('#addCountryText').val();
        if (country != '') {
            $.post({
                    url: url + 'countries',
                    headers: authorization,
                    data: {
                        name: country
                    }
                })
                .then(loadCountries)
                .catch(showError)
        }
        $('#addCountryText').val('');
    }

    function showEditCountry(country) {
        $('#viewCountries').hide();
        $('#viewEditCountry').show();
        $('#editCountryText').val(country.name);
        $('#btnEditCountry').click(() => editCountry(country._id));
    }

    function editCountry(country) {
        let editedCountry = $('#editCountryText').val();
        if (editedCountry != '') {
            $.ajax({
                    method: "PUT",
                    url: url + 'countries/' + country,
                    headers: authorization,
                    data: {
                        name: editedCountry
                    }
                })
                .then(loadCountries)
                .catch(showError)
        }
    }

    function deleteCountry(country) {
        $.ajax({
                method: "DELETE",
                url: url + 'countries/' + country,
                headers: authorization
            })
            .then(loadCountries)
            .catch(showError)
    }

    function getTowns(country) {
        addedCountries = country;
        $.get({
                url: url + 'towns',
                headers: authorization
            })
            .then(showTowns)
            .catch(showError)
    }

    function showTowns(towns) {
        $('#viewTowns').show();
        $('#viewCountries').hide();
        $('#addBtnTown').click(showAddTowns);
        $('#towns').empty();

        $('#towns').append(`<table>
            <tr>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </table>`);

        for (let town of towns) {
            if (addedCountries == town.country) {
                let townTable =
                    $('<tr>')
                    .append($('<td>')
                        .append($('<a>').text(town.name)))
                    .append($('<td>')
                        .append($('<a href="#">').text('[Edit]').click(() => showEditCountry(town)))
                        .append($('<a href="#">').text('[Delete]').click(() => deleteCountry(town._id))));

                $('#towns table').append(townTable)
            }
        }
    }

    function showAddTowns() {
        $('#viewAddTown').show();
        $('#viewTowns').hide();
        $('#btnAddNewTown').click(addTown)
    }

    function addTown() {
        let town = $('#townText').val();
        let country = $('#countryText').val();
        if (town != '') {
            $.post({
                    url: url + 'towns',
                    headers: authorization,
                    data: {
                        name: town,
                        country: country

                    }
                })
                .then(getTowns)
                .catch(showError)
        }
        $('#addCountryText').val('');
    }

    function showError(error) {
        $('#loadCountries').hide();
        let errorMsg = JSON.stringify(error);
        if (error.readyState === 0) {
            errorMsg = "Cannot connect due to network error.";
        }
        if (error.responseJSON && error.responseJSON.description) {
            errorMsg = error.responseJSON.description;
        }
        $('#errorBox').text("Error: " + errorMsg);
    }
}