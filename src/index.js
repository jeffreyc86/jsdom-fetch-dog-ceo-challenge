console.log('%c HI', 'color: firebrick')

const dogImages = document.querySelector("#dog-image-container")
const newUl = document.createElement("ul")
dogImages.append(newUl)

const renderOneImage = imageURL => {
    const newLi = document.createElement("li")
    const newImg = document.createElement("img")
        newImg.src = imageURL
    newLi.append(newImg)
    newUl.append(newLi)
}

const initialize = () =>{
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(data => {
        data.message.forEach(renderOneImage)
    })
}

const dogBreeds = document.querySelector("#dog-breeds")

dogBreeds.addEventListener("click", e => {
    if (e.target.matches("li")) {
        if (!e.target.style.color){
            e.target.style.color = "green"
        } else {
            e.target.style.color = null
        }
    }
})

const renderAllBreeds = dogs => {
    let newArray = []
    Object.keys(dogs).forEach (breed => { 
        if (dogs[breed].length === 0) {
            const newLi = document.createElement("li")
                newLi.className = "breed"
                newLi.textContent = `${breed}`
            dogBreeds.append(newLi)
        } else {
            dogs[breed].forEach(subBreed => {
                const newLi = document.createElement("li")
                    newLi.className = "breed"
                    newLi.textContent = `${breed} - ${subBreed}`
                dogBreeds.append(newLi)
            })
        }
        newArray.push(`${breed}`[0])
    })
    newArray = [...new Set(newArray)]
    newArray.unshift(`All`)
        
        newArray.forEach (option => {
            const newOption = document.createElement("option")
                newOption.value = option
                newOption.innerText = option
            dropDown.append(newOption)
        })
    
}


const breeds = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => {
        renderAllBreeds(data.message)

    })
}

document.addEventListener("DOMContentLoaded", () => {
    initialize()
    breeds()
})

const dropDown = document.getElementById("breed-dropdown")
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
removeAllChildNodes(dropDown)


dropDown.addEventListener("change", e => {
    const allBreeds = document.querySelectorAll(".breed")
    allBreeds.forEach (breed => {
        if (breed.innerText.startsWith(e.target.value)){
            breed.style.display = "revert"
        } else if (e.target.value === "All") {
            breed.style.display = "revert"
        } else {
            breed.style.display = "none"
        }
        })
})    

