/**
 * Created by Macbook on 7/21/16.
 */
// var url = "http://localhost:3000";
var url = "https://tranquil-temple-54428.herokuapp.com";
var userName = "";
document.addEventListener("DOMContentLoaded", function (e) {
    var nameInput = document.getElementById("nameInput");
    nameInput.addEventListener("change", function (e) {
        userName = nameInput.value;
        console.log("welcome", userName);
    });

    // //capture form
    // $("#webcamPageForm").on("submit", (function (e) {
    //     e.preventDefault();
    //     var dataUrl = canvas.toDataURL("image/png");
    //     var ajax = new XMLHttpRequest();
    //     ajax.open("POST",'/capture',false);
    //     ajax.onreadystatechange = function() {
    //         console.log(ajax.responseText);
    //     };
    //     ajax.setRequestHeader('Content-Type', 'application/upload');
    //     ajax.send("imgData="+dataUrl);
    // }));

    //upload form
    $("#imageUploadForm").on("submit", (function (event) {
        event.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function (data) {
            console.log("image saved: ", data);
            var img = document.getElementById("img");
            img.setAttribute("src", data.imageSrc);
            img.height = "300";

            // returns highest emotion
            var obj = data.emotion;
            var status = Object.keys(obj).reduce(function (a, b) {
                return obj[a] > obj[b] ? a : b;
            });
            var percent = data.emotion[status] * 100;
            console.log(status);
            console.info(percent);

            // DOM control
            var textDiv = document.createElement("div");
            textDiv.innerHTML = "<p>You are feeling...</p></br><p>" + Math.round(percent) + "% " +status + "</p>"
            imageDiv.appendChild(textDiv);
        });
    }));

    //retrieve button
    var retrieveBtn = document.getElementById("retrieve");
    retrieveBtn.addEventListener("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: url + "/history",
            method: "GET"
        }).done(function (response) {
            console.log("response: ", response);

            // var ExpectedValue = [];
            for (i = 0; i < response.length; i++) {
                // returns highest emotion
                var obj = response[i].emotion;
                // var percent = "";
                var status = Object.keys(obj).reduce(function (a, b) {
                    return obj[a] > obj[b] ? a : b;
                });
                var percent = response[i].emotion[status] * 100;
                console.log(status);
                console.info(percent);

                var containerDiv = document.createElement("div");
                var avatarImg = document.createElement("img");
                var textDiv = document.createElement("div");
                var deleteBtn = document.createElement("button");
                var updateBtn = document.createElement("button");

                containerDiv.setAttribute("id", response[i]._id);
                avatarImg.setAttribute("src", response[i].imageSrc);
                avatarImg.setAttribute("class", "avatar");
                textDiv.innerHTML = userName + ", You felt " + Math.round(percent) + "% " + status + " on " + response[i].cDate;
                deleteBtn.setAttribute("onclick", "removeDiv(" + response[i]._id + ")");
                deleteBtn.innerHTML = "DELETE";
                updateBtn.innerHTML = "UPDATE";

                containerDiv.appendChild(avatarImg);
                containerDiv.appendChild(textDiv);
                containerDiv.appendChild(deleteBtn);
                containerDiv.appendChild(updateBtn);
                historyDiv.appendChild(containerDiv);
            }
            // var EVDiv = document.createElement("div");

        })
    });
});
