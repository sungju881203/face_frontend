/**
 * Created by Macbook on 7/21/16.
 */
document.addEventListener("DOMContentLoaded", function () {
    $("#imageUploadForm").on("submit", (function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("image saved: ", data);
            },
            error: function (data) {
                console.error("error: ", data);
            }
        });
    }));

    var bucket = document.getElementById("bucket");
    bucket.addEventListener("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "http://localhost:3000/image",
            method: "GET"
        }).done(function (data) {
            console.log("data: ", data);
        })
    });
});

