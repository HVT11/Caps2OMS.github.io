var userName = sessionStorage.getItem('username')

function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
}

start()

//Funtion
function getStudentIdByUsername(teacherID){
    return new Promise(function(resolve){
        fetch(studentApi)
            .then(res => res.json())
            .then(function(listStudent){
                var StudentID = listStudent.find(student => student.Username == userName).StudentID
                resolve(StudentID)
            })
        })
}

function getListAttendanceById(StudentID) {
    return new Promise(function(resolve){
        fetch(attendanceApi)
            .then(res => res.json())
            .then(function(listAttendance){
                var listFilter = listAttendance.filter(attendance => attendance.StudentID == StudentID)
                resolve(listFilter)
            })
    })
}

function getClassIdByUsername(teacherID){
    return new Promise(function(resolve){
        fetch(studentApi)
            .then(res => res.json())
            .then(function(listStudent){
                var ClassID = listStudent.find(student => student.Username == userName).ClassID
                resolve(ClassID)
            })
        })
}

function getClassByClassID(ClassID) {
    return new Promise(function(resolve){
        fetch(classApi)
            .then(res => res.json())
            .then(function(listClass){
                var classes = listClass.find(classes => classes.ClassID == ClassID)
                resolve(classes)
            })
    })
}

getClassIdByUsername()
    .then(async function(ClassID){
        const result = await getClassByClassID(ClassID)
        return (result)
    })
    .then(classes => {
        var classCode = document.getElementById("classCode")
        var className = document.getElementById("className")
        var schedule = document.getElementById("schedule")
        var totalStu = document.getElementById("totalStu")

        classCode.innerHTML = classes.ClassCode
        className.innerHTML = classes.ClassName
        schedule.innerHTML = classes.Schedule
        totalStu.innerHTML = classes.TotalStu
    })

getStudentIdByUsername()
    .then(async function(StudentID){
        const result = await getListAttendanceById(StudentID)
        return (result)
    })
    .then(function(listAttendance){
        var rowAttendance = document.getElementById("listAttendance")
        var htmls = listAttendance.map(attendance => {
            return `
            <tr class="tb-attendance-row">
                <td class="tb-attendance-data">${attendance.Date}</td>
                <td class="tb-attendance-data">${attendance.Time.slice(0,5)}</td>
                <td class="tb-attendance-data">
                    ${
                        attendance.Status == false
                        ? ""
                        : "x"
                    }
                </td>
                <td class="tb-attendance-data">
                    ${
                        attendance.Note == null ? "" : attendance.Note
                    }
                </td>
            </tr>
            `
        })

        rowAttendance.innerHTML = htmls.join("")
    })

