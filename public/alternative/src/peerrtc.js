// Compatibility shim
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// PeerJS object
var peer = new Peer({ key: 'rjts7l1c07rs5rk9', debug: 3});

peer.on('open', function(){
  $('#my-id').text(peer.id);
  readyPeer(peer.id);
});

// Receiving a call
peer.on('call', function(call){
  // Answer the call automatically (instead of prompting user) for demo purposes
  call.answer(window.localStream);
  step3(call);
});
peer.on('error', function(err){
  alert(err.message);
  // Return to step 2 if error occurs
  step2();
});

// Click handlers setup
$(function(){
  $('#make-call').click(function(){
    // Initiate a call!
    var call = peer.call($('#callto-id').val(), window.localStream);

    step3(call);
  });

  $('#end-call').click(function(){
    window.existingCall.close();
    step2();
  });

  // Retry if getUserMedia fails
  $('#step1-retry').click(function(){
    $('#step1-error').hide();
    step1();
  });

  // Get things started
  step1();
});

function step1 () {
  // Get audio/video stream
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    // Set your video displays
    $('#my-video').prop('src', URL.createObjectURL(stream));

    window.localStream = stream;
    step2();
  }, function(){ $('#step1-error').show(); });
}

function step2 () {
  $('#step1, #step3').hide();
  $('#step2').show();
}

function step3 (call) {
  // Hang up on an existing call if present
  if (window.existingCall) {
    window.existingCall.close();
  }

  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    $('#their-video').prop('src', URL.createObjectURL(stream));
  });

  // UI stuff
  window.existingCall = call;
  $('#their-id').text(call.peer);
  call.on('close', step2);
  $('#step1, #step2').hide();
  $('#step3').show();
}

function call (id){
  var call = peer.call(id, window.localStream);
  step3(call);
}

function readyPeer(uuid){


  findBusStop(function(response){
      if(response.uuid && response.uuid.length < 25){
          console.log('trying to start a connection');
          console.log(response, response.uuid);
          call(response.uuid);
          console.log(response.uuid);
          /*console.log(response.data);
          // Start connection
          peerConnection = new RTCPeerConnection(peerConnectionConfig);
          peerConnection.onaddstream = gotRemoteStream;
          peerConnection.addStream(localStream);
          peerConnection.setRemoteDescription(new RTCSessionDescription(response.sdp)).then(function(){
              if(signal.sdp.type == 'offer') {
                  peerConnection.createAnswer().then(createdDescription).catch(errorHandler);
              }
          }).catch(errorHandler);

          for(var i = 0; i<response.data.length; i++){
              peerConnection.addIceCandidate(new RTCIceCandidate(response.data[i])).catch(errorHandler);
          }*/
      }else{
          console.log('waiting for a connection.....');
          /*peerConnection = new RTCPeerConnection(peerConnectionConfig);
          peerConnection.onicecandidate = gotIceCandidate;
          peerConnection.onaddstream = gotRemoteStream;
          peerConnection.addStream(localStream);
          peerConnection.createOffer().then(createdDescription).catch(errorHandler);*/

          getUserLocation(function(loc){
            nodeLocation = loc;
            registerForVideo(uuid, loc, {'test':true}, {'test':true});

          });

          //setTimeout(function(){registerForVideo(uuid, nodeLocation, sdp, iceCandidates);}, 500);
      }
  });
}

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
            peerConnection.setRemoteDescription(new RTCSessionDescription(response.sdp)).then(function(){
                if(signal.sdp.type == 'offer') {
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

            setTimeout(function(){registerForVideo(uuid, nodeLocation, sdp, iceCandidates);}, 500);
        }
    });
}
