'use strict'

const KEY = 'memes';
var gMyMemes = [];

var gKeywords = {'happy': 12, 'funny puk': 1}

var gImgs = [{
    id: 1,
    url: 'images/1.jpg',
    keywords: ['idiot']
},
{
    id: 2,
    url: 'images/2.jpg',
    keywords: ['animals' , 'cute'] 
},
{
    id: 3,
    url: 'images/3.jpg',
    keywords: ['animals' , 'cute'] 
},
{
    id: 4,
    url: 'images/4.jpg',
    keywords: ['animals' , 'cute'] 
},
{
    id: 5,
    url: 'images/5.jpg',
    keywords: ['success'] 
},
{
    id: 6,
    url: 'images/6.jpg',
    keywords: ['idiot'] 
},
{
    id: 7,
    url: 'images/7.jpg',
    keywords: ['cute'] 
},
{
    id: 8,
    url: 'images/8.jpg',
    keywords: ['think'] 
},
{
    id: 9,
    url: 'images/9.jpg',
    keywords: ['funny'] 
},
];

//each meme should have the id of the image and the line we need to show and edit.
//each line inside the meme should have the text, size, alignment, and color.
//later we will add position with an X and Y on the canvas.



var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        fontSize: 30,
        alt: 70,
        align: 'left',
        strokeColor: 'black',
        fillColor: 'white'
       
    }]
}

function changeLineIdx() {
    if (gMeme.selectedLineIdx === 0) {
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
    }
}

function saveMeme() {
    gMyMemes.push(gMeme)
    _saveMemesToStorage(KEY, gMyMemes)
}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMyMemes)
}

function getMeme() {
    return gMeme;
}

function getMyMemes() {
   let memes = loadFromStorage(KEY);
   return memes;
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

function addLine() {
    let newLine = {
        txt: 'Some text Here',
        fontSize: 30,
        alt: gCanvas.height - 100,
        align: 'left',
        strokeColor: 'black',
        fillColor: 'white'  
    }
    gMeme.lines.push(newLine)
}

function removeLine(lineIdx) {
    if (!gCurrLine) gMeme.lines[0].txt = '';
    else gMeme.lines.splice(lineIdx,1)
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function changeStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}