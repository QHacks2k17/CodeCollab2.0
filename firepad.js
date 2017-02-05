    function init() {
        // Initialize Firebase.
        // TODO: replace with your Firebase project configuration.
        var config = {
            apiKey: " AIzaSyCDiVAqsIAnM1RnffFEgbbtMSVrSvZDaPI",
            databaseURL: "https://codecollab-a0036.firebaseio.com
            "
        };
        firebase.initializeApp(config);

        // Get Firebase Database reference.
        var firepadRef = firebase.database().ref();

        // Create CodeMirror (with lineWrapping on).
        var codeMirror = CodeMirror(document.getElementById('firepad'), {
            lineWrapping: true
        });

        // Create Firepad (with rich text toolbar and shortcuts enabled).
        var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
            richTextShortcuts: true,
            richTextToolbar: true,
            defaultText: 'Hello, World!'
        });
    }