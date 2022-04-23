var accountApi = 'http://127.0.0.1:8000/account'

let accounts = []

fetch(accountApi)
  .then(response => response.json())
  .then(data => {
      accounts = data.slice()
      console.log(accounts)
  });

function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log(username, password)

    const flag = true

    accounts.every(account => {
        if(username == account.Username && password == account.Password && account.Type === '1') {
            location.href="../admin/admin.html"
            flag = false
        }
        else if(username == account.Username && password == account.Password && account.Type === '2') {
            location.href="../teacher/homeTeacher.html"
            flag = false
        }
        return flag
    })

    if (flag == true) {
        alert('Đăng nhập thất bại!!! Tài khoản hoặc mật khẩu sai')
    }
}
