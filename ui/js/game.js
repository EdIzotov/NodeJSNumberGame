window.addEventListener("load", function () {
    let createNewGame = {method: "POST", url: "/newgame"}
    let sendAnswer = {method: "POST", url: "/game"}
    let getAnswers = {method: "GET", url: "/game"}

    function request(options, data) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText)
                let textArea = document.querySelector("#answers");
                let resultArea = document.querySelector("#result");
                textArea.value = result.data.answers;
                resultArea.value = result.data.result;
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
        numberValue.value = ''
    })
});
