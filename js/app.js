'use strict';

const menubtn = document.getElementById('menu-btn');
const ul_navbar = document.getElementById('main-nav');

let checkNow = function () {
    setTimeout(setActiveSection, 0);
};

let navUpdate = function () {
    let tmpFragment = new DocumentFragment();
    let mainSecs = document.querySelectorAll('main > section');
    for (let currentsec of mainSecs) {
        ul_navbar.innerHTML = ""; // make sure to clear the navbar before updating
        let liTag = document.createElement('li');
        let aTag = document.createElement('a');
        liTag.appendChild(aTag);
        aTag.setAttribute('href', `#${currentsec.id}`);
        aTag.textContent = `${currentsec.dataset.name}`;
        tmpFragment.appendChild(liTag)
    }
    ul_navbar.appendChild(tmpFragment);
}

let setActiveSection = function () {
    /*
    since more than one element could be in the view port, we will
    make only the -- first -- element with "top" value more than 0 to have the active class.
    */
    let currentSecNum = -1; // will store the index of activ section (because it equlas to index of active <li>)
    let mainSecs = document.querySelectorAll('main > section');
    let liList = document.querySelectorAll('#main-nav li');
    let skipNext = false;// skip all next after finding the first element in the view port who is closer to top
    for (let currentsec of mainSecs) {
        currentSecNum++;
        currentsec.classList.remove('actv-section');//clear the active class from all (it will be added then if it's the active one)
        let vals = currentsec.getBoundingClientRect();
        if (!skipNext) {
            if (vals.top >= 0) {
                currentsec.classList.add('actv-section');
                for (let anch of liList) {//we make all anchors not active first
                    anch.classList.remove('actv-anchor');
                }
                if (currentSecNum > -1) {
                    (liList.item(currentSecNum)).classList.add("actv-anchor");
                }
                skipNext = true;
            }
        }

    }

}

menubtn.addEventListener('click', function () {
    if (ul_navbar.style.display == "none") {
        ul_navbar.style.display = "inline-block";
    }
    else {
        ul_navbar.style.display = "none";
    }

});

navUpdate();
setActiveSection();
document.addEventListener('scroll', checkNow);