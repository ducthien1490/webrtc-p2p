var roomidInput = document.getElementById("roomidInput");
var createRoom = document.getElementById("createRoom");
var joinRoom = document.getElementById("joinRoom");
var login = document.getElementById("login");
var roomId = document.getElementById("roomId");
var room = document.getElementById("room");
var ownVideo = document.getElementById("ownVideo");
var otherVideo = document.getElementById("otherVideo");
var WebRTC = new WebRTC();
WebRTC.connectToSocket("ws://localhost:63949");
document.addEventListener("socketEvent", function(socketEvent){
  switch(socketEvent.eventType) {
    case "roomCreated":
      $(login).removeClass("active");
      $(room).addClass("active");
      roomId.innerHTML = WebRTC.getRoomId();
      break;
    case "p2pConnectionReady":
      $(login).removeClass("active");
      $(room).addClass("active");
      roomId.innerHTML = WebRTC.getRoomId();
      break;
    case "streamAdded":
      otherVideo.src = URL.createObjectURL(WebRTC.getOtherStream());
      break;
  }
});

$(createRoom).on("click",function(event){
  event.preventDefault();
  var success = function(myStream){
    ownVideo.src = URL.createObjectURL(myStream);
    WebRTC.createRoom();
  };
  WebRTC.getMedia({audio: true, video: true},success);
});

$(joinRoom).on("click",function(event){
  event.preventDefault();
  if(!roomidInput.value) {
    console.log("Please set a room-ID before joining a room!");
    return;
  }
  var success = function(myStream){
    ownVideo.src = URL.createObjectURL(myStream);
    WebRTC.joinRoom(roomidInput.value);
  };
  WebRTC.getMedia({audio: true, video: true},success);
});
