// const searchForm = document.querySelector("#search-form");
// const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const imageOutput = document.querySelector("#image-output");
const info = document.querySelector(".info");
const btn = document.querySelector('.talk_btn');
const content = document.querySelector('input');
const library = document.querySelector('.library_gallery');
recognizing = false

// The speech recognition interface lives on the browser
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList; // if none exists -> undefined
const recognition = new SpeechRecognition();

recognition.onstart = function () {
	console.log('Gudo is listening');	// If this doesn't pop up, there might be problems.
	recognizing = true;
	btn.style.background = "#67aaec";
}

async function GetNounsSearch(query, pagenum) {
    doc = nlp(query) // Copies Query to Naatural Language Processing.
    console.log("PRINTING NOUNS")
    console.log(doc.nouns().json())
    nounlist = doc.nouns().out('array')	// Returns an array of each noun in the query. [TODO: Search Photos with the query itself if no nouns are found!]
	if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) { 
	// Perhaps have this on all the time? Would give a reason to use the library.
		console.log("WE FULLSCREEN");
		console.log(nounlist.length);
		if (nounlist.length > 0) { // Okay, so this here, prevents the voice recognition from erasing all images if nothing is said, or you give a phrase without a noun.
		clearGallery();
		};
	};
    nounlist.forEach(element => console.log(element));
    nounlist.forEach(query => SearchPhotos(query, pagenum));
}

recognition.onresult = function(event) {
    //returns what was spoken 
    const current = event.resultIndex;
    //the actual text
    const transcript = event.results[current][0].transcript;
    //accessing the content (h3)
    input.value = transcript;
	query = transcript;
	// ^^^ THIS FIXES THE BUG: THE OTHER PLACE WHERE IT WOULD DEFINE QUERY RELYS ON THE USER CHANGING THE INPUT FOR THE TEXTBOX VIA TYPING on line 49
    console.log(transcript);
	search = true;
	GetNounsSearch(query, pagenum);
	if (recognition.continuous == false) {
		recognizing = false
		btn.style.background = "#bfff00"
	}
};

btn.addEventListener('click', () => {
	if (recognizing == true) {
		recognition.stop();
		recognizing = false;
		btn.style.background = "#bfff00";
	} else {
	recognition.continuous = false; // Default to being off, to give people a chance to move images to the library, for example.
	if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
	recognition.continuous = true;
	console.log("Continuous recognition enabled.")
	}
    recognition.start();
	}});

const auth = "563492ad6f917000010000018ac681b5e4fb48af88579beaad86c24e";	// Pexels API Key
const next = document.querySelector(".next");
const input = document.querySelector("input");
const search_button = document.querySelector(".search_button");
//pexels API MAx Pictures fetched per hour is 200 pictures. for 1 month 20,000 result requests

let pagenum = 1;	// Initializes pagenum to 1.
let search = false;	// I'm not sure what this does?
//lets you search inside the api
let query = "";	// Initializes Query to Blank Value, before being replaced with transcript or search box.

input.addEventListener("input", (e) => {
  //prevent closing page
  e.preventDefault();	// Not sure if this is used anymore?
  query = e.target.value;
});

