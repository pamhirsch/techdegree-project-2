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
  const searchInput = document.createElement('input');
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
  const startIndex = (pageNum * numItemsToShow) - numItemsToShow;
  const endIndex = pageNum * numItemsToShow;

  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}

/***
   The function showMatchingStudents accepts a list of matching student
   names, the full student list, and the number of the specific page
   being displayed. These are used to calculate the starting and ending index. It
   cycles through the list of students and adds a CSS style of "block" if
   there is a match.
***/

function showMatchingStudents(nameList, studentList, pageNum ) {
  const startIndex = (pageNum * numItemsToShow) - numItemsToShow;
  const endIndex = pageNum * numItemsToShow;
  hideStudentList(studentList);
  for (let i = 0 + startIndex; i < nameList.length && i < endIndex; i += 1) {
    let noMatchFound = true;
    for (let y = 0; noMatchFound; y += 1) {
      let studentName = studentList[y].querySelector('h3').textContent.toLowerCase();
      if ( studentName === nameList[i]) {
        studentList[y].style.display = 'block';
        noMatchFound = false;
      }
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
  const numPageButtons = Math.ceil(list.length / numItemsToShow);
  const prevDiv = document.querySelector('.page');
  const buttonsDiv = document.createElement('div');
  const buttonsUl = document.createElement('ul');

  // don't show any pagination of the number of page buttons is 1 or less
  if (numPageButtons <= 1) {
    return;
  }

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

    // calls a different function to show the students
    // depending on whether it is the full list or based on a search
      if (instance === 'search-results') {
        showMatchingStudents(list, studentList, pageNumber);
      } else {
        showPage(list, pageNumber);
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
  const errMsgCheck = document.querySelectorAll('div.error-message');
  for (let i = 0; i < errMsgCheck.length; i += 1) {
    if (errMsgCheck[i] != null) {
      errMsgCheck[i].remove();
    }
  }

  let searchName = event.target.value;
  if (searchName.length === 0) {
    // removes existing pagination
    const divPaginationList = document.querySelectorAll('div.pagination');
    if (divPaginationList.length != 0) {
      for (let y = 0; y < divPaginationList.length; y += 1) {
        divPaginationList[y].remove();
      }
    }
    // if there is nothing in the search input field display the first list
    showPage(studentList, 1);
    appendPageLinks(studentList, 'initial');
    return;
  }
  doSearch(searchName, studentList);
});

function doSearch(searchInput, names) {
  const matchingStudents = [];
  for (let i = 0; i < names.length; i += 1) {
    let studentInfo = names[i];
    let studentName = studentInfo.querySelector('h3').textContent.toLowerCase();
    let searchInputName = searchInput.toLowerCase();
    if (searchInput.length != 0 && studentName.includes(searchInputName) ) {
      let matchingStudentInfo = studentInfo;
      matchingStudents.push(studentName);
    }
  }

  if ( matchingStudents.length > 0) {
    // removes existing pagination
    const divPagination = document.querySelector('div.pagination');
    if (divPagination != null) {
      divPagination.remove();
    }
    // hide all students
    hideStudentList(studentList);
  } else {
      const prevHeaderDiv = document.querySelector('div.page-header');
      const noMatchDiv = document.createElement('div');
      const noMatchMsg = document.createElement('h3');
      noMatchDiv.classList.add('error-message');
      prevHeaderDiv.insertAdjacentElement('afterend', noMatchDiv);
      noMatchMsg.innerHTML = `Sorry! No match was found.`;
      noMatchDiv.appendChild(noMatchMsg);
      hideStudentList(studentList);
      return;
  }

  showMatchingStudents(matchingStudents, studentList, 1);
  appendPageLinks(matchingStudents, 'search-results');
}

function hideStudentList(list) {
  for (let i = 0; i < list.length; i += 1) {
    list[i].style.display = 'none';
  }
}
