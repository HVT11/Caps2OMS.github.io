var userName = sessionStorage.getItem('username')
var avatar = `http://127.0.0.1:8000/media/${userName}.jpg`

function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
    document.getElementById('header__avatar').src = avatar
}

start()

function getListTeacher() {
    return new Promise(function(resolve){
        fetch(teacherApi)
            .then(res => res.json())
            .then(listTeacher => resolve(listTeacher))
    })
}

function getListClassByTeacherID(teacherID){
    return new Promise(function(resolve){
        fetch(classApi)
            .then(res => res.json())
            .then(function(listClass){
                var result = listClass.filter(classes => classes.TeacherID == teacherID)
                resolve(result)
            })
        })
}

getListTeacher()
    .then(async function(listTeacher){
        var teacherID = (listTeacher.find(teacher => teacher.Username == userName)).TeacherID
        sessionStorage.setItem("teacherID",teacherID)

        const result = await getListClassByTeacherID(teacherID)
        return (result)
    })
    .then(function(data){
        var rowClass = document.getElementById('listClass')
        var htmls = data.map(function(classes){
            return `
            <tr class="tb-class-row">
                <td class="tb-class-data">
                    <a href="../teacher/classManager.html" class="class-link" onclick="movePage(${classes.ClassID})">${classes.ClassCode}</a>
                </td>
                <td class="tb-class-data">${classes.ClassName}</td>
                <td class="tb-class-data">${classes.Schedule}</td>
                <td class="tb-class-data">${classes.TotalStu}</td>
                <td class="tb-class-data">${classes.DateCreate}</td>
                <td class="tb-class-data tb-options">
                    <i class="options-icon fa-solid fa-pen-to-square" onclick ="Edit()"></i>
                    <i class="options-icon fa-solid fa-trash-can" onclick ="Delete()"></i>
                </td>
            </tr>
            `
        })
        rowClass.innerHTML = htmls.join("")
    }) 


function addClass(){
    var classCode = document.getElementById("classCode").value
    var className = document.getElementById("className").value
    var schedule = document.getElementById("schedule").value
    var totalStu = document.getElementById("totalStu").value
    var teacherID = sessionStorage.getItem("teacherID")
    
    var formData = {
        ClassCode: classCode,
        ClassName: className,
        Schedule: schedule,
        TotalStu: totalStu,
        DateCreate: "",
        TeacherID: teacherID
    }
    postClass(formData)

    setTimeout(() => notifySuccess(),1500)
}


function postClass(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    fetch(classApi, options)
        .then(res => res.json)
}

function notifySuccess() {
    // Enable addClass
    var addClass = document.getElementById("addClass")
    addClass.classList.add("addClass-form__container--enable")

    // Active success
    var addClassSuccess = document.getElementById("addClassSuccess")
    addClassSuccess.classList.add("success-form__container--active")
}

function movePage(id) {
    sessionStorage.setItem("ClassID", id)
}