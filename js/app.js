var firebaseConfig = {
   apiKey: "AIzaSyABm7Ebrm1QyiR5-NXNUF6u0Yz_Ln1kvrQ",
    authDomain: "nevets-plus.firebaseapp.com",
    databaseURL: "https://nevets-plus.firebaseio.com",
    projectId: "nevets-plus",
    storageBucket: "nevets-plus.appspot.com",
    messagingSenderId: "691155546336",
    appId: "1:691155546336:web:3e1dba87576245bcb42085",
    measurementId: "G-Q8YFCEK5DY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var textoVerificado = "";
        if (emailVerified === false) {
            textoVerificado = "Email no verificado";
        }
        else {
            textoVerificado = "Email verificado";
        }
        var providerData = user.providerData;
       
        document.getElementById("btnAcceso").style.display = "none";
        document.getElementById("checkLogin").style.display = "none";
        document.getElementById("areaRegistro").style.display = "none";
        document.getElementById("areaLogin").style.display = "";
        document.getElementById("btnCerrar").style.display = "";
        document.getElementById('emailA').value=email;
        document.getElementById('passA').style.display = "none";
        console.log(user);
    } else {
        document.getElementById("btnAcceso").style.display = "";
        document.getElementById("checkLogin").style.display = "";
        document.getElementById("areaRegistro").style.display = "";
        document.getElementById("areaLogin").style.display = "none";
        document.getElementById('passA').style.display = "";
        document.getElementById("btnCerrar").style.display = "none";
    }
});

function enviar() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        })
        .then(function () {
            verificar();
        });
}
function verificar() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}
function acceso() {
    var emailA = document.getElementById('emailA').value;
    var passA = document.getElementById('passA').value;
    firebase.auth().signInWithEmailAndPassword(emailA, passA)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}
function cerrar() {
    firebase.auth().signOut()
        .then(function () {
            log('Salir');
        })
        .catch(function (error) {
            console.log(error);
        })
}
$(document).ready(function () {
    $('#loginRestro').change(function () {
        if ($(this).is(':checked')) {
            $('#areaLogin').hide();
            $('#areaRegistro').show();
        }
        else {
            $('#areaLogin').show();
            $('#areaRegistro').hide();
        }
    });
});
