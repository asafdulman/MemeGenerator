'use strict'

function getSavedMemes() {
    let memes = loadFromStorage(KEY);
    return memes
}