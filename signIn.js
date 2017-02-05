/**
 * Created by Awesome-Tbee on 2/4/2017.
 */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCDiVAqsIAnM1RnffFEgbbtMSVrSvZDaPI",
    authDomain: "codecollab-a0036.firebaseapp.com",
    databaseURL: "https://codecollab-a0036.firebaseio.com",
    storageBucket: "codecollab-a0036.appspot.com",
    messagingSenderId: "959804611798"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        $('#signup').modal('hide');
        swal("Good job!", "You clicked the button!", "success")
        //window.location.href = "/codit.html";
        window.open('codit.html', '_self')
        console.log('SIGNED IN')
    } else {
        //window.location.href = "/index.html";
    }
});

$('#google').on('click', google)
$('#signIn').on('click', password)
$('#signUp').on('click', signUp)

function password() {
    var email = $('#emailIn').val()
    var password = $('#passwordIn').val()
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage)
    });
}

function signUp() {
    var email = $('#email').val()
    var password = $('#password').val()
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

    });
}

var provider = new firebase.auth.GoogleAuthProvider();

function google() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}