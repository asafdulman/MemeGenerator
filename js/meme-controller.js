'use strict'
var gCurrLine = 0
var gCanvas;
var gCtx;
gCanvas = document.getElementById('myCanvas');
gCtx = gCanvas.getContext('2d');

function onInit() {
    renderImages()
}

function onGoToGallery() {
    document.querySelector('.meme-container').classList.add('display-none')
    document.querySelector('.gallery-box').classList.remove('display-none')
    gCurrLine = 0

}

function renderCanvas(id) {
    document.querySelector('.meme-container').classList.remove('display-none')
    document.querySelector('.gallery-box').classList.add('display-none')
    document.querySelector('.my-memes').classList.add('display-none')


    gMeme.selectedImgId = id // move to service
    let meme = getMeme()
    let image = getImage(id)
    
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(meme)
    }
    img.src = image.url;
}

function GetTextToService() { // change name of the function
    let text = document.querySelector('.user-text').value;
    editTextInMeme(text)
    renderCanvas(gMeme.selectedImgId)
}

function drawText(meme) {
        meme.lines.forEach(function (line) {
            gCtx.fillStyle = line.fillColor;
            gCtx.textAlign = line.align
            gCtx.strokeStyle = line.strokeColor;
            gCtx.font = line.fontSize + 'px Impact';
            gCtx.fillText(line.txt, 200, line.alt);
            gCtx.strokeText(line.txt, 200, line.alt);
        })   
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
    let image = getImgById(id)
    return image;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

//Buttons Functions

function onIncreaseFont() {
    increasefont()
    let id = gMeme.selectedImgId
    renderCanvas(id) 
}
function onDecreaseFont() {
    decreasefont()
    let id = gMeme.selectedImgId
    renderCanvas(id) 
}

function onChangeColor() {
    let color = document.querySelector('.change-color').value;
    changeColor(color)
    let id = gMeme.selectedImgId
    renderCanvas(id)

}

function onChangeStroke() {
    let color = document.querySelector('.change-stroke').value;
    changeStroke(color)
    let id = gMeme.selectedImgId
    renderCanvas(id)
}

function onAlignCenter() {
    alignCenter()
    let id = gMeme.selectedImgId
    renderCanvas(id)
}

function onAlignLeft() {
    alignLeft()
    let id = gMeme.selectedImgId
    renderCanvas(id)
}

function onAlignRight() {
    alignRight()
    let id = gMeme.selectedImgId
    renderCanvas(id)
}


//Move Lines Functions

function onMoveLineUp() {
    moveLineUp(gCurrLine)
    let id = gMeme.selectedImgId
    renderCanvas(id) 

}
function onMoveLineDown() {
    moveLineDown(gCurrLine)
    let id = gMeme.selectedImgId
    renderCanvas(id) 
}

//Add / Delete Lines

function onAddLine() {
    addLine()
    changeLineIdx()
    gCurrLine++
    let id = gMeme.selectedImgId
    renderCanvas(id) 
}
function onRemoveLine() {

    removeLine(gCurrLine)
    gCurrLine = 0;
    let id = gMeme.selectedImgId
    renderCanvas(id)
}

//Download

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function onSwitchLine() {
    
    changeLineIdx()
    if (gCurrLine === gMeme.lines.length - 1) {
        gCurrLine = 0
    } else {
        gCurrLine++
    }
    let id = gMeme.selectedImgId
    renderCanvas(id)
    document.querySelector('.user-text').value = gMeme.lines[gCurrLine].txt;
}

// function highlightLine(line) {
    

// }

// function onSaveMeme() {
//     saveMeme();
// }

// function onShowMyMemes() {
//     document.querySelector('.meme-container').classList.add('display-none')
//     document.querySelector('.gallery-box').classList.add('display-none')
//     document.querySelector('.my-memes').classList.remove('display-none')
//     renderMyMemes()

// }

// function renderMyMemes() {
//     let memes = getMyMemes()
    
//     var strHTMLs = memes.map(function (meme) {
//         return `
//         <img class="meme-gallery" src="" alt="">
//     `
//     });
//     var elGallery = document.querySelector('.gallery-box');
//     elGallery.innerHTML = strHTMLs.join('');
    
// }