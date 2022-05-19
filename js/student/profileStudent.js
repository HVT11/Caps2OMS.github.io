var userName = sessionStorage.getItem('username')
var classId = sessionStorage.getItem('classId')
var avatar = `http://127.0.0.1:8000/media/${userName}-1.jpg`

function start() {
    var header_username = document.getElementById("username")
    header_username.innerHTML = userName
    renderAvatar()
    renderImage()
    getStudent(renderInfo)
}

start()

function renderImage() {
    var imgData = document.getElementById('img-data')
    var htmls = `
        <img src="http://127.0.0.1:8000/media/${userName}-1.jpg" alt="Photo-1" class="img-data" onerror="this.onerror=null; this.src='../assets/img/img-empty.jpg';">
        <img src="http://127.0.0.1:8000/media/${userName}-2.jpg" alt="Photo-2" class="img-data" onerror="this.onerror=null; this.src='../assets/img/img-empty.jpg';">
        <img src="http://127.0.0.1:8000/media/${userName}-3.jpg" alt="Photo-3" class="img-data" onerror="this.onerror=null; this.src='../assets/img/img-empty.jpg';">
    `
    imgData.innerHTML = htmls
}

function renderAvatar() {
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

    setTimeout(() => {
        renderImage()
        renderAvatar()
    }, 2000)
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

function getStudent(callback) {
    fetch(studentApi)
        .then(res => res.json())
        .then(callback)
}

function renderInfo(liststudent) {
    const student = liststudent.find(student => student.Username == userName)
    console.log(student)
    document.getElementById('name').value = student.Name
    document.getElementById('student-code').value = student.StudentCode
    document.getElementById('date').value = student.DateOfBirth
    document.getElementById('email').value = student.Email
    if(student.Gentle == '1') document.getElementById('men').checked = true
    else document.getElementById('women').checked = true
}


function getPutInfo() {
    var name = document.getElementById('name').value
    var studentCode = document.getElementById('student-code').value
    var dateOfBirth = document.getElementById('date').value
    var email = document.getElementById('email').value
    var gentle = document.getElementById('men').checked

    
    var formData = {
        Username: userName,
        Name: name,
        StudentCode: studentCode,
        Gentle: gentle == true ? '1' : '0',
        DateOfBirth: dateOfBirth,
        Email: email,
        Avatar: null,
        ClassID: classId
    }

    putStudent(formData)
    console.log(formData)

    setTimeout(() => {
        alert('Cập nhật thông tin thành công')
    }, 2000)
}

function putStudent(data) {
    var options = {
        header:{
            'Content-type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(data)
    }
    fetch(studentApi, options)
}