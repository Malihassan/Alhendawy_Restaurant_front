// putting hands on anchor tag to listen
anchor = document.querySelector('#anchor');
// adding event listener to anchor
anchor.addEventListener('click', function (e) {
    //checking if the user inserted valid username or not
    if (!isUserNameValid()) {
        alert("please Enter valid user name");
        // e.preventDefault();
    } else if (!isUserEmailValid()) {
        alert("please Enter valid email");
        e.preventDefault();
    } else { sendmail(); }
}); // end of anchor listening event

function sendmail() {
    // Getting the userData from the textboxs 
    userData = document.querySelectorAll(".mailtext");
    username = userData[0].value;
    useremail = userData[1].value;
    subject = userData[2].value;
    anchor.href = "mailto:admin@gmail.com?subject= " + subject + "&body=This is message from : " + username + "";
};
// Validate the username 
function isUserNameValid() {
    username = document.getElementById('username');
    var usernamepattern = /^[a-zA-Z]{2,}\d*$/i;
    return username.value.match(usernamepattern);
};
// validate the Email 
function isUserEmailValid() {
    useremail = document.getElementById('email');
    var useremailpattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return useremail.value.match(useremailpattern);
};