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
room_name=localStorage.getItem("roomname");

function send()
{
   msg=document.getElementById("message").value;
   firebase.database().ref(room_name).push({
         name:username,message:msg,like:0
   });
   document.getElementById("message").value="";


}


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      name=message_data["name"];
      message=message_data["message"];
      like=message_data["like"];
      name_tag="<h4>"+name+"<img class='user_tick' src='tick.png'> </h4>";
      message_tag="<h4 class='message_h4'>"+message+"</h4>";
      like_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span> </button> <hr>";
      chat=name_tag+message_tag+like_tag+span_tag;
      document.getElementById("output").innerHTML+=chat;
//End code
      } });  }); }
getData();

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location="index.html";
}

function updateLike(message_id){
      console.log(message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}