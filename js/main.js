// Завдання

// Потрібно реалізувати функціонал як на відео UserList, а саме:
// 1.	При кліку на кнопку Add user запускаєте функцію addUser() яка робить наступне:
// a.	Стягуєте дані з полів і формує об’єкт.
// b.	Цей об’єкт пушитю в масив.
// c.	Поля зачищає.
// d.	Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.

// 2.	При кліку на кнопку Delete запускаєте функцію deleteUser() яка робить наступне:
// a.	Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// b.	По цьому індексу видаляємо елемент з масиву.
// c.	Запускаєм заново функцію render().

// 3.	При кліку на кнопку Edit запускаєте функцію editUser() яка робить наступне:
// a.	Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// b.	По цьому індексу витягуємо конкретрний елемент(тобто об’єкт) з масиву.
// c.	З об’єкт достаємо дані і передаємо в форму(тобто у value інпутів).
// d.	Запам’ятовуємо даний індекс в змінну userIndex.
// e.	Показуємо кнопку Edit user і приховуємо Add user.

// 4.	При кліку на кнопку Edit User запускаєте функцію saveEditUser() яка робить наступне:
// a.	Стягуєте дані з полів і формує об’єкт через клас.
// b.	Цей об’єкт додається на місце старого об’єкту через userIndex.
// c.	Поля зачищає.
// d.	Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.
// 5.	Всі поля форми потрібно валідувати перед добавленням, а саме:
// a.	Login: може бути слово англійською з великої або маленької букви від 4 до 16 символів.
// b.	Password: можуть бути букви, цифри, символ нижнього підкреслювання(_), тире(-) та символ крапки(.) від 4 до 16 символів
// c.	Email: обов'язково @. Усі букви повинні бути англійською. Загальні вимоги наступні(будь-яка кількість букв, цифр, тире і крапок@будьяка кількість букв.( net.ua, org.ua, gmail.com.  і т.д.)).



let arr = []

function User(login, password, email) {
    this.login = login;
    this.password = password;
    this.email = email;
}


let login = document.getElementById("login")
let password = document.getElementById("password")
let email = document.getElementById("email")
let btnAddUser = document.getElementById("btnAddUser")
let resultRow = document.getElementById("resultRow")
let btnclick = document.getElementsByTagName('button')
let btnEditUser = document.getElementById('btnEditUser')
let table = document.getElementById('table')


btnAddUser.addEventListener('click', addUser)
btnEditUser.addEventListener('click', saveEditUser)

let userIndex


function Check() {
    function checkEmail() {
        if (/[A-Z |a-z|0-9]|.|-|_/.test(email.value) && /@/.test(email.value)) {
            return true
        } else {
            email.style = "background:red; font-size:15px"
            setTimeout(() => email.style = "background:white", 500)

        }
    }

    function checkLogin() {
        if (/[A-Z |a-z]/.test(login.value) && login.value.length >= 4 && login.value.length <= 16) {
           return true
        } else {
            login.style = "background:red; font-size:15px"
            setTimeout(() => login.style = "background:white", 500)

        }
    }

    function checkPassword() {
        if (/[A-Z |a-z|0-9|.|-|_]/.test(password.value) && password.value.length >= 4 && password.value.length <= 16) {
            return true
        } else {
            password.style = "background:red; font-size:15px"
            setTimeout(() => password.style = "background:white", 500)

        }
    }
    if (checkEmail(), checkLogin() ,checkPassword()) {
        return true
    } else return false
}


function addUser() {

    if (Check()) {
        let user = new User(login.value, password.value, email.value);
        login.value = ""
        password.value = ""
        email.value = ""
        arr.push(user)
        table.innerHTML = ""
        render()

    }
}

function render() {
    for (let i = 0; i < arr.length; i++) {
        table.innerHTML += `<tr id="${i}" >
        <td>${i+1} </td>
        <td>${arr[i].login}</td>
        <td> ${arr[i].password}</td>
        <td> ${arr[i].email}</td>
        <td><button class="btnEdit" >Edit</button  ></td> <td><button class="btnDelete" >Delete</button></td>
        </tr>`

        for (let f = 0; f < btnclick.length; f++) {
            btnclick[f].addEventListener('click', btn)
        }
    }
}








function btn(el) {

    if (el.target.innerHTML == "Delete") {
        deleteUser(el)


    } else if (el.target.innerHTML == "Edit") {
        editUser(el)
    } else return

}

function deleteUser(el) {

    let u = +(el.path[2].id)
    el.path[2].remove()
    arr.splice(u, 1)
    table.innerHTML = ""

    render()


}

function editUser(el) {
    userIndex = el.path[2].id
    let objValue = arr[userIndex]
    login.value = objValue.login
    password.value = objValue.password
    email.value = objValue.email
    btnAddUser.style = "display:none"
    btnEditUser.style = "display:block"
    table.innerHTML = ""
    render()
}

function saveEditUser() {
    btnEditUser.style = "display:none"
    btnAddUser.style = "display:block"
    user = new User(login.value, password.value, email.value);
    table.innerHTML = ""
    arr.splice(userIndex, 1, user)
    render()
    login.value = ""
    password.value = ""
    email.value = ""
}