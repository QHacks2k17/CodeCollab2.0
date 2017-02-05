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
    } else {
        // No user is signed in.
        window.open('index.html', '_self')
    }
});

$('#logout').on('click', logout)
$('#clear').on('click', dispose)
$('#addModalButton').on('click', add)

init()

function init() {
    // Initialize Firebase.
    // TODO: replace with your Firebase project configuration.

    // Get Firebase Database reference.
    var firepadRef = getExampleRef();

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), {
        lineNumbers: true,
        mode: 'javascript'

    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef.push(), codeMirror, {
        richTextShortcuts: true,
        richTextToolbar: true,
        defaultText: '// JavaScript Editing with Code Collab!\nfunction go() {\n  var message = "Hello, QHacks.";\n  console.log(message);\n}'
    });
    var userId = Math.floor(Math.random() * 9999999999).toString();
    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
        document.getElementById('userlist'), userId)

    firepad.on('ready', function () {
        if (firepad.isHistoryEmpty()) {
            firepad.setText('Check out the user list to the left!');
        }
    });
}


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
    return ref;
}


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
    $("CodeMirror-code").empty();
}

function add() {

}