// const searchForm = document.querySelector("#search-form");
// const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const imageOutput = document.querySelector("#image-output");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList; // if none exists -> undefined

if (SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString("Bulbasaur");
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  // recognition.lang = "en-US";

//  searchForm.insertAdjacentHTML(
//    "beforeend",
//    '<button type="button"><i class="mic_btn"></i></button>'
//  );
//  searchFormInput.style.paddingRight = "50px";

//  const micBtn = searchForm.querySelector("button");
//  const micIcon = micBtn.firstElementChild;

//  micBtn.addEventListener("click", micBtnClick);
//  function micBtnClick() {
//    if (micIcon.classList.contains("mic_btn")) {
//      // Start Voice Recognition
//      recognition.start(); // First time you have to allow access to mic!
//    } else {
//      recognition.stop();
//    }
//  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("mic_btn");
    //micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    //micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("mic_btn");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    if (transcript.toLowerCase().trim() === "stop recording.") {
      recognition.stop();
    } else if (!searchFormInput.value) {
      searchFormInput.value = transcript;
    } else {
      if (transcript.toLowerCase().trim() === "go.") {
        searchForm.submit();
      } else if (transcript.toLowerCase().trim() === "reset.") {
        searchFormInput.value = "";
      } else {
        searchFormInput.value = transcript;
        var punctuationless = transcript.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          ""
        );
        var punctuationless = punctuationless.replace(/^ +/, "");
        imageOutput.src = "images/" + punctuationless + ".png";
        console.log(imageOutput.src);
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }

  info.textContent = 'Tell Gudo to: "stop recording", "reset", "go"';
} else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}

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
      <a href=${photo.src.large}>Download</a>

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
      
      <p>Photo : ${photo.photographer}</p>;
      <a href=${photo.src.large}>Download</a>

      `;

    document.querySelector(".gallery").appendChild(pic);
  });
}

search_button.addEventListener("click", () => {
  if (input.value === "") return;
  clear();
  search = true;
  SearchPhotos(query, pagenum);
  pagenum++;
});
//clears the previous results in gallery
function clear() {
  input.value = "";
  document.querySelector(".gallery").innerHTML = "";
}

next.addEventListener("click", () => {
  //if false and we dont have any input and you hit the next button then the page will load the next images, if true there is a value in the search input and it will return the desired input
  if (!search) {
    pagenum++;
    CuratedPhotos(pagenum);
  } else {
    if (query.value === "") return;
    pagenum++;
    SearchPhotos(query, pagenum);
  }
});
CuratedPhotos(pagenum);
