'use strict'

var gFilter = false;
var gFilteredImages = [];

function onGoToGallery() {
    document.querySelector('.meme-container').classList.add('display-none');
    document.querySelector('.my-memes').classList.add('display-none');
    document.querySelector('.gallery-box').classList.remove('display-none');
    document.querySelector('.user-text').value = '';
    resetMeme();
}

function renderImages() {
    let images = getImages();
    var strHTMLs = images.map(function (image) {
        return `
        <img class="image-gallery" src="images/${image.id}.jpg" onclick="renderCanvas(${image.id})" alt="">
    `
    });
    var elGallery = document.querySelector('.gallery-box');
    elGallery.innerHTML = strHTMLs.join('');

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
    document.querySelector('.my-memes').classList.remove('display-none');
    renderSavedMemes()

}

function renderSavedMemes() {
    var memes = getSavedMemes();
    console.log('memes', memes);
    let strHTML = '';
    memes.forEach(meme => {
        strHTML += `<img class="loaded-img" src="${meme.img}" />`;
    });
    document.querySelector('.my-memes-gallery').innerHTML = strHTML;
}



function onSearch() {
    let searchText = document.querySelector('.search-text').value;
    console.log('searchText', searchText);

    //if contains doesnt work then switch to includes
    gFilteredImages = gImgs.filter(function (image) {
        console.log('image', image);
        return image.keywords.includes(searchText)
    })
    console.log('filteredImages', gFilteredImages);
    //show images on gallery
    gFilter = true;
}
