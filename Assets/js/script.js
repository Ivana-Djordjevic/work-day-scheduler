// code to display the current date in the header of the page.
const currentDate = dayjs().format('YYYY, dddd, MMMM D');
const header = $('header');
const dateElement = $('#currentDay');

dateElement.text(currentDate);
header.append(dateElement);

const saveBtns = $('.saveBtn');

saveBtns.each(function(i){

  $(this).on('click', function() {

    const selectedHour = $(this).closest('div').text();
    const userInput = $(this).siblings('textarea').val();

    localStorage.setItem(selectedHour, userInput);

    // so selectedHour can be access in the dynamicColorBlockChanges()
    dynamicColorBlockChanges(selectedHour, userInput);
    loadInputUser(selectedHour, userInput);
    userInputVerification(selectedHour, userInput)


  })
});


function loadInputUser (selectedHour, userInput) {

  console.log(selectedHour, userInput, 'please work '); //works 

  $('textarea').text = localStorage.getItem(userInput);

  console.log('please work 2.0' + userInput, selectedHour); //works

}

  function userInputVerification (selectedHour, userInput) {
    
    console.log('under the userInputVerification these do not come thru' + selectedHour, userInput); // nope

    const timeBlock = $('.time-block');
    
    for (let index = 0; index < timeBlock.length - 1; index++) {

      if (userInput === []) {
        loadInputUser();

      } else {
        (userInput === null)
          return;
        }
    }
  }

function dynamicColorBlockChanges (selectedHour) {

  console.log('this is suppose to show the key(selectedHour): '+ selectedHour) // it works after i save but not before
  
  let now = dayjs().format('h');
  console.log('time maintenant' + now); // works 

  const textareaEl = $('.description');

  if (selectedHour < now) {
    textareaEl.addClass('past');

  } else if (selectedHour === now) {
    textareaEl.addClass('present');

  } else {
    textareaEl.addClass('future');
  }
  };

  dynamicColorBlockChanges();
  userInputVerification();
