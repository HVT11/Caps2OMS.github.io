
function start(){
    var header_username = document.getElementById("username")
    var lastlogin_username = document.getElementById("lastlogin_username")
    header_username.innerHTML = sessionStorage.getItem("username")
    lastlogin_username.innerHTML = sessionStorage.getItem("username")
    getListAccounts(renderListAccounts)
    countClass()
    countStudent()
    countTeacher()
}

start()

function getListAccounts(callback) {
    fetch(accountApi)
        .then(res => res.json())
        .then(callback)
}
function renderListAccounts(listAccount) {
    var rowAccount = document.getElementById('listAccounts')
    var listAccountFiltered = listAccount.filter(account => account.Type != 1)
    var htmls = listAccountFiltered.map(function(account){
        return `
            <tr class="all-user-row">
            <td class="all-user-data">${account.Username}</td>
            <td class="all-user-data">${account.Password}</td>
            <td class="all-user-data">${account.DateCreate}</td>
            <td class="all-user-data">${
                account.Type == "2"
                ? "Giáo viên"
                : "Học sinh"
            }</td>
    </tr >
        `
    })
    rowAccount.innerHTML = htmls.join("")
}

function countClass() {
    fetch(classApi)
        .then(res => res.json())
        .then(classes => {
            let count = 0
            classes.forEach(() =>{
                count++
            })

            document.getElementById('total-class').innerHTML = count
        })
}

function countStudent() {
    fetch(studentApi)
        .then(res => res.json())
        .then(listStudent => {
            let count = 0
            listStudent.forEach(() =>{
                count++
            })

            document.getElementById('total-student').innerHTML = count
        })
}

function countTeacher() {
    fetch(teacherApi)
        .then(res => res.json())
        .then(listTeacher => {
            let count = 0
            listTeacher.forEach(() =>{
                count++
            })

            document.getElementById('total-teacher').innerHTML = count
        })
}