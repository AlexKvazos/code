/*
* FEATURE: The following code request a token numbr to download a sruvey from the remote server and stores it into the localstorage.
*/

function getSurveys (req, res) {
    const localstorage = req.localstorage;
    const http = req.http;
    const context = req.context;
    const popup = req.popup; // Assume that this is a component that shows a popup with title, message, input text and a button.

    if(localstorage.getObject('surveys') != null) {
        res.redirect('/surveys')
    } else {
        alert(`You don't have any downloaded survey, you need to download at least one first.`)
    }
    let alertType = 'an invalid'
    popup.prompt({
        title: 'Token',
        template: 'Type the token',
        inputType: 'number',
        inputPlaceholder: 'Token'
    }).then(function (result) {
        if (result > 0 ) {
            context.surveyId = result;
            downloadSurvey();
        } else {
            alertType = 'a valid'
            alert('To begin you must have a '+ alertType +' token');
        }
    });

    http.get('http://localhost/api/v1/sync/survey/' + context.surveyId).success(function (data, status, headers, config) {
        console.log(data);
        if(localstorage.getObject('surveys') != null) {
            for(i = 0; i < localstorage.getObject('surveys').length; i++)
             { if (data.surveyId == localstorage.getObject('surveys')[i].surveyId) {
                 alert("The survey already exists!.");
                 res.redirect('/surveys');
             } else {
                if(i == ($localstorage.getObject('surveys').length-1)) {
                    var localList = localstorage.getObject('surveys');

                    localList.push(data);
                    localstorage.setObject('surveys', localList);
                }
                alert("The survey " + surveyId + " was downloaded succesfully and stored in the localstorage");
             }}
            }else {
				var list = [];
				list.push(data);
				localstorage.setObject('surveys', list);
				alert("The survey " + data.surveyId + " was downloaded succesfully and stored in the localstorage");
			}
    })
}