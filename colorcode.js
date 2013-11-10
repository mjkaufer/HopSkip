// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Store CSS data in the "local" storage area.
//
// Usually we try to store settings in the "sync" area since a lot of the time
// it will be a better user experience for settings to automatically sync
// between browsers.
//
// However, "sync" is expensive with a strict quota (both in storage space and
// bandwidth) so data that may be as large and updated as frequently as the CSS
// may not be suitable.
var storage = chrome.storage.local;

// Get at the DOM controls used in the sample.
var submitButton = document.querySelector('button.submit');
//var textarea = document.getElementById('t1');
var t1 = document.querySelector('textarea');
var t2 = document.querySelector('t2');




// Load any CSS that may have previously been saved.
loadBoth();

function loadBoth() {
    loadChanges();
    loadChanges2();


}

submitButton.addEventListener('click', saveBoth);
function saveBoth() {

    saveChanges();
    saveChanges2();
}
function saveChanges() {
    // Get the current CSS snippet from the form.
    var cssCode = t1.value;
    

    // Check that there's some code there.
    if (!cssCode) {
        t1.value = '929292';
    }
    // Save it using the Chrome extension storage API.
    storage.set({ 'css': cssCode }, function () {
        // Notify that we saved.
        message('Settings saved');
    });
}

function saveChanges2() {
    // Get the current CSS snippet from the form.
    var cssCode2 = t2.value;


    // Check that there's some code there.
    if (!cssCode2) {
        t2.value = '929292';
    }
    // Save it using the Chrome extension storage API.
    storage.set({ 'css2': cssCode2 }, function () {
        // Notify that we saved.
        message('Settings saved');
    });
}


function loadChanges() {
    storage.get('css', function (items) {
        // To avoid checking items.css we could specify storage.get({css: ''}) to
        // return a default value of '' if there is no css value yet.
        if (items.css) {
            t1.value = items.css;
            message('Loaded saved CSS.');
        }
    });
}


function loadChanges2() {
    storage.get('css2', function (items) {
        // To avoid checking items.css we could specify storage.get({css: ''}) to
        // return a default value of '' if there is no css value yet.
        if (items.css2) {
            t2.value = items.css2;
            message('Loaded saved CSS.');
        }
    });
}