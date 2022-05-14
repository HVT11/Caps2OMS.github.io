var userName = sessionStorage.getItem('username')
var listAttendanceID = sessionStorage.getItem('listAttendanceID')
var classCode = sessionStorage.getItem('classCode')


function start() {
    document.getElementById("username").innerHTML = userName
    document.getElementById('classCode').innerHTML = classCode
    getListAttendance(renderListAttendance)
    getAttendance(renderAttendance)
}

start()

function getAttendance(callback) {
    fetch(attendanceApi)
            .then(res => res.json())
            .then(callback)
}


function renderAttendance(attendances) {
    var rowAttendance1 = document.getElementById("attendance-list")
    var rowAttendance2 = document.getElementById("attendance-auto-list")
    var filterAttendance = attendances.filter(element => element.ListAttendanceID == listAttendanceID)
    var htmls = filterAttendance.map((attendance) => {
        return `
        <tr class="tb-student-row">
            <td class="tb-student-data">${
                sessionStorage.getItem(attendance.Username)
            }</td>
            <td class="tb-student-data">${attendance.Username}</td>
            <td class="tb-student-data">
                <input class='checkbox-attendance' type="checkbox" id="${attendance.Username}-check" ${attendance.Status == true ? 'checked' : ''} onfocusout="addAttendance(${attendance.AttendanceID},${attendance.Username})">
            </td>
            <td class="tb-student-data">
                <input type="text" id="${attendance.Username}-note" value="${attendance.Note == null ? '' : attendance.Note}" onfocusout="addAttendance(${attendance.AttendanceID},${attendance.Username})">
            </td>
        </tr>
        `
    })
    rowAttendance1.innerHTML = htmls.join("")
    rowAttendance2.innerHTML = htmls.join("")
}

function addAttendance(AttendanceID,Username) {
    var attendanceCheck = document.getElementById(`${Username}-check`).checked
    var attendanceNote = document.getElementById(`${Username}-note`).value == '' ? null : document.getElementById(`${Username}-note`).value


    var formData = {
        AttendanceID: AttendanceID,
        Username : Username,
        Status: attendanceCheck,
        Note: attendanceNote,
        ListAttendanceID: listAttendanceID
    }

    putAttendance(formData)
}

function putAttendance(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(data)
    }
    fetch(attendanceApi, options)
}

//Button function
function moveAutoTab() {
    document.getElementById('auto-tab-btn').classList.add('tabBtn--enable')
    document.getElementById('basic-tab-btn').classList.remove('tabBtn--enable')
    document.getElementById('auto-tab').style.display = 'block'
    document.getElementById('basic-tab').style.display = 'none'
}

function moveBasicTab() {
    document.getElementById('auto-tab-btn').classList.remove('tabBtn--enable')
    document.getElementById('basic-tab-btn').classList.add('tabBtn--enable')
    document.getElementById('auto-tab').style.display = 'none'
    document.getElementById('basic-tab').style.display = 'block'
}


//Render Date Time
function getListAttendance(callback) {
    fetch(listAttendanceApi)
            .then(res => res.json())
            .then(callback)
}

function renderListAttendance(listAttendance) {
    var filter = listAttendance.find(element => (element.ListAttendanceID == listAttendanceID && element.ClassID == ClassID))
    document.getElementById('Date').innerHTML = filter.Date
    document.getElementById('Time').innerHTML = filter.Time.slice(0,5)
}

function refreshData() {
    getAttendance(renderAttendance)
    setTimeout(() => {
        alert('Cập nhật thành công')
    },3000)
}

function moveToDetail() {
    location.href = './classManager.html'
}