var localVideo;
var remoteVideo;
var peerConnection;
var uuid;
var localStream;

var iceCandidates = []
var sdp;
var nodeLocation;

var peerConnectionConfig = {
    'iceServers': [
        {'urls': 'stun:stun.services.mozilla.com'},
        {'urls': 'stun:stun.l.google.com:19302'},
    ]
};

function pageReady() {
    uuid = uuid();

    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');

    var constraints = {
        video: true,
        audio: false
    };

    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(getUserMediaSuccess).catch(errorHandler);
    } else {
        alert('Your browser does not support getUserMedia API');
    }
}

function startConnection(){
    findBusStop(function(response){
        console.log(response);
        if(response.uuid && response.sdp && response.data){
            console.log('trying to start a connection');
            console.log(response.sdp);
            console.log(response.data);
            // Start connection
            peerConnection = new RTCPeerConnection(peerConnectionConfig);
            peerConnection.onaddstream = gotRemoteStream;
            peerConnection.addStream(localStream);
            peerConnection.setRemoteDescription(new RTCSessionDescription(response.sdp.sdp)).then(function(){
                if(response.sdp.type == 'offer') {
                    peerConnection.createAnswer().then(createdDescription).catch(errorHandler);
                }
            }).catch(errorHandler);
            
            for(var i = 0; i<response.data.length; i++){
                peerConnection.addIceCandidate(new RTCIceCandidate(response.data[i])).catch(errorHandler);
            }
        }else{
            console.log('waiting for a connection.....');
            peerConnection = new RTCPeerConnection(peerConnectionConfig);
            peerConnection.onicecandidate = gotIceCandidate;
            peerConnection.onaddstream = gotRemoteStream;
            peerConnection.addStream(localStream);
            peerConnection.createOffer().then(createdDescription).catch(errorHandler);
            
            getUserLocation(function(loc){nodeLocation = loc;});
            
            setTimeout(function(){registerForVideo(uuid, nodeLocation, sdp, iceCandidates);}, 2000);
        }
    });
}

function getUserMediaSuccess(stream) {
    localStream = stream;
    localVideo.src = window.URL.createObjectURL(stream);
    startConnection();
}

function gotIceCandidate(event) {
    if(event.candidate != null) {
        iceCandidates.push(event.candidate);
    }
}

function gotRemoteStream(event) {
    console.log('got remote stream');
    remoteVideo.src = window.URL.createObjectURL(event.stream);
}

function createdDescription(description) {
    console.log('got description');

    peerConnection.setLocalDescription(description).then(function() {
        sdp = peerConnection.localDescription;
    }).catch(errorHandler);
}

function errorHandler(error) {
    console.log(error);
}

// Taken from http://stackoverflow.com/a/105074/515584
// Strictly speaking, it's not a real UUID, but it gets the job done here
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
