const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'jxAIFpIoSOgPOPLMgirlJ4PYCcNl6l19mHEntLJFqsw';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}
//Helper function to set attributes on DOM element
function setAttributes(element, attributes){
    for(const key in attributes){
        if(attributes[key])
            element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links, photos, desc
function displayPhotos(){    
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(photosArray)
    photosArray.forEach( (photo) => {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.description,
            title : photo.description,
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        
        // Put <img> inside <a>, then put both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
       const respone = await fetch(apiUrl);
       photosArray = await respone.json(); 
       displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});
// On Load
getPhotos();