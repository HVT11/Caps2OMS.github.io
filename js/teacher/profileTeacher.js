var userName = sessionStorage.getItem('username')
var avatar = `http://127.0.0.1:8000/media/${userName}.jpg`


function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
    renderImage()
    getTeacher(renderInfo)
}

start()

function renderImage() {
    document.getElementById('img-avatar').src = avatar
    document.getElementById('header__avatar').src = avatar
}

function getImg() {
    let image = document.getElementById('img-data-upload')
    const formData = new FormData();
    formData.append(
        "file",
        image.files[0],
        image.files[0].name
    )

    postImg(formData)

    setTimeout(() => renderImage(), 2000)
}

function postImg(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "POST",
        body: data
    }
    fetch(imgUploadApi, options)
}

function getTeacher(callback) {
    fetch(teacherApi)
        .then(res => res.json())
        .then(callback)
}

function renderInfo(listTeacher) {
    const teacher = listTeacher.find(teacher => teacher.Username == userName)
    console.log(teacher)
    document.getElementById('name').value = teacher.Name
    document.getElementById('phone').value = teacher.Phone
    document.getElementById('email').value = teacher.Email
}


function getPutInfoTeacher() {
    var name = document.getElementById('name').value
    var phone = document.getElementById('phone').value
    var email = document.getElementById('email').value

    
    var formData = {
        Username: userName,
        Name: name,
        Phone: phone,
        Email: email,
        Avatar: null,
    }

    putTeacher(formData)
    console.log(formData)

    setTimeout(() => {
        alert('Cập nhật thông tin thành công')
    }, 2000)
}

function putTeacher(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(data)
    }
    fetch(teacherApi, options)
}