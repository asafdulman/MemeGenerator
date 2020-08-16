'use strict'

function getSavedMemes() {
    let memes = loadFromStorage(KEY);
    return memes
}

var gKeywords = {
    'idiot': 20,
    'animals': 14,
    'cute': 12,
    'funny': 17,
    'puppy': 10,
    'cat': 9,
    'success': 11,
    'think': 10
}

var gImgs = [{
        id: 1,
        url: 'images/1.jpg',
        keywords: ['IDIOT']
    },
    {
        id: 2,
        url: 'images/2.jpg',
        keywords: ['ANIMALS', 'CUTE']
    },
    {
        id: 3,
        url: 'images/3.jpg',
        keywords: ['ANIMALS', 'CUTE', 'PUPPY']
    },
    {
        id: 4,
        url: 'images/4.jpg',
        keywords: ['ANIMALS', 'CUTE', 'CAT']
    },
    {
        id: 5,
        url: 'images/5.jpg',
        keywords: ['SUCCESS']
    },
    {
        id: 6,
        url: 'images/6.jpg',
        keywords: ['IDIOT']
    },
    {
        id: 7,
        url: 'images/7.jpg',
        keywords: ['CUTE', 'FUNNY']
    },
    {
        id: 8,
        url: 'images/8.jpg',
        keywords: ['THINK']
    },
    {
        id: 9,
        url: 'images/9.jpg',
        keywords: ['FUNNY']
    },
];

function getKeywords() {
    return gKeywords;
}

function updateSearchResults(key) {
    if (gKeywords[key] === 25) return;
    gKeywords[key] = (gKeywords[key]) ? gKeywords[key] + 1 : 10;
}
