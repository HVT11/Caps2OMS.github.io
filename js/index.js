function validate(){
    getListAccounts(authentical)
}


//Function
function getListAccounts(callback) {
    fetch(accountApi)
        .then(res => res.json())
        .then(callback)
}

function authentical(listAccount) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const flag = true

    listAccount.every(account => {
        if(username == account.Username && password == account.Password && account.Type === '1') {
            sessionStorage.setItem("username", account.Username);
            location.href="../admin/admin.html"
            flag = false
        }
        else if(username == account.Username && password == account.Password && account.Type === '2') {
            sessionStorage.setItem("username", account.Username);
            location.href="../teacher/homeTeacher.html"
            flag = false
        }
        return flag
    })

    if (flag == true) {
        alert('Đăng nhập thất bại!!! Tài khoản hoặc mật khẩu sai')
    }
}
    
