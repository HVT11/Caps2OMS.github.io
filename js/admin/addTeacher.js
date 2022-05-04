var userName = sessionStorage.getItem("username")

function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
}

start()

//Function
function addBtn(){
    var username = document.getElementById("account_username").value
    var password = document.getElementById("account_password").value

    var formData1 = {
        Username: username,
        Password: password,
        Type: "2"
    }

    addAccount(formData1)

    var teacherName = document.getElementById("teacherName").value
    var formData2 = {
        Name: teacherName,
        Email: "null",
        Phone: "null",
        Avatar: "null",
        Username: username
    }

    addTeacher(formData2)

    addSuccess(username, password)
}

function addSuccess(username, password) {
    setTimeout(()=>{
        openForm()
        var teacherUsername = document.getElementById("teacherUsername")
        var teacherPass = document.getElementById("teacherPass")

        teacherUsername.innerHTML = username
        teacherPass.innerHTML = password
    },2000)
}

function addAccount(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    fetch(accountApi, options)
}

function addTeacher(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    fetch(teacherApi, options)
}
