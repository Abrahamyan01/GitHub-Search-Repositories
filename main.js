const buttonSearch = document.querySelector(".search-btn");
let size = 1;

const errorValid = () => {
    document.querySelector(".error").innerText = "Search needs minimum 3 symbols..."
    document.querySelector(".error").focus()
    document.querySelector(".search-input").classList.add("invalid")
}

buttonSearch.addEventListener("click", async (e) => {
    e.preventDefault()
    let name = document.querySelector(".search-input").value
    if (name.length < 3) {
        return errorValid();
    } else {
        document.querySelector(".error").innerText = ""
        document.querySelector(".search-input").classList.remove("invalid")
        let response = await fetch(`https://api.github.com/search/repositories?q=${name}&per_page=10&page=${size}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".repos").innerHTML = ""
                if (data.items.length > 0) {
                    buttonSearch.innerText = "Load More";
                    document.querySelector(".total").innerHTML = `Total: ${(size - 1) * data.items.length} - ${data.items.length * size}`
                } else {
                    document.querySelector(".total").innerHTML = "Not Found..."
                }
                size++
                data.items.forEach(element => {
                    let card = document.createElement("div")
                    card.classList.add("repo-card")
                    card.innerHTML = createCard(element)
                    document.querySelector(".repos").appendChild(card)
                });
            })
    }
});

function createCard(element) {
    return (`
    <h3 class="user-name">${element.owner.login}</h3>
    <div class="user-img">
    <img src=${element.owner.avatar_url} />
    </div>    
    <a href=${element.html_url} target="_blank" class="card-name">${element.name}</a>
    `)
}

let input = document.querySelector(".search-input")
input.addEventListener("input", () => {
    buttonSearch.innerText = "Search";
    size = 1;
})