var userName = sessionStorage.getItem("username")

function start(){
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
    getListAccount(renderListTeacher)
    getListAccount(renderListStudent)
}

start()

function getListAccount(callback) {
    fetch(accountApi)
        .then(res => res.json())
        .then(callback)
}

function renderListTeacher(listAccount) {
    var rowTeacher = document.getElementById('teacher-list')
    var filterTeacher = listAccount.filter(account => account.Type == 2)
    var htmls = filterTeacher.map(function(teacher){
        return `
        <tr class="tb-row">
            <th class="tb-data">${teacher.Username}</th>
            <th class="tb-data">${teacher.Password}</th>
            <th class="tb-data">${teacher.DateCreate}</th>
            <th class="tb-data tb-options">
                <i class="options-icon fa-solid fa-pen-to-square" onclick ="openChangePass2('${teacher.Username}', ${teacher.Type})"></i>
                <i class="options-icon fa-solid fa-trash-can" onclick ="openDelete(${teacher.AccountID},'${teacher.Username}', ${teacher.Type})"></i>
            </th>
        </tr>
        `
    })
    rowTeacher.innerHTML = htmls.join("")
}

function renderListStudent(listAccount) {
    var rowStudent = document.getElementById('student-list')
    var filterStudent = listAccount.filter(account => account.Type == 3)
    var htmls = filterStudent.map(function(student){
        return `
        <tr class="tb-row">
            <th class="tb-data">${student.Username}</th>
            <th class="tb-data">${student.Password}</th>
            <th class="tb-data">${student.DateCreate}</th>
            <th class="tb-data tb-options">
                <i class="options-icon fa-solid fa-pen-to-square" onclick ="openChangePass2('${student.Username}', ${student.Type})"></i>
                <i class="options-icon fa-solid fa-trash-can" onclick ="openDelete(${student.AccountID},'${student.Username}', ${student.Type})"></i>
            </th>
        </tr>
        `
    })
    rowStudent.innerHTML = htmls.join("")
}

function moveStudentTab() {
    document.getElementById('student-tab-btn').classList.add('tabBtn--enable')
    document.getElementById('teacher-tab-btn').classList.remove('tabBtn--enable')
    document.getElementById('student-tab').style.display = 'block'
    document.getElementById('teacher-tab').style.display = 'none'
}

function moveTeacherTab() {
    document.getElementById('student-tab-btn').classList.remove('tabBtn--enable')
    document.getElementById('teacher-tab-btn').classList.add('tabBtn--enable')
    document.getElementById('student-tab').style.display = 'none'
    document.getElementById('teacher-tab').style.display = 'block'
}

function deleteAcc() {
    var AccountID = sessionStorage.getItem("id")
    var userDeleteType = sessionStorage.getItem('user_delete-type')
    var userDelete = sessionStorage.getItem('user_delete')

    deleteAccount(AccountID)

    if(userDeleteType == 3) {
        deleteStudentByUsername(userDelete)
        setTimeout(() => notifyDeleteSuccess(),2000)

        setTimeout(() => getListAccount(renderListStudent),3000)
    }
    else {
        deleteTeacherByUsername(userDelete)

        setTimeout(() => notifyDeleteSuccess(),6000)

        setTimeout(() => getListAccount(renderListTeacher),3000)

        setTimeout(() => getListAccount(renderListStudent),15000)
    }
}

//Delete user : Student
function deleteAccount(AccountID) {
    var options = {
        header: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }
    fetch(accountApi + '/' + AccountID, options)
}

function deleteStudentByUsername(Username) {
    fetch(studentApi)
        .then(res => res.json())
        .then(listStudent => {
            var studentID = listStudent.find(student => student.Username == Username).StudentID
            deleteStudent(studentID)
        })

}

function deleteStudent(id) {
    var options = {
        header: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }
    fetch(studentApi + '/' + id, options)
}


//Delete user : Teacher
function deleteTeacherByUsername(Username) {
    fetch(teacherApi)
        .then(res => res.json())
        .then(listTeacher => {
            var teacherID = listTeacher.find(teacher => teacher.Username == Username).TeacherID
            deleteTeacher(teacherID)
            deleteClassByTeacherID(teacherID)
        })
}

function deleteTeacher(id) {
    var options = {
        header: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }
    fetch(teacherApi + '/' + id, options)
}

function deleteClassByTeacherID(id) {
    fetch(classApi)
        .then(res => res.json())
        .then(listClass => {
            var filterDeleteClass = listClass.filter(classes => classes.TeacherID == id)
            filterDeleteClass.forEach(classes => {
                deleteClass(classes.ClassID)
                deleteStudentByClassID(classes.ClassID)
            })
        })
}

function deleteClass(id) {
    var options = {
        header: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }
    fetch(classApi + '/' + id, options)
}

function deleteStudentByClassID(id) {
    fetch(studentApi)
        .then(res => res.json())
        .then(listStudent => {
            var filterDeleteStudent = listStudent.filter(student => student.ClassID == id)
            filterDeleteStudent.forEach(student => {
                deleteStudent(student.StudentID)
                deleteAccountByUsername(student.Username)
            })
        })
}

function deleteAccountByUsername(Username) {
    fetch(accountApi)
        .then(res => res.json())
        .then(listAccount => {
            var accountID = listAccount.find(account => account.Username == Username).AccountID
            deleteAccount(accountID)
        })
}

function notifyDeleteSuccess() {
    // Disable delete form
    var deleteStudent = document.getElementById("deleteStudent")
    deleteStudent.classList.add("form__container--disable")

    // Enable success
    var addSuccess = document.getElementById("formSuccess")
    addSuccess.classList.add("success-form__container--enable")
}

function changePassword() {
    var user = sessionStorage.getItem('user_changePass')
    var type = sessionStorage.getItem('user_changePass-type')
    
    var formData = {
        Username: user,
        Password: document.getElementById('newPass').value,
        Type: type,
        DateCreate: ''
    }
    
    putAccount(formData)

    setTimeout(() => {
        cancelChangePass()
        alert('Đổi mật khẩu thành công')
        if(type == 2) getListAccount(renderListTeacher)
        else getListAccount(renderListStudent)
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
}