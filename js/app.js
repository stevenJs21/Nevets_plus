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
        document.getElementById("mi_cuenta").style.display = "";

        document.getElementById("userout").style.display = "none";
        document.getElementById("userin").style.display = "";

         document.getElementById("emailC").value = email;
        
        
        document.getElementById('emailA').style.display = "none";
        document.getElementById('passA').style.display = "none";
        
        document.getElementById("emailJ").innerHTML= email;
    } else {
        document.getElementById("btnAcceso").style.display = "";
        document.getElementById("checkLogin").style.display = "";
        document.getElementById("areaRegistro").style.display = "";

        document.getElementById("userout").style.display = "";
        document.getElementById("userin").style.display = "none";

        document.getElementById("areaLogin").style.display = "none";
        document.getElementById('passA').style.display = "";
        document.getElementById("btnCerrar").style.display = "none";
        document.getElementById("mi_cuenta").style.display = "none";
    }
});

function status(id){
    return document.getElementById(id).value;
}
function mostrarestado(id,result){
    return document.getElementById(id).innerHTML+=result;
}
function array(emailC,tarea,desc,inicio,fin){
    var data= {
        emailC : emailC,
        tarea : tarea, 
        desc : desc,
        inicio : inicio,
        fin : fin
    };
    return data;
}
function vaciarcampos(id,result){
    return document.getElementById(id).value=result;
}
function inserstatus(){

    var emailC  = status("emailC");
    var tarea = status("tarea");
    var desc = status("desc");
    var inicio = status("inicio");
    var fin = status("fin");

    if (emailC.length==0 || tarea.length==0 || desc.length==0 ||inicio.length==0 || fin.length==0) {
        alert("Algunos campos estan vacios");
    }else{
        var arrayData = array(emailC,tarea,desc,inicio,fin);
        var task = firebase.database().ref("tarea/"+tarea);
        task.set(arrayData);
        alert("Guardado correctamente");
        vaciarcampos("emailC","");
        vaciarcampos("tarea","");
        vaciarcampos("desc","");
        vaciarcampos("inicio","");
        vaciarcampos("fin","");
        
        }
    }
        

function table(emailC,tarea,desc,inicio,fin){
    return '<tr>'+'<td>'+emailC+'</td>'
    +'<td>'+tarea+'</td>'+'<td>'+
    desc+'</td>'+'<td>'+inicio+
    '</td>'+'<td>'+fin+'</td>'+
    
    '<td><i class="fas fa-edit"'+
    'onclick="edit(\''+emailC+'\',\''+tarea+'\',\''+desc+'\',\''+inicio+'\',\''+fin+'\')" ></i></td>'+'<td>|</td>'+
    '<td><i class="far fa-trash-alt"'+ 
    'onclick="deleting(\''+tarea+'\')" ></i></td>'+
    '</tr>'+'<br>';
}
     
(adsbygoogle = window.adsbygoogle || []).push({});


function edit(emailC,tarea,desc,inicio,fin){ 
             $('#allC').show();
            $('#allB').hide(); 
            vaciarcampos("emailC",emailC);
            vaciarcampos("tareaA",tarea);
            vaciarcampos("descA",desc);
            vaciarcampos("inicioA",inicio);
            vaciarcampos("finA",fin);
}    
function array(emailC,tareaA,descA,inicioA,finA){
    var dataA= {
        emailC : emailC,
        tareaA : tareaA, 
        descA : descA,
        inicioA : inicioA,
        finA : finA
    };
    return dataA;
}

function udpt() {
    var emailCA  = status("emailC");
    var tareaA = status("tareaA");
    var descA = status("descA");
    var inicioA = status("inicioA");
    var finA = status("finA");
        if (emailCA.length==0 || 
            tareaA.length==0 || 
            descA.length==0 ||
            inicioA.length==0 || 
            finA.length==0) {
        alert("Algunos campos estan vacios");
    }else{
        
        firebase.database().ref("tarea/"+tareaA).update({
            emailC:emailCA,
            tarea:tareaA,
            desc:descA,
            inicio:inicioA,
            fin:finA
        });
        
        alert("Datos ingresados / actualizados correctamente");
        vaciarcampos("emailC","");
        vaciarcampos("tarea","");
        vaciarcampos("desc","");
        vaciarcampos("inicio","");
        vaciarcampos("fin","");
    }   
}
function deleting(tarea){
    if (confirm("¿Vas a eliminar este registro?")) {
        firebase.database().ref("tarea/"+tarea).remove();
    }
        
    }
function verestado(){
    var task = firebase.database().ref("tarea/");
    task.on("child_added",function(data){
        var taskValues = data.val();
        var other=table(taskValues.emailC,taskValues.tarea,taskValues.desc,taskValues.inicio,taskValues.fin);
        mostrarestado("list2",other);
    });
}    
   
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
            console.log('Salir');
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
$(document).ready(function () {
    $('#statusA').change(function () {
        if ($(this).is(':checked')) {
            $('#allB').show();
            $('#allC').hide();
        }
        else {
            $('#allB').hide();
            $('#allC').show();
        }
    });
});

        var TablaDeBaseDatos= firebase.database().ref('chat');
        TablaDeBaseDatos.limitToLast(20).on('value',function(snapshot){
        
         $(".chat").html(""); // Limpiamos todo el contenido del chat
        
        // Leer todos los mensajes en firebase
        snapshot.forEach(function(e){
            var objeto=e.val(); // Asignar todos los valores a un objeto
            
            // Validar datos nulos y agregar contenido en forma de lista etiqueta <li>
             if((objeto.Mensaje!=null)&&(objeto.Nombre!=null)){
                 
                 // Copia el contenido al template y luego lo inserta en el chat
                 $( "#plantilla" ).clone().prependTo( ".chat" );
                 $('.chat #plantilla').show(100);
                 $('.chat #plantilla .Nombre').html(objeto.Nombre);
                 $('.chat #plantilla .Mensaje').html(objeto.Mensaje);
                 $('.chat #plantilla .Tiempo').html(objeto.Fecha);
                 $('.chat #plantilla').attr("id","");
             }
            
        });
    });
    
    
          
       $('#btnEnviar').click(function(){
           var formatofecha= new Date(); 
           var d= formatofecha.getUTCDate();
           var m= formatofecha.getMonth()+1;
           var y= formatofecha.getFullYear();
           var h=formatofecha.getHours();
           var min= formatofecha.getMinutes();
           
           Fecha= d+"/"+m+"/"+y+" "+h+":"+min;
           
           TablaDeBaseDatos.push({
               Nombre:$("#nombre").val(),
               Mensaje:$("#Mensaje").val(),
               Fecha:Fecha
            });
           
           
       });

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-74824848-1', 'auto');
  ga('send', 'pageview');

var btnAbrirPopup = document.getElementById('mi_cuenta'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function(){
    overlay.classList.add('active');
    popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
    e.preventDefault();
    overlay.classList.remove('active');
    popup.classList.remove('active');
});