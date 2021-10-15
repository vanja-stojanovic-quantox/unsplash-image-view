var clientId = 'eaur7H46_T2a2rR5sGGBOe1TsJk2QXf5hyT-83I2L7s';
var pageNumber = 1;

window.onload = function () {
    loadImages();

    const imageListEl = document.querySelector('.image-list-box');
    imageListEl.addEventListener('scroll', function (e) {
        var element = e.target;

        if (element.scrollHeight - element.scrollTop < element.clientHeight + 1)
        {
            imageListEl.innerHTML += '<div class="mini-loader"></div>';
            pageNumber++;
            loadImages();
        }
    });
}

function loadImages() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://api.unsplash.com/photos?page=' + pageNumber + '&per_page=300&client_id=' + clientId);
    xhttp.send();

    xhttp.onload = function () {
        const response = this.responseText;
        const images = JSON.parse(response);

        let tmpList = '';
        for (let i = 0; i < images.length; i++) {
            let imageAltValue = 'Default image alt.';
            if (images[i].alt_description !== '' && images[i].alt_description !== null) {
                imageAltValue = images[i].alt_description;
            }

            tmpList += '<img class="image grid-image" src="' + images[i].urls.small + '" alt="' + imageAltValue + '" onclick="openImage(\'' + images[i].id + '\')" />';
        }

        const imageListEl = document.querySelector('.image-list-box');

        document.querySelector('.loader').style.display = 'none';
        const miniLoaderEl = document.querySelector('.mini-loader');
        if (miniLoaderEl !== null) {
            miniLoaderEl.remove();
        }

        imageListEl.innerHTML += tmpList;  
        document.querySelector('.all-content').style.display = 'block';
    }
}

function openImage(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://api.unsplash.com/photos/' + id + '?client_id=' + clientId);
    xhttp.send();

    xhttp.onload = function () {
        const response = this.responseText;
        const imageData = JSON.parse(response);

        document.querySelector('#full-image').src = imageData.urls.full;
        document.querySelector('.avatar-image').src = imageData.user.profile_image.small;
        document.querySelector('.username').innerHTML = imageData.user.username;
        document.querySelector('#likes').innerHTML = imageData.likes;
        document.querySelector('#downloads').innerHTML = imageData.downloads;
        document.querySelector('#portfolio-link').innerHTML = imageData.user.portfolio_url;
        document.querySelector('#portfolio-link').href = imageData.user.portfolio_url;

        const instaEl = document.querySelector('#instagram-link');
        if (imageData.user.social.instagram_username !== '' && imageData.user.social.instagram_username !== null) {
            instaEl.href = 'https://www.instagram.com/' + imageData.user.social.instagram_username;
            instaEl.innerHTML = 'https://www.instagram.com/' + imageData.user.social.instagram_username;
        }
        else {
            instaEl.href = '#';
            instaEl.innerHTML = 'Not available';
        }

        const twitterEl = document.querySelector('#twitter-link');
        if (imageData.user.social.twitter_username !== '' && imageData.user.social.twitter_username !== null) {
            twitterEl.href = 'https://twitter.com/' + imageData.user.social.twitter_username;
            twitterEl.innerHTML = 'https://twitter.com/' + imageData.user.social.twitter_username;
        }
        else {
            twitterEl.href = '#';
            twitterEl.innerHTML = 'Not available';
        }

        document.querySelector('.image-preview').style.display = 'block';
    }
}

function changePreview(changeToList) {
    const images = document.getElementsByClassName('image');
    if (changeToList) {
        document.querySelector('.grid-icon').classList.remove('active');
        document.querySelector('.list-icon').classList.add('active');
    }
    else {
        document.querySelector('.list-icon').classList.remove('active');
        document.querySelector('.grid-icon').classList.add('active');
    }

    for (let i = 0; i < images.length; i++) {
        if (changeToList) {
            images[i].classList.add('list-image');
            images[i].classList.remove('grid-image');
        }
        else {
            images[i].classList.add('grid-image');
            images[i].classList.remove('list-image');
        }
    }
}

function closePreview() {
    document.querySelector('.image-preview').style.display = 'none';
}
