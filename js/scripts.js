"use strict";

//filtered out the 12 results to only include name, gender, email, location and picture
const randomGeneratorURL  = 'https://randomuser.me/api/?results=12&inc=name,gender,email,location,picture,dob,cell&nat=us';
const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');
let modalContainer = '';

/**
 * DISPLAYS SEARCH BAR WITHIN PAGE 
 */
const displaySearchBar = () => {
    const form = document.createElement('form');
    form.action = "#";
    form.method = "get";
    const inputSearch = `
        \n\t<input type=\"search\" id=\"search-input\" class=\"search-input\" placeholder=\"Search...\">
        \n\t<input type=\"submit\" value=\"&#x1F50D;\" id=\"search-submit\" class=\"search-submit\">
        `
    form.insertAdjacentHTML('afterbegin', inputSearch);
    searchContainer.insertAdjacentElement('afterbegin', form);
}

/**
 * HELPER FUNCTION
 * FETCHES DATA FROM randomGeneratorURL API and translates it into JSON 
 * JSON - text data turned into workable javascript objects 
 * @param {*} url - url of API (randomGeneratorURL)
 * @returns JSON data of randomly selected profiles
 */
const fetchData = (url) => {
    return fetch(url)
            .then(response => response.json());
}

/**
 * DISPLAYS DATA ON HTML PAGE 
 * @param {*} data - json data acquired from API 
 */
const displayData = (data) => {
    let card = document.createElement('div');
    card.className = "card";
    let cardProfile = `
            <div class=\"card-img-container\">
                <img class=\"card-img\" src=\"${data.picture.medium}\" alt=\"profile picture\">
            </div>
            <div class=\"card-info-container\">
                <h3 id=\"name\" class=\"card-name cap\"> ${data.name.title} ${data.name.first} ${data.name.last} </h3>
                <p class=\"card-text\"> ${data.email} </p>
                <p class=\"card-text cap\"> ${data.location.city}, ${data.location.state} </p>
            </div>
    `

    card.insertAdjacentHTML('afterbegin', cardProfile);
    gallery.appendChild(card);    
}

/**
 *  CREATES HTML OF MODAL AND INSERTS TO PAGE WHEN CALLED
 * @param {*} data 
 */
const displayModal = (data) => {
    const body = document.querySelector('body');
    const script = document.querySelector('script');
    modalContainer = document.createElement('div');
    modalContainer.className = "modal-container";
    let modal = document.createElement('div');
    modal.className = "modal";
    modalContainer.appendChild(modal);

    let modalProfile = `
        <button type=\"button\" id=\"modal-close-btn\" class=\"modal-close-btn\"><strong>X</strong></button>
        <div class=\"modal-info-container\">
            <img class=\"modal-img\" src=\" ${data.picture.medium} \" alt=\"profile picture\">
            <h3 id=\"name\" class=\"modal-name cap\">${data.name.title} ${data.name.first} ${data.name.last}</h3>
            <p class=\"modal-text\">${data.email}</p>
            <p class=\"modal-text cap\">${data.location.city}</p>
            <hr>
            <p class=\"modal-text\">${data.cell}</p>
            <p class=\"modal-text\">${data.location.street.number} ${data.location.street.name} ${data.location.city} ${data.location.state} ${data.location.postcode}</p>
            <p class=\"modal-text\">Birthday: ${data.dob.date.slice(5,7)}/${data.dob.date.slice(8,10)}/${data.dob.date.slice(0,4)}</p>
        </div>
    `
    console.log(data);
    modal.insertAdjacentHTML('afterbegin', modalProfile);
    body.insertBefore(modalContainer, script);
}

/**
 * DISPLAYS MODAL ON PAGE AND HIDES MODAL BY CALLING hideModal()
 * @param {*} data 
 */
const showModal = (data) => {
    const card = document.querySelectorAll('.card');

    for (let i = 0; i < data.length; i++) {
        card[i].addEventListener('click', (e) => {
            displayModal(data[i]);
            hideModal(data[i]);
        })
    }
}

/**
 * HIDES MODAL WHEN X IS CLICKED BY CALLING ON .remove()
 * @param {*} data 
 */
const hideModal = (data) => {
    const modalClose = document.querySelector('#modal-close-btn');

    modalClose.addEventListener('click', (e) => {
        modalContainer.remove();
    });
}

/***  FUNCTION CALLS  ***/

/**
 * DISPLAY SEARCH BAR ON PAGE
 */
displaySearchBar(); 

/**
 * CALLS fetchData HELPER FUNCTION 
 * CALLS iteratedProfiles TO DISPLAY PROFILES ON PAGE 
 * CATCHES ERROR IF NETWORK COMMUNICATION FAILS 
 *
 * @param {*} url 
 * @returns none
 */
fetchData(randomGeneratorURL)
    .then(data => {
        data.results.forEach(profile => {
        displayData(profile);
        });
        console.log(data.results);
        showModal(data.results);
    })
    .catch(error => console.log(error));



