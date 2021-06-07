// variables
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

// photosArray is for containing all the data from unsplash
let photosArray = [];

// Helper function to set attributes on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for link, image and add to DOM
function displayPhotos() {
  // run function for each object in photosArray
  photosArray.forEach(photo => {
    // create <a> for link to unsplash
    const item = document.createElement('a');
    
    setAttributes(item, {
      href: photo.links.html,
      title: '_blank'
    })

    // create <img> tag to display photo in Dom
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })

    // append img to item and item to image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// unsplash API
const count = 10;
const apiKey = 'YFdxdDi7Yk75ayFaUhpuCTQBdnWlk_aOTPtCTbz_zt4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(`${apiURL}`);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch {

  }
}

// onload
getPhotos();