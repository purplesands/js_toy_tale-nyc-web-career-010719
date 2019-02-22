document.addEventListener("DOMContentLoaded", function(event) {

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.querySelector('#toy-collection')

let addToy = false

// YOUR CODE HERE

fetch(`http://localhost:3000/toys`)
  .then(function(response) {
  return response.json()
    })
  .then(function(parsedResponse) {

  parsedResponse.forEach(toy => {
    toyContainer.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
    </div>
    `
    })
  })

toyForm.addEventListener("submit", e => {
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value
  let data = {
  "name": name,
  "image": image,
  "likes": 0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(toy => {
    console.log(toy.id)
  toyContainer.innerHTML += `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
  </div>
  `
  })
})

toyContainer.addEventListener("click", e => {
  if (e.target.className === "like-btn") {
    let currentLikes = parseInt(e.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    e.target.previousElementSibling.innerText = newLikes + " Likes"

  fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
  }
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
console.log("DOM fully loaded and parsed");
});
