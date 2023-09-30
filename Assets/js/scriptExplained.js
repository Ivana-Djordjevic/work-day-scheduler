const hourNotes = {
    9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: '',
  }
// #region
// when the page finishes loading, hydrateNotes() is executed. 
// This ensures that any existing calendar notes are loaded from the browser's local storage --
// before any other actions take place on the page
// #endregion
  function hydrateNotes() {
//  assigns a variable that retrieves data from the browser's local storage with the key 'calendarHours'
    const calendarNotes = localStorage.getItem('calendarHours');
  
    if (calendarNotes === null) {
      // stores the 'hournotes' data under the key 'calendarHours'
      localStorage.setItem('calendarHours', JSON.stringify(hourNotes))
    } else {
      // JSON.stringify used for data serialization
      // the browser local storage only accepts data in strings
      // .: JS must turn an object into a JSON string to abide by the rules
      // likewise JSON.parse converts the JSON string from the browser to a JS object.
      Object.assign(hourNotes, JSON.parse(calendarNotes));
      // Object.assign() accepts two types of arguments
      // Object.assign(target, ...sources) 
      // it's used to merge the properties and values from the parsed object into the 'hourNotes' object
      // meaning it will merge the corresponding saved notes with the associated hour
      // ensures that 'hournotes' object is updated with previously stored notes from local storage
    }
  }
  
  // retrieves the note associated with a specific hour.
  // reads and returns the note associated with the provided hour.
  function getNoteByHour(selectedHourNumber) {
  
    const selectedHourValue = hourNotes[selectedHourNumber];
   return selectedHourValue;
  }
  
  // sets or updates the note associated with a specific hour.
  // updates or creates a note for the provided hour and 
  // stores the updated hourNotes object in the localStorage.
  function setNoteByHour(selectedHourNumber, userInput) {
    hourNotes[selectedHourNumber] = userInput;   
    localStorage.setItem('calendarHours', JSON.stringify(hourNotes));
  }
  
  // $().read(function(){}) = jQuery function that waits for DOM to be fully loaded
  // It retrieves and displays current date information, 
  // retrieves saved notes from the localStorage,
  // updates the notes on the page,
  // allows users to save new notes using save buttons associated with specific hours. 
  $().ready(function(){
  
    hydrateNotes();
  
    // sets up an interval that calls changeColorBlocks() every second 
    // this is to change the colors
    const refreshTimeInfo = setInterval(changeColorBlocks, 1000)
  
    // the next couple of lines set up the current date in the header
    const currentDate = dayjs().format('YYYY, dddd, MMMM D');
    const header = $('header');
    const dateElement = $('#currentDay');
    
    dateElement.text(currentDate);
    header.append(dateElement);
  
    const textareaEls = $('.description');
  
    // iterates over the elements with the class 'description'
    textareaEls.each(function(i) {

    // retrieves an attribute naled 'data-value' which corresponds to the hour
    // and stores it in 'hourNoteKey'
      const hourNoteKey = $(this).siblings('div').attr('data-value');
    // Calls the getNoteByHour(hourNoteKey) function to retrieve the user's saved input associated with the specific hour.
      const savedUserInput = getNoteByHour(hourNoteKey) 
    // Sets the value of the current textarea to the retrieved user input.
      $(this).val(savedUserInput);
    })
  
    const saveBtns = $('.saveBtn');
  
    // itereates through each saveBtn and adds a click event handler
    // calls the setNoteByHour(selectedHour, userInput) function to save user input for the specific hour
    saveBtns.each(function(i){
    
      $(this).on('click', function() {
    
        const selectedHour = $(this).siblings('div').attr('data-value');
        const userInput = $(this).siblings('textarea').val();
      
        setNoteByHour(selectedHour, userInput);
      })
    });
  })
  
  // the userInput data stored in the localStorage will:
  // be loaded into the <textarea> elements on the page if 
  // the userinput is not null 
  function loadInputUser () {
  
    $('textarea').text = localStorage.getItem(userInput);
  }
  
    function userInputVerification (selectedHour, userInput) {
      
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
  
  function changeColorBlocks () {
    
    const now = dayjs().format('H');
    const nowNumber = Number(now)
  
    const minutes = dayjs().format('m');
    const minutesNumber = Number(minutes);
    
    const textareaEls = $('.description');
  
    textareaEls.each(function(){
  
     const hourNoteKey = $(this).siblings('div').attr('data-value');
     const selectedHourNumber = Number(hourNoteKey)
  
    if (selectedHourNumber < nowNumber) {
      $(this).addClass('past');
  
    } else if (selectedHourNumber === nowNumber) {
      $(this).addClass('present');
      // $(this).attr('opacity', minutesNumber/60) // not working 
  
    } else {
      $(this).addClass('future');
    }
    })
    };