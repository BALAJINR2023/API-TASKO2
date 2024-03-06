
const API=`https://xeno-canto.org/api/2/recordings?query=cnt:brazil`;
const maindiv=document.querySelector(".maintop");

let currentpage = 1;
let itemsPage = 6;
let totalPages=0;
async function fetchData() {
    try {
        const response = await fetch(API,{
            method: "GET",
        });
        const data = await response.json();
        const datanew=(data.recordings);
        //console.log(datanew);
        maindiv.innerHTML="";
        let startIndex = (currentpage - 1) * itemsPage;
        let endIndex = startIndex + itemsPage;
        datanew.slice(startIndex, endIndex).forEach((values) => {
            appenddata(values);
        });
        totalPages = (Math.ceil(datanew.length / itemsPage))-4;
        //console.log(totalPages);
    } catch (error) {
    console.error('Error:', error);
    }
}
fetchData();

function appenddata(values) {
    const subDiv = document.createElement("div");
    subDiv.className = "card";
    subDiv.innerHTML += `
    <div class="apict">
    <div class="gen">${values.gen}</div>
    <div class="group">${values.group}</div>
    <audio controls>
  <source src="${values.file}" type="audio/ogg" class="audio">
    </audio>
    <div><span class="cnt">${values.cnt}</span></div>
    <div><span class="en">${values.en}</span> </div>

    </div>`;
    maindiv.append(subDiv);
  }
//BUTTONS
  function prevButton() {
    if (currentpage > 1) {
      currentpage--; //1
      fetchData();
    }
  }
    function nextButton() {
     if (currentpage < totalPages) {
    currentpage++;
    fetchData();
    }
  }
  function firstButton(){
    if (currentpage > 1) {
    currentpage = 1;
    fetchData();
    }
  }
  function lastButton(){
    if (currentpage<totalPages) {
    currentpage = totalPages;
    fetchData();
    }
  }
  

  