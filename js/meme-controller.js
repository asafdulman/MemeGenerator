'use strict'
var gCurrLine = 0;

var gCanvas = document.getElementById('myCanvas');
var gCtx = gCanvas.getContext('2d');

function onInit() {
    renderImages();
    renderCanvasForMobile()
    document.querySelector('.gallery-box').classList.remove('display-none');

}

function renderCanvas(id) {
    document.querySelector('.meme-container').classList.remove('display-none');
    document.querySelector('.gallery-box').classList.add('display-none');

    gMeme.selectedImgId = id;
    let meme = getMeme();
    let image = getImage(id);
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(meme);
    }
    img.src = image.url;
}

function drawText(meme) {
    meme.lines.forEach(function (line) {
        if (line.isDragging && line.isHighlight) {
            gCtx.fillStyle = 'tomato';
        } else {
            gCtx.fillStyle = line.fillColor;
        }
        gCtx.textAlign = line.align;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.font = line.fontSize + 'px ' + line.fontFamily;
        gCtx.fillText(line.txt, line.lng, line.alt);
        gCtx.strokeText(line.txt, line.lng, line.alt);
        gCtx.measureText(line.txt);
    })
}

function renderCanvasForMobile() {
    if (window.screen.width < 450) {
        gCanvas.width = 300
        gCanvas.height = 300
        renderCanvas(gMeme.selectedImgId)
    }
}


function onGetUserText() {
    let text = document.querySelector('.user-text').value;
    editTextInMeme(text);
    renderCanvas(gMeme.selectedImgId);
}



//Buttons Functions

function onChangeFont() {
    let font = document.querySelector('.change-font-select').value;
    changeFont(font);
    renderCanvas(getImageId());
}

function onIncreaseFont() {
    increasefont();
    renderCanvas(getImageId());
}

function onDecreaseFont() {
    decreasefont();
    renderCanvas(getImageId());
}

function onChangeColor() {
    let color = document.querySelector('#change-color').value;
    changeColor(color);
    renderCanvas(getImageId());

}

function onChangeStroke() {
    let color = document.querySelector('#change-stroke').value;
    changeStroke(color);
    renderCanvas(getImageId());
}

function onAlignCenter() {
    alignCenter();
    renderCanvas(getImageId());
}

function onAlignLeft() {
    alignLeft();
    renderCanvas(getImageId());
}

function onAlignRight() {
    alignRight();
    renderCanvas(getImageId());
}


//Move Lines Functions

function onMoveLineUp() {
    moveLineUp(gCurrLine);
    renderCanvas(getImageId());

}

function onMoveLineDown() {
    moveLineDown(gCurrLine);
    renderCanvas(getImageId());
}

//Add // Delete Lines // switch

function onAddLine() {
    addLine();
    document.querySelector('.user-text').value = '';
    changeLineIdx();
    gCurrLine = getLinesLength();
    renderCanvas(getImageId());
}

function onRemoveLine() {
    removeLine(gCurrLine);
    renderCanvas(getImageId());
    let linesLength = getLinesLength() + 1;
    if (!linesLength) {
        gCurrLine = 0;
        onAddLine();

    }
    document.querySelector('.user-text').value = gMeme.lines[gCurrLine].txt;

}

function onSwitchLine() {
    changeLineIdx();

    if (gCurrLine === gMeme.lines.length - 1) {
        gCurrLine = 0;
    } else {
        gCurrLine++;
    }
    let id = gMeme.selectedImgId;
    renderCanvas(id);
    document.querySelector('.user-text').value = gMeme.lines[gCurrLine].txt;
}


//Download

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}



function toggleMenu() {
    document.body.classList.toggle('menu-open');
    let listItems = document.querySelectorAll('.list-item');
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

var dragged = false;
var startX;
var startY;

function onMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();

    var mouseX = parseInt(event.clientX - offsetX);
    var mouseY = parseInt(event.clientY - offsetY);
    let textWidth = gCtx.measureText(gMeme.lines[gCurrLine].txt).width;


    dragged = false;
    let meme = getMeme();

    meme.lines.forEach(function (line) {

        if (mouseX > line.lng && mouseX < line.lng + textWidth && mouseY < line.alt && mouseY <= line.alt && mouseY + 35 >= line.alt) {
            dragged = true;
            line.isDragging = true;
            line.isHighlight = true;
        }
    })

    startX = mouseX;
    startY = mouseY;
}

function onMouseUp(event) {
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
    let meme = getMeme();
    meme.lines.forEach(function (line) {
        line.isDragging = false;
        line.isHighlight = false;
    })
    renderCanvas(gMeme.selectedImgId);
}

function onMouseMove(event) {
    if (dragged) {
        event.preventDefault();
        event.stopPropagation();
        var mouseX = parseInt(event.clientX - offsetX);
        var mouseY = parseInt(event.clientY - offsetY);
        var distanceX = mouseX - startX;
        var distanceY = mouseY - startY;
        let meme = getMeme();
        meme.lines.forEach(function (line) {
            if (line.isDragging) {
                line.lng += distanceX;
                line.alt += distanceY;
            }
        })
        renderCanvas(gMeme.selectedImgId);

        startX = mouseX;
        startY = mouseY;

    }
}

function onSaveMeme() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    var meme = {
        id: makeId(),
        img: imgContent,
        gMeme
    }
    saveMemesToStorage(meme);
}

