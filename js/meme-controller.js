'use strict'
var gCurrLine = 0
var gFilter = false;
var filteredImages = [];
var gCanvas = document.getElementById('myCanvas');
var gCtx = gCanvas.getContext('2d');

function onInit() {
    renderImages()
    document.querySelector('.gallery-box').classList.remove('display-none');

}

function onGoToGallery() {
    document.querySelector('.meme-container').classList.add('display-none')
    document.querySelector('.gallery-box').classList.remove('display-none')
    document.querySelector('.user-text').value = ''
    resetMeme()

}

function renderCanvas(id, isDragged = false) {
    document.querySelector('.meme-container').classList.remove('display-none')
    document.querySelector('.gallery-box').classList.add('display-none')
    document.querySelector('.my-memes').classList.add('display-none')



    gMeme.selectedImgId = id // move to service
    let meme = getMeme()
    let image = getImage(id)
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(meme, isDragged)
    }
    img.src = image.url;
}



function onSearch (event) {
    let searchText = event.target.value;
    //if contains doesnt work then switch to includes
    filteredImages = gImgs.filter((image) => image.keyword.contains(searchText))
    
    //show images on gallery
    gFilter = true;
    }

function drawText(meme, isDragged) {
    meme.lines.forEach(function (line) {
        gCtx.fillStyle = isDragged ? 'tomato' : line.fillColor;
        gCtx.textAlign = line.align
        gCtx.strokeStyle = line.strokeColor;
        gCtx.font = line.fontSize + 'px ' + line.fontFamily;
        gCtx.fillText(line.txt, line.lng, line.alt);
        gCtx.strokeText(line.txt, line.lng, line.alt);
        gCtx.measureText(line.txt)
    })
}


function onGetUserText() {
    let text = document.querySelector('.user-text').value;
    editTextInMeme(text)
    renderCanvas(gMeme.selectedImgId)
}

function renderImages() {
    let images = gFilter ? filteredImages : getImages();
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



//Buttons Functions

function onChangeFont() {
    let font = document.querySelector('.change-font-select').value;
    changeFont(font)
    renderCanvas(getImageId())
}

function onIncreaseFont() {
    increasefont()
    renderCanvas(getImageId())
}

function onDecreaseFont() {
    decreasefont()
    renderCanvas(getImageId())
}

function onChangeColor() {
    let color = document.querySelector('#change-color').value;
    changeColor(color)
    renderCanvas(getImageId())

}

function onChangeStroke() {
    let color = document.querySelector('#change-stroke').value;
    changeStroke(color)
    renderCanvas(getImageId())
}

function onAlignCenter() {
    alignCenter()
    renderCanvas(getImageId())
}

function onAlignLeft() {
    alignLeft()
    renderCanvas(getImageId())
}

function onAlignRight() {
    alignRight()
    renderCanvas(getImageId())
}


//Move Lines Functions

function onMoveLineUp() {
    moveLineUp(gCurrLine)
    renderCanvas(getImageId())

}

function onMoveLineDown() {
    moveLineDown(gCurrLine)
    renderCanvas(getImageId())
}

//Add / Delete Lines // switch

function onAddLine() {
    addLine()
    document.querySelector('.user-text').value = ''
    changeLineIdx()
    gCurrLine = getLinesLength()
    renderCanvas(getImageId())
}

function onRemoveLine() {
    if (!gCurrLine)
        removeLine(gCurrLine)
    renderCanvas(getImageId())
    let linesLength = getLinesLength() + 1
    if (!linesLength) {
        gCurrLine = 0
        onAddLine();

    }
    document.querySelector('.user-text').value = gMeme.lines[gCurrLine].txt

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
    document.querySelector('.user-text').value = gMeme.lines[gCurrLine].txt
}


//Download

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}



function toggleMenu() {
    document.body.classList.toggle('menu-open');
    let listItems = document.querySelectorAll('.list-item')
    listItems.forEach(function (item) {
        item.style.display = (item.style.display === 'block') ? 'none' : 'block';
    })

}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

//////////// DRAG AND DROP ////////////


var offsetX = 50;
var offsetY = 100;

var dragok = false;
var startX;
var startY;

function onMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();

    var mouseX = parseInt(event.clientX - offsetX);
    var mouseY = parseInt(event.clientY - offsetY);
    let width = gCtx.measureText(gMeme.lines[gCurrLine].txt).width


    dragok = false;
    let meme = getMeme()

    meme.lines.forEach(function (line) {

        if (mouseX > line.lng && mouseX < line.lng + width && mouseY < line.alt && mouseY <= line.alt && mouseY + 35 >= line.alt) {
            dragok = true;
            line.isDragging = true;

        }
    })

    startX = mouseX;
    startY = mouseY;
}

function onMouseUp(event) {
    event.preventDefault();
    event.stopPropagation();
    dragok = false;
    let meme = getMeme()
    meme.lines.forEach(function (line) {
        line.isDragging = false;
    })
    renderCanvas(gMeme.selectedImgId)
}

function onMouseMove(event) {
    if (dragok) {
        event.preventDefault();
        event.stopPropagation();
        var mouseX = parseInt(event.clientX - offsetX);
        var mouseY = parseInt(event.clientY - offsetY);
        var distanceX = mouseX - startX;
        var distanceY = mouseY - startY;
        let meme = getMeme()
        meme.lines.forEach(function (line) {
            if (line.isDragging) {
                line.lng += distanceX;
                line.alt += distanceY;
            }
        })
        renderCanvas(gMeme.selectedImgId, true);

        startX = mouseX;
        startY = mouseY;

    }
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