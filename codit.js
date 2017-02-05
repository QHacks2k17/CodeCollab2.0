/**
 * Created by Awesome-Tbee on 2/4/2017.
 */
var config = {
    apiKey: "AIzaSyCDiVAqsIAnM1RnffFEgbbtMSVrSvZDaPI",
    authDomain: "codecollab-a0036.firebaseapp.com",
    databaseURL: "https://codecollab-a0036.firebaseio.com",
    storageBucket: "codecollab-a0036.appspot.com",
    messagingSenderId: "959804611798"
};
firebase.initializeApp(config);
var email;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        email = user.email.split('.')[0] + ',' + user.email.split('.')[1]
            //        email2 = JSON.stringify(email);
        console.log(email);
        init()
    } else {
        // No user is signed in.
        window.open('index.html', '_self')
    }


});

$('#logout').on('click', logout)
$('#clear').on('click', dispose)
$('#addModalButton').on('click', add)
$('#compile').on('click', replIt)

var firepadRef
var firepad

function init() {
    // Initialize Firebase.
    // TODO: replace with your Firebase project configuration.

    // Get Firebase Database reference.
    firepadRef = getExampleRef();

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), {
        lineNumbers: true,
        mode: 'javascript'

    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    firepad = Firepad.fromCodeMirror(firepadRef.push(), codeMirror, {
        richTextShortcuts: true,
        richTextToolbar: true,
        defaultText: '// JavaScript Editing with Code Collab!\nfunction go() {\n  var message = "Hello, QHacks.";\n  console.log(message);\n}'
    });
    //    var userId = Math.floor(Math.random() * 9999999999).toString();
    //    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
    //        document.getElementById('userlist'), userId)
    //    firepad.on('ready', function () {
    //        if (firepad.isHistoryEmpty()) {
    //            firepad.setText('Check out the user list to the left!');
    //        }
    //    });

    addtoSessions();
}


var sessionKey

function getExampleRef() {
    var ref = firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
        ref = ref.child(hash);
    } else {
        ref = ref.push(); // generate unique location.
        window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
        console.log('Firebase data: ', ref.toString());
    }
    sessionKey = ref.key;
    console.log(sessionKey);
    return ref;
}

function addtoSessions() {

    var data = {
        email: [email]
    }
    console.log(data)
    firebase.database().ref('sessions/' + sessionKey).set(data);
}


//function createNewKey(key, email) {
//    // A key entry.
//    //    var sessionData = {
//    //        key: key,
//    //        email: email,
//    //    };
//
//    // Get a key for a new Session.
//    var newSessionKey = firebase.database().ref().child('session').push().key;
//    console.log(newSessionKey);
//    //    var key = sessionData.key;
//    //     var hash = window.location.key.replace(/#/g, '');
//    //    if (key) {
//    //        key = sessionData.child(key);
//    //    } else {
//    //        key = key.push(); // generate unique location.
//    //        window.location = window.location + '#' + key; // add it as a hash to the URL.
//    //    }
//    //    if (typeof console !== 'undefined') {
//    //        console.log('Firebase data: ', key.toString());
//    //    }
//    //    return sessionData.key;
//    //
//    //
//    //    var updates = {};
//    //    updates['/session/' + newSessionKey] = sessionData;
//    //
//    //    console.log(sessionData.key);
//    //
//    return newSessionKey;
//
//}


$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}

function dispose() {

    //    document.getElementsByClassName('CodeMirror-code').innerHTML = "";
    //    $("CodeMirror-code").empty();
    firepad.dispose()
}

function add() {

}

function replIt() {
    var source = $('#firepad').val()
    var TOKEN = {
        msg_mac: "8NdMhouUpehRqdmwh7N9c7g8MrhXFvsDjSOfmWSDFT4=",
        time_created: 1486261341000
    };
    var date = +new Date()

    var repl = new ReplitClient('api.repl.it', 80, 'python', TOKEN);
    repl.connect().then(function () {
        console.log('connected');

        // Connected now we evaluate some code.
        return repl.evaluate(source, {
            stdout: function (output) {
                // output from the ruby process: hello world
                console.log(output);
            }
        });
    }).then(
        function (result) {
            // The evaluation succeeded. Result will contain `data` or `error`
            // depending on whether the code compiled and ran or if there was an
            // error.
            if (result.error) {
                console.log('Error:', result.error);
            } else {
                console.log('Result', result);
            }

            // After that you may repeat the process and evaluate code in the same context.
        },
        function error(error) {
            // There was an error connecting to the service :(
            console.log(error);
            console.error('Error connecting to repl.it');
        }
    );

}