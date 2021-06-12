// variables
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// photosArray is for containing all the data from unsplash
let photosArray = [];

// unsplash API
let count = 5;
const apiKey = 'YFdxdDi7Yk75ayFaUhpuCTQBdnWlk_aOTPtCTbz_zt4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages) {
    ready = true;
    loader.style.display = 'none';
    count = 30;
  }
}

// Helper function to set attributes on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for link, image and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

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

    // check when each photo is loaded
    img.addEventListener('load', imageLoaded);

    // append img to item and item to image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// get photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(`${apiURL}`);
    photosArray = await response.json();
    displayPhotos();
  } catch {
    console.log('error');
  }
}

// if scrolling is near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// onload
getPhotos();