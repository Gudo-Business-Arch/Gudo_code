// const searchForm = document.querySelector("#search-form");
// const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const imageOutput = document.querySelector("#image-output");
const info = document.querySelector(".info");
const btn = document.querySelector('.talk_btn');
const content = document.querySelector('input');
const library = document.querySelector('.library_gallery');

// The speech recognition interface lives on the browser
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList; // if none exists -> undefined
const recognition = new SpeechRecognition();
	recognition.onstart = function () {
		console.log('Gudo is listening');
	}

recognition.onstart = function () {
    console.log('Gudo is listening');
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
    doc = nlp(query)
    console.log("PRINTING NOUNS")
    console.log(doc.nouns().json())
    nounlist = doc.nouns().out('array')
    nounlist.forEach(element => console.log(element));
    nounlist.forEach(query => SearchPhotos(query, pagenum));
};

btn.addEventListener('click', () => {
    recognition.start();
});

const auth = "563492ad6f917000010000018ac681b5e4fb48af88579beaad86c24e";
const next = document.querySelector(".next");
const input = document.querySelector("input");
const search_button = document.querySelector(".search_button");
//pexels API MAx Pictures fetched per hour is 200 pictures. for 1 month 20,000 result requests

let pagenum = 1;
let search = false;
//lets you search inside the api
let query = "";

input.addEventListener("input", (e) => {
  //prevent closing page
  e.preventDefault();
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
      `;

    document.querySelector(".gallery").appendChild(pic);
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
      `;

    document.querySelector(".gallery").appendChild(pic);
  });
  if (result.photos.length < 1) {
	  loadImgUnsplashed()
  }
}

search_button.addEventListener("click", () => {
  if (input.value === "") return;
  search = true;
  doc = nlp(query)
  console.log("PRINTING NOUNS")
  console.log(doc.nouns().json())
  nounlist = doc.nouns().out('array')
  nounlist.forEach(element => console.log(element));
  nounlist.forEach(query => SearchPhotos(query, pagenum));
  ;
  pagenum++;
});

document.querySelector('input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (input.value === "") return;
    search = true;
    doc = nlp(query)
    console.log("PRINTING NOUNS")
    console.log(doc.nouns().json())
    nounlist = doc.nouns().out('array')
    nounlist.forEach(element => console.log(element));
    nounlist.forEach(query => SearchPhotos(query, pagenum));
    pagenum++;
  }
});
//clears the previous results in gallery [CURRENTLY DEPRECATED, see removeImage()]
//function clear() {
//  document.querySelector(".gallery").innerHTML = "";
//}

next.addEventListener("click", () => {
  //if false and we dont have any input and you hit the next button then the page will load the next images, if true there is a value in the search input and it will return the desired input
  if (!search) {
    pagenum++;
    CuratedPhotos(pagenum);
  } else {
    if (query.value === "") return;
    pagenum++;
    doc = nlp(query)
    console.log("PRINTING NOUNS")
    console.log(doc.nouns().json())
    nounlist = doc.nouns().out('array')
    nounlist.forEach(element => console.log(element));
    nounlist.forEach(query => SearchPhotos(query, pagenum));
  }
});
CuratedPhotos(pagenum);

function loadImgUnsplashed() {

  const urlUnsplashed =
    "https://api.unsplash.com/search/photos/?query=" +
    input.value +
    "&per_page=1&client_id=YeGuXHx1Qvm9MhEQ8A8YTSp89UX-N5nus9awY5NdrfA";

  fetch(urlUnsplashed)
    .then((response) => {
      if (response.ok) return response.json();
      else alert(response.status);
    })
    .then((data) => {
      const pic = document.createElement("div");
	  for (let i = 0; i < data.results.length; i++) {
        pic.innerHTML = `<img src=${data.results[i].urls.raw}>
		<p>Photo : Unsplashed</p>
		<button onclick="moveImage(this)">Move to Library</button>
		<button onclick="removeImage(this)">Remove</button>
		`;
        document.querySelector(".gallery").appendChild(pic);
	  }
      })
    };

function removeImage(elem) {
  elem.parentNode.remove();
}

function moveImage(elem) {
  var source = elem.parentNode;
  library.appendChild(source);
  elem.remove()
}