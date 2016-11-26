
function sendDataToMatchmaking(page, data, doneFunc, errorFunc){
    $.post('/busstop/' + page, data).done(function(response){
        if(doneFunc)
            doneFunc(response);
    }).fail(function(response){
        if(errorFunc)
            errorFunc({'error':true});
    });
}

function getDataFromMatchmaking(page, data, doneFunc, errorFunc){
    $.get('/busstop/' + page, data).done(function(response){
        if(doneFunc)
            doneFunc(response);
    }).fail(function(response){
        if(errorFunc)
            errorFunc({'error':true});
    });
}

function registerForVideo(uuid, loc, sdp, ice, callback){
    sendDataToMatchmaking('/add', {'uuid':uuid, 'location':(loc||'Location not found'), 'sdp':JSON.stringify(sdp), 'data':JSON.stringify(ice)}, undefined, callback);
}

function findBusStop(callback){
    getDataFromMatchmaking('/find', {}, callback, callback);
}

function setInactive(uuid, callback){
    sendDataToMatchmaking('/setStatus', {'uuid':uuid, 'status':'inactive'}, undefined, callback);
}
