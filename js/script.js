/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.
***/

const studentList = document.getElementsByClassName('student-item');
const numItemsToShow = 10;

/***
   The function addSearchBar creates new div, input and button
   elements and then add them to the index.html file directly
   under the div with a class of "page-header" (at the top of
   the page.)
***/

function addSearchBar() {
  const headerDiv = document.querySelector('div.page-header');
  const searchDiv = document.createElement('div');
  let searchInput = document.createElement('input');
  const searchButton = document.createElement('button');
  searchDiv.classList.add('student-search');
  searchInput.placeholder = `Search for students...`;
  searchButton.textContent = `Search`;

  headerDiv.appendChild(searchDiv);
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
}

// adds the new Search Bar at the top of the page
addSearchBar();

function showPage(list, pageNum ) {
  let startIndex = (pageNum * numItemsToShow) - numItemsToShow;
  let endIndex = pageNum * numItemsToShow;

  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}

// show the first set of students
showPage(studentList, 1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
  const numPageButtons = Math.ceil(list.length / numItemsToShow);
  const prevDiv = document.querySelector('.page');
  const buttonsDiv = document.createElement('div');
  const buttonsUl = document.createElement('ul');

  buttonsDiv.classList.add('pagination');
  prevDiv.after(buttonsDiv);
  buttonsDiv.appendChild(buttonsUl);

  // this code executes once for each required page button
  // and creates a list item with a link for each button
  for (let i = 1; i <= numPageButtons; i += 1) {
    let buttonLi = document.createElement('li');
    let buttonLink = document.createElement('a');
    buttonsUl.appendChild(buttonLi);
    if (i === 1) {
      buttonLink.className = 'active';
    }
    buttonLink.href = '#';
    buttonLink.textContent = i;
    buttonLi.appendChild(buttonLink);
  }

  let buttonList = document.querySelectorAll('div.pagination ul li a');

  for (let i = 0; i < buttonList.length; i += 1 ) {
    let pageButton = buttonList[i];
    let pageNumber = i + 1;

    pageButton.addEventListener('click', () => {
      for (let j = 0; j < buttonList.length; j += 1) {
        buttonList[j].classList.remove('active');
      }
      pageButton.classList.add('active');
      showPage(list,pageNumber);
    });
  }
}

appendPageLinks(studentList);

// create event location for the search button
const submit = document.querySelector('div.student-search button');

/***
   Listens for the click of the search button, stores the value
   entered for searching and calls the doSearch function.
***/
submit.addEventListener('click', (event) => {
  event.preventDefault();
  let searchButton = event.target;
  let searchName = searchButton.previousElementSibling.value;
  doSearch(searchName, studentList);
});

// create event location for the search input area

const search = document.querySelector('div.student-search input');

/***
   Listens for search data being entered in the input area, stores
   the input info and calls the doSearch funtion.
***/
// search.addEventListener('keyup', (event) => {
//   let searchName = event.target.value;
//   console.log(searchName);
// });

function doSearch(searchInput, names) {
  let matchingStudents = [];
  for (let i = 0; i < names.length; i += 1) {
    studentInfo = names[i];
    studentName = studentInfo.querySelector('h3').textContent.toLowerCase();
    searchInputName = searchInput.toLowerCase();
      if (searchInput.length != 0 && studentName.includes(searchInputName) ) {
        matchingStudents.push(studentInfo);
      }
    }

    if (matchingStudents.length < 1) {
      let noMatchMessage = document.querySelector('input');
      noMatchMessage.value = "No match found..."
    }
    
  let divPagination = document.querySelector('div.pagination');
  divPagination.remove();

  showPage(matchingStudents, 1);
  appendPageLinks(matchingStudents);
}
