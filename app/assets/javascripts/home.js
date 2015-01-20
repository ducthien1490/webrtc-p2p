var roomidInput = document.getElementById('roomidInput');
var createRoom = document.getElementById('createRoom');
var joinRoom = document.getElementById('joinRoom');
var login = document.getElementById('login');
var roomId = document.getElementById('roomId');
var room = document.getElementById('room');
var ownVideo = document.getElementById('ownVideo');
var otherVideo = document.getElementById('otherVideo');

var hasClass  = function(el,className) {
  if(!el || !className){return;}
  return (new RegExp("(^|\\s)" + className + "(\\s|$)").test(el.className));
};
var removeClass = function(el,className) {
  if(!el || !className){return;}
  el.className = el.className.replace(new RegExp('(?:^|\\s)'+className+'(?!\\S)'),'' );
  return el;
};
var addClass = function(el,className) {
  if(!el || !className){return;}
  if(!hasClass(el,className)) { el.className += ' '+className; }
  return el;
};

var WebRTC = new WebRTC();
WebRTC.connectToSocket('ws://localhost:63949');
document.addEventListener('socketEvent', function(socketEvent){
  switch(socketEvent.eventType) {
    case 'roomCreated':
      removeClass(login,'active');
      addClass(room,'active');
      roomId.innerHTML = WebRTC.getRoomId();
      break;
    case 'p2pConnectionReady':
      removeClass(login,'active');
      addClass(room,'active');
      roomId.innerHTML = WebRTC.getRoomId();
      break;
    case 'streamAdded':
      otherVideo.src = URL.createObjectURL(WebRTC.getOtherStream());
      break;
  }
});

createRoom.addEventListener('click',function(e){
  e.preventDefault();
  var success = function(myStream){
    ownVideo.src = URL.createObjectURL(myStream);
    WebRTC.createRoom();
  };
  WebRTC.getMedia({audio: true, video: true},success);
});

joinRoom.addEventListener('click',function(e){
  e.preventDefault();
  if(!roomidInput.value) {
    console.log('Please set a room-ID before joining a room!');
    return;
  }
  var success = function(myStream){
    ownVideo.src = URL.createObjectURL(myStream);
    WebRTC.joinRoom(roomidInput.value);
  };
  WebRTC.getMedia({audio: true, video: true},success);
});

