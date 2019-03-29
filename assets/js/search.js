var searchBtn = document.querySelector('.search-start');
var searchClear = document.querySelector('.search-clear');
var searchInput = document.querySelector('.search-input');
var searchResults = document.querySelector('.search-results');
var searchValue = '',
    arrItems = [],
    arrContents = [],
    arrLinks = [],
    arrTitles = [],
    arrResults = [],
    indexItem = [];
var tmpDiv = document.createElement('div');
tmpDiv.className = 'result-item';

var xhr = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        xml = xhr.responseXML;
        arrItems = xml.getElementsByTagName('item');
        // Get all article links, titles, contents
        for (i = 0; i < arrItems.length; i++) {
            arrContents[i] = arrItems[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
            arrLinks[i] = arrItems[i].getElementsByTagName('link')[0].childNodes[0].nodeValue.replace(/\s+/g, '');
            arrTitles[i] = arrItems[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
        }
    }
}
xhr.open('get', '/feed.xml', true);
xhr.send();

searchBtn.onclick = searchConfirm;
searchClear.onclick = function(){
    searchInput.value = '';
    searchResults.style.display = 'none';
    searchClear.style.display = 'none';
}
searchInput.onkeydown = function () {
    setTimeout(searchConfirm, 0);
}
searchInput.onfocus = function () {
    searchResults.style.display = 'block';
}

function searchConfirm() {
    if (searchInput.value == '') {
        searchResults.style.display = 'none';
        searchClear.style.display = 'none';
    } else if (searchInput.value.search(/^\s+$/) >= 0) {
        // Input are spaces
        searchInit();
        var itemDiv = tmpDiv.cloneNode(true);
        itemDiv.innerText = '请输入有效内容...';
        searchResults.appendChild(itemDiv);
    } else {
        // Valid input
        searchInit();
        searchValue = searchInput.value;
        searchMatching(arrContents, searchValue);
    }
}

function searchInit() {
    arrResults = [];
    indexItem = [];
    searchResults.innerHTML = '';
    searchResults.style.display = 'block';
    searchClear.style.display = 'block';
}

function searchMatching(arr, input) {
    // Match the input in all contents
    for (i = 0; i < arr.length; i++) {
        if (arr[i].search(input) != -1) {
            indexItem.push(i);
            var indexContent = arr[i].search(input);
            var l = input.length;
            var step = 10;
            // Mark the match content, and output surround content
            arrResults.push(arr[i].slice(indexContent - step, indexContent) +
                '<mark>' + arr[i].slice(indexContent, indexContent + l) + '</mark>' +
                arr[i].slice(indexContent + l, indexContent + l + step));
        }
    }

    // Output total matchs number
    var totalDiv = tmpDiv.cloneNode(true);
    totalDiv.innerHTML = '总匹配：<b>' + indexItem.length + '</b> 项';
    searchResults.appendChild(totalDiv);

    // Result array length is 0
    if (indexItem.length == 0) {
        var itemDiv = tmpDiv.cloneNode(true);
        itemDiv.innerText = '未匹配到内容...';
        searchResults.appendChild(itemDiv);
    }

    // Out put all of the result titles, contents
    for (i = 0; i < arrResults.length; i++) {
        var itemDiv = tmpDiv.cloneNode(true);
        itemDiv.innerHTML = '<b>《' + arrTitles[indexItem[i]] +
            '》</b><hr />' + arrResults[i];
        itemDiv.setAttribute('onclick', 'changeHref(arrLinks[indexItem[' + i + ']])');
        searchResults.appendChild(itemDiv);
    }
}

function changeHref(href) {
    // Goto the result page
    location.href = href;
    // Goto a new page
    // window.open(href);
}