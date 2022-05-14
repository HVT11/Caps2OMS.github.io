// API
const accountApi = 'http://127.0.0.1:8000/account'
const teacherApi = 'http://127.0.0.1:8000/teacher'
const classApi = 'http://127.0.0.1:8000/class'
const studentApi = 'http://127.0.0.1:8000/student'
const listAttendanceApi = 'http://127.0.0.1:8000/listattendance'
const attendanceApi = 'http://127.0.0.1:8000/attendance'
const imgUploadApi = 'http://127.0.0.1:8000/student/savefile'
const getImgApi = 'http://127.0.0.1:8000/media'


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

function successClose() {
    var modal = document.getElementById("modal-delete")
    modal.classList.remove("modal--active")
    
    var addSuccess = document.getElementById("formSuccess")
    addSuccess.classList.remove("success-form__container--enable")
    
    var deleteStudent = document.getElementById("deleteStudent")
    deleteStudent.classList.remove("form__container--disable")

}

function successAttendanceClose() {
    var modal = document.getElementById("modal-delete-attendance")
    modal.classList.remove("modal--active")
    
    var addSuccess = document.getElementById("form-success")
    addSuccess.classList.remove("success-form__container--enable")
    
    var deleteStudent = document.getElementById("delete-attendance")
    deleteStudent.classList.remove("form__container--disable")

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

// OpenAttendance 
function openAttendance() {
    var modal = document.getElementById("modal-addAttendance")
    modal.classList.add("modal--active")
}

function closeAttendance() {
    var modal = document.getElementById("modal-addAttendance")
    modal.classList.remove("modal--active")
}