'use strict'

const KEY = 'memes';
var gMemes = [];



var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        fontFamily: 'Impact',
        fontSize: 30,
        alt: 70,
        lng: 100,
        align: 'left',
        strokeColor: 'black',
        fillColor: 'white',
        isDragging: false,
        isHighlight: false
    }]
}

function resetMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            fontFamily: 'Impact',
            fontSize: 30,
            alt: 70,
            lng: 100,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white',
            isDragging: false,
            isHighlight: false
        }]
    }
    gCurrLine = 0
}

function addLine() {
    let lineHeight;
    if (!gMeme.lines.length) lineHeight = 70;
    else if (gMeme.lines.length === 1) lineHeight = gCanvas.height - 100;
    else lineHeight = 200;
    let newLine = {
        txt: 'Some text Here',
        fontFamily: "Impact",
        fontSize: 30,
        alt: lineHeight,
        lng: 100,
        align: 'left',
        strokeColor: 'black',
        fillColor: 'white',
        isDragging: false,
        isHighlight: false
    }
    gMeme.lines.push(newLine)

}

function changeLineIdx() {
    if (!gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx++
    } else if (gMeme.selectedLineIdx === 1) {
        if (gMeme.lines.length === 2) {
            gMeme.selectedLineIdx = 0
        } else if (gMeme.lines.length === 3) {
            gMeme.selectedLineIdx++
        }
    } else if (gMeme.selectedLineIdx === 2) {
        if (gMeme.lines.length === 3) {
            gMeme.selectedLineIdx = 0
        }
    } else if (gMeme.selectedLineIdx === 3) {
        if (gMeme.lines.length === 4) {
            gMeme.selectedLineIdx = 0
        }
    }
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0
}

function getImageId() {
    return gMeme.selectedImgId
}

function saveMemesToStorage(meme) {
    var memes = loadFromStorage(KEY);
    if (memes) gMemes = memes;
    gMemes.push(meme);
    saveToStorage(KEY, gMemes);
}

function getMyMemes() {
    let memes = loadFromStorage(KEY);
    return memes;
}

function getMeme() {
    return gMeme;
}



function getImgById(imgId) {
    return gImgs.find(function (image) {
        return imgId === image.id
    })
}

function getImages() {
    return gImgs;
}

function getText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function editTextInMeme(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font;
    console.log('font', font);
}

function increasefont() {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += 1
}

function decreasefont() {
    gMeme.lines[gMeme.selectedLineIdx].fontSize -= 1
}

function getFontSize() {
    let meme = gMeme;
    return meme.lines[gMeme.selectedLineIdx].fontSize
}

function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].alt -= 2
}

function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].alt += 2
}



function getLinesLength() {
    return gMeme.lines.length - 1;
}

function removeLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1)
    gMeme.selectedLineIdx = getLinesLength()
    gCurrLine = getLinesLength()
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function changeStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].lng = 170
}

function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].lng = 60
}

function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].lng = 300
}