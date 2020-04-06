/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/

const studentList = document.getElementsByClassName('student-item');
const numItemsToShow = 10;

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
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
  const numPageButtons = parseInt(list.length / numItemsToShow) + 1;
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
      showPage(studentList,pageNumber);
    });
  }
}

appendPageLinks(studentList);
