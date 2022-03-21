
var firebaseConfig = {
      apiKey: "AIzaSyBoztKg2WeA4wwL8rW0gK4aPxk1G08-hok",
      authDomain: "kwitter-f5a0f.firebaseapp.com",
      databaseURL: "https://kwitter-f5a0f-default-rtdb.firebaseio.com",
      projectId: "kwitter-f5a0f",
      storageBucket: "kwitter-f5a0f.appspot.com",
      messagingSenderId: "844138308685",
      appId: "1:844138308685:web:3d8625ef8d52852e782804"
    };
    
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);
username= localStorage.getItem("username");
document.getElementById("user_name").innerHTML="Welcome "+username+"!"

function create(){
      roomname=document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update({
            purpose:"adding room name"
      });
      localStorage.setItem("roomname",roomname);
      window.location="kwitter_page.html";
      document.getElementById("roomname").value="";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("roomname-"+Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";

      document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location="index.html";
}

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("roomname",name);
      window.location="kwitter_page.html";
}
