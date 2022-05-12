var accountApi = 'http://127.0.0.1:8000/account'

function start(){
    userName()
    getListAccounts(renderListAccounts)
}

start()

//Function
function userName(){
    var header_username = document.getElementById("username")
    var lastlogin_username = document.getElementById("lastlogin_username")
    header_username.innerHTML = sessionStorage.getItem("username")
    lastlogin_username.innerHTML = sessionStorage.getItem("username")
}

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