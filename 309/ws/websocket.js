var ws;

document.getElementById("username").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        connect();
    }
})

document.getElementById("msg").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        send();
    }
})


function connect() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value
    var wsserver = document.getElementById("wsserver").value;
    if (password === '' || username === '') {
        var log = document.getElementById("log");
        log.innerHTML += "Need username and password both \n";
        return
    }
    var url = wsserver + username + "/" + password;
    //var url = "ws://echo.websocket.org";


    ws = new WebSocket(url);

    ws.onmessage = function(event) { // Called when client receives a message from the server
        console.log(event.data);

        // display on browser
        var log = document.getElementById("log");
        log.innerHTML += "message from server: " + event.data + "\n";
    };

    ws.onopen = function(event) { // called when connection is opened
        var log = document.getElementById("log");
        log.innerHTML += "Connected to " + event.currentTarget.url + "\n";
    };

    ws.onclose = function(event) {
        var log = document.getElementById("log");
        log.innerHTML += "Disconnected from " + event.currentTarget.url + "\n";
    }
}

function send() {  // this is how to send messages
    var msg = document.getElementById("msg");
    ws.send(msg.value);
    msg.value = '';
}
function closeSocket() {
    ws.close();
}