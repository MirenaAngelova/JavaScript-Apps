function attachEvents() {
    $('#submit').click(send);
    $('#refresh').click(refresh);

    const baseUrl = `https://messenger-57dea.firebaseio.com/messenger.json`;

    function send() {
        let message = {
            author: $('#author').val(),
            content: $('#content').val(),
            timestamp: Date.now()
        };

        $.post(baseUrl, JSON.stringify(message))
            .then(refresh);

        $('#author').val('');
        $("#content").val('');
    }

    function refresh() {
        $('#messages').empty();

        $.get(baseUrl)
            .then(getMsg);
    }

    function getMsg(data) {
        let keys = Object.keys(data);
        keys.sort((a, b) => data[a].timestamp - data[b].timestamp);

        for (let key of keys) {
            let keyInfo = data[key];
            let text = `${keyInfo.author}: ${keyInfo.content}\n`;

            $('#messages').append(text);
        }
    }
}


// $.get('https://messenger-57dea.firebaseio.com/messenger.json')
//     .then((result) => {
//         console.log(result);
//     });