var userName = sessionStorage.getItem('username')
var type = sessionStorage.getItem('type')

var avatar = (type == 2 ? `http://127.0.0.1:8000/media/${userName}.jpg` : `http://127.0.0.1:8000/media/${userName}-1.jpg`)


function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
    document.getElementById('header__avatar').src = avatar
}

start()

//function
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
        document.getElementById('change-pass').disabled = true
        password.style.color = "red"
        alert('Sai mật khẩu')
    }
    else {
        document.getElementById('change-pass').disabled = false
        password.style.color = "#01ff02"
    }
}

function changePass(){
    var new_password = document.getElementById("new_password").value

    var formData = {
        Username: userName,
        Password: new_password,
        Type: type
    }
    putAccount(formData)

    setTimeout(() => {
        alert('Mật khẩu đã được thay đổi')
        location.reload()
    }, 2000)

}

function putAccount(data) {
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

function moveToMainPage() {
    location.href = (type == 2 ? './homeTeacher.html' : './homeStudent.html')
}