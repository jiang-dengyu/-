let BASE_URL = 'https://user-list.alphacamp.io'
let INDEX_URL = BASE_URL + '/api/v1/users/'
let SHOW_API = `https://user-list.alphacamp.io/api/v1/users/:id`
const users_Array = []
const dataPanel = document.querySelector('#data-panel')

/*將每一份id代表的文件串接出來形成陣列[{},{},{},{}]，*/
/*API載入AVATAR*/
axios.get(INDEX_URL)
  .then(function (response) {
    users_Array.push(...response.data.results)/*迭代將每一份id代表的文件串接出來形成陣列[{},{},{},{}]輸入變數中，
    因為變數是用const宣告無法直接用「=response.data.results」*/
    renderUsersCards(users_Array)
  })
  .catch(function (error) {
    console.log(error)
  })


/*先建立取得大頭貼、名字的函式，裡面利用foreach迴圈將每一個card的html都新增到rawHTML裡面*/
function renderUsersCards(data) {
  let rawHTML = ``
  data.forEach(function (item) {
    rawHTML += `
    <div class="col-sm-2 mx-3 justify-content-center">
      <div class="mb-2">
        <div class="card text-center">
          <img src=${item.avatar} class="card-img-top" alt="Movie Poster"/>
          <div class="card-body">
            <h5 class="card-title">${item.name} ${item.surname}</h5>
          </div>
          <div class="card-footer d-flex justify-content-around">
            <button
              class="btn btn-primary btn-show-users"
              data-bs-toggle="modal"
              data-bs-target="#movie-modal"
              data-id="${item.id}"
            >
              More
            </button>
            <button class="btn btn-info btn-add-favorite">+</button>
          </div>
        </div>
      </div>
    </div>
    `
  });
  dataPanel.innerHTML = rawHTML
}

/* 監聽 data panel，並抓取TARGET是在MORE按鈕上的事件使其能夠觸發MODAL*/
dataPanel.addEventListener('click', function moreClick(event) {
  if (event.target.matches('.btn-show-users')) {
    console.log(event.target)
    showUsersModal(Number(event.target.dataset.id))
  }
})

function showUsersModal(id) {
  const nameModal = document.querySelector("#usersModal-title")
  const emailModal = document.querySelector("#usersModal-email")
  const genderModal = document.querySelector("#usersModal-gender")
  const ageModal = document.querySelector("#usersModal-age")
  const regionModal = document.querySelector("#usersModal-region")
  const birthdayModal = document.querySelector("#usersModal-birthday")

  axios.get(INDEX_URL + id).then(function (response) {
    const user = response.data
    nameModal.textContent = user.name + " " + user.surname
    emailModal.innerText = user.email
    genderModal.innerText = user.gender
    ageModal.innerText = user.age
    regionModal.innerText = user.region
    birthdayModal.innerText = user.birthday
  })
    .catch(function (error) {
      console.error(error);
    })
}
