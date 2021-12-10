window.addEventListener("load", function () {
    let createNewGame = {method: "POST", url: "/newgame"}
    let sendAnswer = {method: "POST", url: "/game"}
    let getAnswers = {method: "GET", url: "/game"}

    function request(options, data) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            console.log(xhr.readyState)
            if (xhr.readyState === 4 && xhr.status === 405) {
                console.log("Hi Guys");
            }
        }
        xhr.send(data);
    }

    let newGameButton = document.querySelector("#new-game");
    newGameButton.addEventListener("click", function () {
        request(createNewGame);
    });

    let sendAnswerButton = document.querySelector("#answer-button");
    sendAnswerButton.addEventListener("click", function() {
        let numberValue = document.querySelector("#answer-field");
        request(sendAnswer, JSON.stringify({ answer: numberValue.value }));
    })
});
