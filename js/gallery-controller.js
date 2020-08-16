'use strict'

var gFilter = false;
var gFilteredImages = [];

function onGoToGallery() {
    document.querySelector('.meme-container').classList.add('display-none');
    document.querySelector('.my-memes').classList.add('display-none');
    document.querySelector('.gallery-box').classList.remove('display-none');
    document.querySelector('.search-container').classList.remove('display-none');;
    document.querySelector('.user-text').value = '';
    resetMeme();
}

function renderImages(text) {
    
    let images =  gFilter ? gFilteredImages : getImages();

    if (gFilteredImages.length === 0) images = getImages();
    var strHTMLs = images.map(function (image) {
        return `
        <img class="image-gallery" src="images/${image.id}.jpg" onclick="renderCanvas(${image.id})" alt="">
    `
    });
    var elGallery = document.querySelector('.gallery-box');
    elGallery.innerHTML = strHTMLs.join('');
    gFilter = false;
    renderSearchResults()
}

function onSearch() {
    var images = getImages()
    
    let searchText = document.querySelector('.search-input').value.toUpperCase();

    updateSearchResults(searchText);

    gFilteredImages = images.filter(function (image) {
        return image.keywords.includes(searchText)
    })
    gFilter = true;
    renderImages();
}

function renderSearchResults() {
    const keywords = getKeywords();
    var strHTML = '';
    for (const key in keywords) {
        const str = ` <span class="search-result" style="font-size:${keywords[key] + 5}px;" onclick="onSearchClicked(this)">${key}</span>`;
        strHTML += str;
    }
    document.querySelector('.search-results-box').innerHTML = strHTML;
}

function onSearchClicked(elTxt) {
    updateSearchResults(elTxt.innerText);
    document.querySelector('.search-input').value = elTxt.innerText;
    renderSearchResults()
    onSearch()
    gFilter = true;
    renderImages()

}

function getImage(id) {
    let image = getImgById(id);
    return image;
}

function onShowSavedMemes() {
    document.querySelector('.user-text').value = '';
    resetMeme();
    document.querySelector('.meme-container').classList.add('display-none');
    document.querySelector('.gallery-box').classList.add('display-none');
    document.querySelector('.search-container').classList.add('display-none');
    document.querySelector('.my-memes').classList.remove('display-none');
    renderSavedMemes()

}

function renderSavedMemes() {
    var memes = getSavedMemes();
    let strHTML = '';
    memes.forEach(meme => {
        strHTML += `<img class="loaded-img" src="${meme.img}" />`;
    });
    document.querySelector('.my-memes-gallery').innerHTML = strHTML;
}




