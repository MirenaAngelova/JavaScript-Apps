$(document).ready(function() {
    const authHead = { "Authorization": "Basic " + btoa("guest:guest") };
    const url = "https://baas.kinvey.com/appdata/kid_ryhaw5qsx/books";
    $(".load").click(loadBooks);
    $(".add").click(addBook);
    $(document).on('click', '.delete', deleteBook);
    $(document).on('click', '.update', updateBook);
    $(document).on("click", ".del", deleteTag);
    $(document).on("click", ".edit", editTag);
    $(document).on("click", ".addTag", addTag);

    function loadBooks() {
        let loadRequest = {
            method: "GET",
            url: url,
            headers: authHead
        };
        $.ajax(loadRequest)
            .then(listBooks)
            .fail(showError);
    }

    function addBook() {
        let data = {};
        let title = $("#title").val();
        let author = $("#author").val();
        let isbn = $("#isbn").val();
        let tags = $("#tags").val();
        tags = tags.split(",");
        if (tags == "") {
            data = { "title": title, "author": author, "isbn": isbn };
        } else {
            data = { "title": title, "author": author, "isbn": isbn, "tags": tags }
        }
        let postRequest = {
            method: "POST",
            url: url,
            headers: authHead,
            data: data
        };
        $.ajax(postRequest)
            .then(loadBooks)
            .fail(showError);
    }

    function listBooks(data) {
        $("#books").empty();
        let html = "";
        for (let obj of data) {
            let tags = obj.tags;
            if (tags) {
                html = `<div class="book" data-id="${obj._id}">` +
                    `<label>Title</label>` +
                    `<input type="text" class="title" value="${obj.title}"/>` +
                    `<label>Author</label>` +
                    `<input type="text" class="author" value="${obj.author}"/>` +
                    `<label>ISBN</label>` +
                    `<input type="text" class="isbn" value="${obj.isbn}"/>` +
                    `<button class="update">Update</button>` +
                    `<button class="delete">Delete</button>` +
                    `<label>Tags</label>` +
                    `<ul class="list">`;
                for (let tag of tags) {
                    html += `<li class="tag">${tag}<button class="del">Del</button><button class="edit">Edit</button></li>`;
                }
                html += `</ul>` +
                    `<label>Add new tag:</label>` +
                    `<input type="text" class="newTag"/>` +
                    `<button class="addTag">Add</button>` +
                    `</div>`;
            } else {
                html = `<div class="book" data-id="${obj._id}">` +
                    `<label>Title</label>` +
                    `<input type="text" class="title" value="${obj.title}"/>` +
                    `<label>Author</label>` +
                    `<input type="text" class="author" value="${obj.author}"/>` +
                    `<label>ISBN</label>` +
                    `<input type="text" class="isbn" value="${obj.isbn}"/>` +
                    `<button class="update">Update</button>` +
                    `<button class="delete">Delete</button>` +
                    `<label>Add new tags(separate with ","):</label>` +
                    `<input type="text" class="newTag"/>` +
                    `<button class="addTag">Add</button>` +
                    `</div>`;
            }
            $("#books").append(html);
        }

    }

    function showError(err) {
        console.dir(err.status);
    }

    function updateBook() {
        let id = $(this).closest('.book').attr('data-id');
        let title = $(this).parent('div').find('input[class="title"]').val();
        let author = $(this).parent('div').find('input[class="author"]').val();
        let isbn = $(this).parent('div').find('input[class="isbn"]').val();
        let data = { "title": title, "author": author, "isbn": isbn };

        let updateRequest = {
            method: "PUT",
            url: url + "/" + id,
            headers: authHead,
            data: data
        };
        $.ajax(updateRequest)
            .then(loadBooks)
            .fail(showError);
    }

    function deleteBook() {
        let id = $(this).closest('.book').attr('data-id');
        let deleteRequest = {
            method: "DELETE",
            url: url + "/" + id,
            headers: authHead
        };
        $.ajax(deleteRequest)
            .then(loadBooks)
            .fail(showError);
    }
    // function deleteTag() {
    //
    // }
    // function editTag() {
    //
    // }
    // function addTag() {
    //     let tagsin=[];
    //     let items = document.getElementsByClassName("tag").value;
    //     $(this).closest(".list").each(function() { tagsin.push($(this).text()) });
    //     console.dir(items);
    //
    // //     let id = $(this).closest('.book').attr('data-id');
    // //     let title=$(this).parent('div').find('input[class="title"]').val();
    // //     let author=$(this).parent('div').find('input[class="author"]').val();
    // //     let isbn = $(this).parent('div').find('input[class="isbn"]').val();
    // //     let tags=$(this).parent("div").find('input[class="newTag"]').val();
    // //     tags=tags.split(",");
    // //     let data={"title": title, "author": author, "isbn": isbn,"tags":tags};
    // //
    // //     let putRequest={
    // //         method:"PUT",
    // //         url:url+"/"+id,
    // //         headers:authHead,
    // //         data:data
    // //     };
    // //     $.ajax(putRequest)
    // //         .then(loadBooks)
    // //         .fail(showError);
    //  }
});