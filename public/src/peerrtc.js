// Compatibility shim
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// PeerJS object
var peer = new Peer({ key: 'rjts7l1c07rs5rk9', debug: 3});

peer.on('open', function(){
  readyPeer(peer.id);
});

// Receiving a call
peer.on('call', function(call){
  // Answer the call automatically (instead of prompting user) for demo purposes
  console.log(call);
  call.answer(window.localStream);
  openCall(call);
});
peer.on('error', function(err){
  //alert(err.message); // Errors are disruptive and not productive on busstop
});

// Click handlers setup
$(function(){

  navigator.getUserMedia({audio: false, video: { width: 1080, height: 1920 }}, function(stream){
    // Set your video displays
    $('#my-video').prop('src', URL.createObjectURL(stream));
    window.localStream = stream;
  }, function(){ console.log('Error on get user media'); });

});

function openCall(call){
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

}

function call (id, place) {
  var call = peer.call(id, window.localStream, {'metadata': place});
  openCall(call);
}

function readyPeer(uuid){


  findBusStop(function(response){
      if(response.uuid && response.uuid.length < 25){
		  getUserLocation(function(loc){
			console.log('trying to start a connection');
			console.log(response, response.uuid);
			call(response.uuid, loc);
			console.log(response.uuid);
			setRemotePeerLocation(response.location);
          });
      }else{
          console.log('waiting for a connection.....');

          getUserLocation(function(loc){
            nodeLocation = loc;
            registerForVideo(uuid, loc, {'test':true}, {'test':true});
          });
      }
  });
}
