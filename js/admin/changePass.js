var accountApi = 'http://127.0.0.1:8000/account'
var userName = sessionStorage.getItem("username")

function start(){
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
}

start()

//Function
function validate(){
    findAccount(checkPass)
}

function findAccount(callback){
    fetch(accountApi)
        .then(res => res.json())
        .then(callback)
}

function checkPass(listAccount) {
    var account = listAccount.find(account => account.Username == userName)
    var password = document.getElementById("password")
    if(account.Password != password.value){
        password.style.color = "red"
    }
    else {
        password.style.color = "green"
    }
}




function addBtn(){
    var new_password = document.getElementById("new_password").value

    var formData = {
        Username: userName,
        Password: new_password,
        Type: "1"
    }
    changePass(formData)
}

function changePass(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(data)
    }
    fetch(accountApi, options)
        .then(res => res.json)
}
