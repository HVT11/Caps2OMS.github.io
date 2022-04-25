var accountApi = 'http://127.0.0.1:8000/account'

function start(){
    var header_username = document.getElementById("username")
    header_username.innerHTML = sessionStorage.getItem("username")
}

start()

//Function
function addBtn(){
    var username = document.getElementById("account_username").value
    var password = document.getElementById("account_password").value

    var formData = {
        Username: username,
        Password: password,
        Type: "2"
    }
    addTeacher(formData)
}

function addTeacher(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    fetch(accountApi, options)
        .then(res => res.json)
}
