start(true);


function sendDataToMatchmaking(page, data, doneFunc, errorFunc){
    $.post(window.location.hostname + '/busstop/' + page, data).done(function(response){
        if(doneFunc)
            doneFunc(JSON.parse(response));
    }).error(function(response){
        if(errorFunc)
            errorFunc({'error':true});
    });
}

function getDataFromMatchmaking(page, data, doneFunc, errorFunc){
    $.get(window.location.hostname + '/busstop/' + page, data).done(function(response){
        if(doneFunc)
            doneFunc(JSON.parse(response));
    }).error(function(response){
        if(errorFunc)
            errorFunc({'error':true});
    });
}

function registerForVideo(uuid, location, callback){
    sendDataToMatchmaking('add', {'uuid':uuid, 'location':location}, undefined, callback);
}

function findBusStop(callback){
    getDataFromMatchmaking('find', {}, callback, callback);
}

function setInactive(uuid, callback){
    sendDataToMatchmaking('setStatus', {'uuid':uuid, 'status':'inactive'}, undefined, callback);
}
