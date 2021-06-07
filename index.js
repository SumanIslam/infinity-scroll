// unsplash API
const count = 10;
const apiKey = 'YFdxdDi7Yk75ayFaUhpuCTQBdnWlk_aOTPtCTbz_zt4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&coutn=${count}`;

// get photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(`${apiURL}`);
    const data = await response.json();
    console.log(data);
  } catch {

  }
}

// onload
getPhotos()