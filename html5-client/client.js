const connection = new WebSocket("ws://localhost:1234");
const box = document.getElementById("box");
const msg = document.getElementById("msg");

connection.addEventListener("open", () => {
  console.log("connected");
});

function send(data) {
  if (connection.readyState === WebSocket.OPEN) {
    connection.send(data);
  } else {
    throw "Not Connected";
  }
}

connection.addEventListener("message", e => {
  let p = document.createElement("p");
  p.textContent = e.data;
  box.appendChild(p);
});

msg.addEventListener("keydown", e => {
  let kc = e.which || e.keyCode;

  if (kc === 13) {
    send(msg.value);
    msg.value = "";
  }
});
