window.addEventListener("load", function () {
    let createNewGame = {method: "POST", url: "/newgame"}
    let sendAnswer = {method: "POST", url: "https://lms.ithillel.ua/game"}
    let getAnswers = {method: "GET", url: "https://lms.ithillel.ua/newgame"}

    function request(options) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            console.log(xhr.readyState)
            if (xhr.readyState === 4 && xhr.status === 405) {
                console.log("Hi Guys");
            }
        }
        xhr.send();
    }

    console.log("Hello");
    let newGameButton = document.querySelector("#new-game");
    newGameButton.addEventListener("click", function () {
        request(createNewGame);
    });
});
