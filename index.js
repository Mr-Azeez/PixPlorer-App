var accessKey = "t6itSz7Lzw9njTt7xc7PYn1c-JBucTpAkFSML7KV2b8";

var formElement = document.querySelector("form");
var inputElement = document.getElementById("search-input");
var searchResults = document.querySelector(".search-results");
var showMore = document.getElementById("show-more-button");

var inputData = "";
var page = 1;

async function searchImages(){
    inputData = inputElement.value;
    var url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    var response = await fetch(url);
    var data = await response.json();

    var results = data.results;
    
    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        var imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        var image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        var imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})