start(true);


function sendDataToMatchmaking(page, data, doneFunc, errorFunc){
    $.post(window.location.hostname + '/busstop/' + page, data).done(doneFunc).error(errorFunc);
}

function getDataFromMatchmaking(page, data, doneFunc, errorFunc){
    $.get(window.location.hostname + '/busstop/' + page, data).done(doneFunc).error(errorFunc);
}

function registerForVideo(uuid, callback){
    sendDataToMatchmaking('registerClient', {'uuid':uuid}, undefined, function(error){
        console.log('Problem contacting bacckend');
        callback({'error':true});
    });
}

function findBusStop(callback){
    getDataFromMatchmaking('findBusStop', {}, callback, function(error){
        callback({'error':true, 'e':error});
    });
}

function setInactive(uuid, callback){
    sendDataToMatchmaking('setStatus', {'uuid':uuid, 'status':'inactive'}, undefined, function(error){
        callback({'error':true, 'e':error})
    });
}
