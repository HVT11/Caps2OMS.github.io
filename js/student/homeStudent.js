var userName = sessionStorage.getItem('username')
var avatar = `http://127.0.0.1:8000/media/${userName}-1.jpg`

function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
    document.getElementById('header__avatar').src = avatar
}

start()

//Funtion
function getClassIdByUsername(){
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


function getListAttendanceByClassID(ClassID) {
    return new Promise(function(resolve){
        fetch(listAttendanceApi)
            .then(res => res.json())
            .then(function(listAttendance){
                var listFilter = listAttendance.filter(attendance => attendance.ClassID == ClassID)
                resolve(listFilter)
            })
    })
}

function getAttendanceByListAttendanceId(id) {
    return new Promise(function(resolve){
        fetch(attendanceApi)
            .then(res => res.json())
            .then(function(list){
                var attendance = list.find(attendance => (attendance.ListAttendanceID == id && attendance.Username == userName))
                if(attendance.Status == true) document.getElementById(attendance.ListAttendanceID + '-status').checked = true
                document.getElementById(attendance.ListAttendanceID + '-note').innerHTML = attendance.Note
                resolve(attendance)
            })
    })
}

getClassIdByUsername()
    .then((ClassID) => {
        const result = getListAttendanceByClassID(ClassID)
        return result
    })
    .then(listAttendance => {
        var list = listAttendance
        var rowAttendance = document.getElementById("listAttendance")
        var htmls = listAttendance.map(attendance => {
            return `
            <tr class="tb-attendance-row">
                <td class="tb-attendance-data">${attendance.Date}</td>
                <td class="tb-attendance-data">${attendance.Time.slice(0,5)}</td>
                <td class="tb-attendance-data">
                    <input type="checkbox" id="${attendance.ListAttendanceID}-status" disabled='true' style='color: var(--primary-color); font-size: 1.4rem; '>
                </td>
                <td class="tb-attendance-data" id="${attendance.ListAttendanceID}-note"></td>
            </tr>
            `
        })
        rowAttendance.innerHTML = htmls.join("")

        return list
    })
    .then(list => {
        list.forEach(listAttendance => {
            getAttendanceByListAttendanceId(listAttendance.ListAttendanceID)
        })
    })