//in order to fetch the data from the API function
//CURATED PHOTOS****************************************************************
async function CuratedPhotos(pagenum) {
  const data = await fetch(
    //changing the "1" in the line below decides the number of images returned"
    "https://api.pexels.com/v1/curated?per_page=1&page=${pagenum}",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const result = await data.json();
  result.photos.forEach((photo) => {
    const pic = document.createElement("div");
    pic.innerHTML = `<img src=${photo.src.large}>
      
      <p>Photo : ${photo.photographer}</p>
      <button onclick="moveImage(this)">Move to Library</button>
	  <button onclick="removeImage(this)">Remove</button>
      `; // HTML here has variables that get swapped out, those being the ${stuff}. Also has buttons on end so that when an image pops up, the buttons will be added with them.

    document.querySelector(".gallery").appendChild(pic); // Shoves the previous HTML with new variables into the Gallery HTML emlement.
  });
}

//SEARCH QUERY****************************************************************
async function SearchPhotos(query, pagenum) {
  const data = await fetch(
    //changing the "1" in the line below decides the number of images returned"
    `https://api.pexels.com/v1/search?query=${query}&per_page=1&page=${pagenum}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const result = await data.json();
  result.photos.forEach((photo) => {
    const pic = document.createElement("div");
    pic.innerHTML = `<img src=${photo.src.large}>
      
      <p>Photo : ${photo.photographer}</p>
      <button onclick="moveImage(this)">Move to Library</button>
	  <button onclick="removeImage(this)">Remove</button>
      `; // HTML here has variables that get swapped out, those being the ${stuff}. Also has buttons on end so that when an image pops up, the buttons will be added with them.

    document.querySelector(".gallery").appendChild(pic); // Shoves the previous HTML with new variables into the Gallery HTML emlement.
  });
  if (result.photos.length < 1) { // Fallback incase Pexels API fails to provide image for search, such as if the search has no results, or if we ran out our limit of pexels api calls.
	  loadImgUnsplashed()
  }
}

search_button.addEventListener("click", () => { // Preforms Search when clicking search button.
  if (input.value === "") return;
  search = true;
  GetNounsSearch(query, pagenum);
  ;
  pagenum++;
});

document.querySelector('input').addEventListener('keypress', function (e) {	// Does search when hitting Enter.
  if (e.key === 'Enter') {
    if (input.value === "") return;
    search = true;
	GetNounsSearch(query, pagenum);
    pagenum++;
  }
});
//clears the previous results in gallery, only used in fullscreen.
function clearGallery() {
  document.querySelector(".gallery").innerHTML = "";
}

next.addEventListener("click", () => { // Preforms Next Page Search when clicking next button.
  //if false and we dont have any input and you hit the next button then the page will load the next images, if true there is a value in the search input and it will return the desired input
  if (!search) { // If we don't have a search, have it pull up the next page of curated photos... which appears to be broken.
    pagenum++;
    CuratedPhotos(pagenum);
  } else {
    if (query.value === "") return;
    pagenum++;
	// hey, shouldn't we stick this chunk into its own function, to minimize repetitive code? ...Yeah, we totally should, shouldn't we.
	GetNounsSearch(query, pagenum);
  }
});
CuratedPhotos(pagenum); // ...Does this ever get called? I don't know.

function loadImgUnsplashed() {	// Image loading for unsplashed, in case Pexel fails to work.

  const urlUnsplashed =
    "https://api.unsplash.com/search/photos/?query=" +
    input.value +
    "&per_page=1&client_id=YeGuXHx1Qvm9MhEQ8A8YTSp89UX-N5nus9awY5NdrfA";	// Behold, the API Key.

  fetch(urlUnsplashed)
    .then((response) => {
      if (response.ok) return response.json();
      else alert(response.status);	// Uh oh, something went wrong... somewhere.
    })
    .then((data) => {
      const pic = document.createElement("div");
	  for (let i = 0; i < data.results.length; i++) {
        pic.innerHTML = `<img src=${data.results[i].urls.raw}>
		<p>Photo : Unsplashed</p>
		<button onclick="moveImage(this)">Move to Library</button>
		<button onclick="removeImage(this)">Remove</button>
		`; // The HTML appears again, this time specifying that the Photo is from Unsplashed, as that doesn't have the Author information Pexel does.
        document.querySelector(".gallery").appendChild(pic);
	  }
      })
    };

function removeImage(elem) { // Called when pressing the remove button. Removes image, Details on image, and buttons.
  elem.parentNode.remove();
}

function moveImage(elem) { // Called when pressing move to library button. 
  var source = elem.parentNode;
  library.appendChild(source); // I think this is the line of code responsible for removing the Move to Library button once in the Library?
  elem.remove()
}