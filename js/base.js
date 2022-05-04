// API
var accountApi = 'http://127.0.0.1:8000/account'
var teacherApi = 'http://127.0.0.1:8000/teacher'
var classApi = 'http://127.0.0.1:8000/class'
var studentApi = 'http://127.0.0.1:8000/student'

//Function
function openForm() {
    var modal = document.getElementById("modal-Form")
    modal.classList.add("modal--active")
}

function cancelBtn() {
    var modal = document.getElementById("modal-Form")
    modal.classList.remove("modal--active")
}

function cancelBtnReload() {
    var modal = document.getElementById("modal-Form")
    modal.classList.remove("modal--active")
    location.reload()
}

// Log out
function openFormLogout() {
    var modal = document.getElementById("modal-logOut")
    modal.classList.add("modal--active")
}

function yesLogout() {
    location.href = "../index.html"
}

function cancelLogout(){
    var modal = document.getElementById("modal-logOut")
    modal.classList.remove("modal--active")
}

//Delete
function openDelete(id, username) {
    var modal = document.getElementById("modal-delete")
    modal.classList.add("modal--active")

    sessionStorage.setItem("id",id)
    sessionStorage.setItem("user_delete", username)
}

function cancelDelete() {
    var modal = document.getElementById("modal-delete")
    modal.classList.remove("modal--active")
}

// Form ChangePassword
function openChangePass(username) {
    sessionStorage.setItem("user_changePass",username)

    var modal = document.getElementById("modal-changePass")
    modal.classList.add("modal--active")
}

function cancelChangePass() {
    var modal = document.getElementById("modal-changePass")
    modal.classList.remove("modal--active")

    document.getElementById("newPass").value = ""
    document.getElementById("re_newPass").value = ""
}