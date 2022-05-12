var ClassID = sessionStorage.getItem("ClassID")
var userName = sessionStorage.getItem('username')

function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
    getStudents(renderListStudent)
    getListAttendance(renderListAttendance)
}

start()

//get Class and RenderUI
function getClassByClassID() {
    return new Promise(function(resolve){
        fetch(classApi)
            .then(res => res.json())
            .then(function(listClass){
                var result = listClass.find(classes => classes.ClassID == ClassID)
                resolve(result)
            })
    })
}

getClassByClassID()
    .then(function(Classes){
        var classCode = document.getElementById("classCode")
        var className = document.getElementById("className")
        var schedule = document.getElementById("schedule")
        var totalStu = document.getElementById("totalStu")

        classCode.innerHTML = Classes.ClassCode
        className.innerHTML = Classes.ClassName
        schedule.innerHTML = Classes.Schedule
        totalStu.innerHTML = Classes.TotalStu
    })



function getStudents(callback) {
    fetch(studentApi)
            .then(res => res.json())
            .then(callback)
}

function getListAttendance(callback) {
    fetch(listAttendanceApi)
            .then(res => res.json())
            .then(callback)
}

function renderListStudent(listStudent){
    var rowStudent = document.getElementById("listStudent")
    var filterStudent = listStudent.filter(student => student.ClassID == ClassID)
    var htmls = filterStudent.map((student) => {
        return `
        <tr class="tb-student-row">
            <td class="tb-student-data">${student.Username}</td>
            <td class="tb-student-data">${student.Name}</td>
            <td class="tb-student-data">
                ${
                    student.StudentCode == null ? "" : student.StudentCode
                }
            </td>
            <td class="tb-student-data">
                ${
                    student.Gentle == "1"
                    ? "Nam"
                    : "Nữ"
                }
            </td>
            <td class="tb-student-data">
                ${
                    student.DateOfBirth == null ? "" : student.DateOfBirth
                }
            </td>
            <td class="tb-student-data">
                ${
                    student.Email == null ? "" : student.Email
                }
            </td>
            <td class="tb-student-data tb-options">
                <i class="options-icon fa-solid fa-pen-to-square" onclick ="openChangePass(${student.Username})"></i>
                <i class="options-icon fa-solid fa-trash-can" onclick ="openDelete(${student.StudentID}, ${student.Username})"></i>
            </td>
        </tr>
        `
    })

    rowStudent.innerHTML = htmls.join("")
}  

function renderListAttendance(listAttendance){
    var rowAttendance = document.getElementById("listAttendance")
    var filterStudent = listAttendance.filter(element => element.ClassID == ClassID)
    var htmls = filterStudent.map((attendance) => {
        return `
        <tr class="tb-student-row">
            <td class="tb-student-data attendance-link" onclick="moveToAttendance(${attendance.ListAttendanceID})">${attendance.Date}</td>
            <td class="tb-student-data">${attendance.Time.slice(0,5)}</td>
            <td class="tb-student-data">
                ${
                    attendance.Total == null ? "" : attendance.Total
                }
            </td>
            <td class="tb-student-data tb-options">
                <i class="options-icon fa-solid fa-trash-can" onclick ="openDelete()"></i>
            </td>
        </tr>
        `
    })

    rowAttendance.innerHTML = htmls.join("")
}   



// Read CSV File and post 
function addListStudent() {
    Papa.parse(document.getElementById("uploadFile").files[0],
    {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results){
            var listAccount = results.data
            listAccount.forEach((account) =>{
                addStudent(account.Username, account.Password, account.Name)
            })
        }
    })
    setTimeout(() => notifyAddSuccess(), 2000) 
}

function addStudent(Username, Password, Name) {
    var formData1 = {
        Username: Username,
        Password: Password,
        Type: "3",
        DateCreate: ""
    }

    postAccount(formData1)

    var formData2 = {
        Name: Name,
        Gentle: "1",
        StudentCode: null,
        DateOfBirth: null,
        Email: null,
        Avatar: null,
        Username: Username,
        ClassID: parseInt(ClassID)
    }

    postStudent(formData2)
}

function postAccount(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    fetch(accountApi, options)
}

function postStudent(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    fetch(studentApi, options)
}

function addListAttendance() {
    var formData = {
        Date: "",
        Time: "",
        Total: null,
        ClassID: ClassID
    }

    postListAttendance(formData)

    document.getElementById('modal-addAttendance').classList.remove('modal--active')

    getListAttendance(renderListAttendance)
}

function postListAttendance(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    fetch(listAttendanceApi, options)
}


// Funtion Modal Success
function notifyAddSuccess() {
    // Enable addStudent
    var addStudent = document.getElementById("addStudent")
    addStudent.classList.add("form__container--disable")

    // Active success
    var addSuccess = document.getElementById("addStudentSuccess")
    addSuccess.classList.add("success-form__container--enable")
}

function notifyDeleteSuccess() {
    // Disable delete form
    var deleteStudent = document.getElementById("deleteStudent")
    deleteStudent.classList.add("form__container--disable")

    // Enable success
    var addSuccess = document.getElementById("formSuccess")
    addSuccess.classList.add("success-form__container--enable")
}

function deleteStu() {
    var StudentID = sessionStorage.getItem("id")

    deleteStudent(StudentID)

    findAccountByUsername()

    setTimeout(() => notifyDeleteSuccess(),2000)

    setTimeout(() => getStudents(renderListStudent),3000)
}
function deleteStudent(StudentID) {
    var options = {
        header: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }
    fetch(studentApi + '/' + StudentID, options)
}

function findAccountByUsername() {
    var user_Delete = sessionStorage.getItem('user_delete')
    fetch(accountApi)
            .then(res => res.json())
            .then((listAccount)=>{
                var AccountID = listAccount.find(account => account.Username == user_Delete).AccountID
                console.log(AccountID)
                deleteAccount(AccountID)
            })
}

function deleteAccount(AccountID) {
    var options = {
        header: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }
    fetch(accountApi + '/' + AccountID, options)
}

function changePassword() {
    var Username = sessionStorage.getItem("user_changePass")
    var Password = document.getElementById("newPass").value

    var formData = {
        Username: Username,
        Password: Password,
        Type: "3",
        DateCreate: ""
    }
    
    putAccount(formData)

    

    Password.value = ''
    document.getElementById("re_newPass").value = ''
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


//Button function
function moveTabAttend() {
    document.getElementById('attend-tab').classList.add('tabBtn--enable')
    document.getElementById('student-tab').classList.remove('tabBtn--enable')
    document.getElementById('list-attendance-tab').style.display = 'block'
    document.getElementById('list-student-tab').style.display = 'none'
}

function moveTabStu() {
    document.getElementById('attend-tab').classList.remove('tabBtn--enable')
    document.getElementById('student-tab').classList.add('tabBtn--enable')
    document.getElementById('list-attendance-tab').style.display = 'none'
    document.getElementById('list-student-tab').style.display = 'block'
}

