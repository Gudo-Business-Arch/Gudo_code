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
// async function CuratedPhotos(pagenum) {
//   const data = await fetch(
//     //changing the "1" in the line below decides the number of images returned"
//     "https://api.pexels.com/v1/curated?per_page=15&page=${pagenum}",
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: auth,
//       },
//     }
//   );
//   const result = await data.json();
//   result.photos.forEach((photo) => {
//     const pic = document.createElement("div");
//     pic.innerHTML = `<img src=${photo.src.large}>

//       <p>Photo : ${photo.photographer}</p>
//       <a href=${photo.src.large}>Download</a>

//       `;

//     document.querySelector(".gallery").appendChild(pic);
//   });
// }

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
