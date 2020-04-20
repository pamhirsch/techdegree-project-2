/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
   Global variables that describe the initial student List
   and the number of items to show on a page.
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

/***
   The function showPage accepts a list of students and
   the number of the specific page being displayed. These
   are used to calculate the starting and ending index. It
   cycles through the list of students and adds a CSS style
   of either "block" or "display" depending on the index
   of the list item.
***/

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

/***
   The function showMatchingStudents accepts a list of students and
   the number of the specific page being displayed. These
   are used to calculate the starting and ending index. It
   cycles through the list of students and adds a new list item
   for each student and a CSS style of either "block" or "display"
   depending on the index of the list item.
***/

function showMatchingStudents(list, pageNum ) {
  let startIndex = (pageNum * numItemsToShow) - numItemsToShow;
  let endIndex = pageNum * numItemsToShow;

  let studentUl = document.querySelector('ul.student-list');
  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      studentUl.appendChild(list[i]);
      list[i].style.display = 'block';
    } else {
      studentUl.appendChild(list[i]);
      list[i].style.display = 'none';
    }
  }
}

// show the first set of students
showPage(studentList, 1);

/***
   The appendPageLinks function calculates the number of number
   of pages needed by dividing the length of the student list
   by the number of items to show (set at the beginning in a global
   variable.) It then creates button elements based on the number
   of pages to show and then adds a listener event to each button
   to affect the styling of the button - either active or not. It
   also calls the showPage function, passing the student list and
   the page number.
***/

function appendPageLinks(list, instance) {
  let numPageButtons = Math.ceil(list.length / numItemsToShow);
  let prevDiv = document.querySelector('.page');
  let buttonsDiv = document.createElement('div');
  let buttonsUl = document.createElement('ul');

  buttonsDiv.classList.add('pagination');
  prevDiv.after(buttonsDiv);
  buttonsDiv.appendChild(buttonsUl);


  if (numPageButtons <= 1) {
    return;
  }

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

// calls a different function to show the students
// depending on whether it is the full list or based on a search
      if (instance === 'search-results') {
        showMatchingStudents(list,pageNumber);
      } else {
        showPage(list,pageNumber);
      }
    });
  }
}

// calls the appendPageLinks to display the pagination buttons
appendPageLinks(studentList, "initial");

/***
   The following code handles all of the search functionality,
   other than the display of the search input field and button
   which is done at the beginging execution of this program.
***/

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

// create event location for the submit listener
const search = document.querySelector('div.student-search input');

/***
   Listens for any keyed input in the search input field, stores the value
   entered for searching and calls the doSearch function.
***/

search.addEventListener('keyup', (event) => {
  let errMsgCheck = document.querySelector('div.error-message');
  if (errMsgCheck != null) {
    errMsgCheck.remove();
  }
  let searchName = event.target.value;
  doSearch(searchName, studentList);
});

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

// removes existing pagination
  let divPagination = document.querySelector('div.pagination');
  if (divPagination != null) {
    divPagination.remove();
    hideStudentList(studentList);
  }

// outputs a message if there are no matching students
  if (matchingStudents.length < 1) {
    let prevDiv = document.querySelector('div.page-header');
    let noMatchDiv = document.createElement('div');
    let noMatchMsg = document.createElement('h3');
    noMatchDiv.classList.add('error-message');
    prevDiv.insertAdjacentElement('afterend', noMatchDiv);
    noMatchMsg.innerHTML = `Sorry! No match was found.`;
    noMatchDiv.appendChild(noMatchMsg);
    return;
  }

  showMatchingStudents(matchingStudents, 1);
  appendPageLinks(matchingStudents, 'search-results');
}

function hideStudentList(list) {
  for (let i = 0; i < list.length; i += 1) {
    list[i].style.display = 'none';
  }
}
