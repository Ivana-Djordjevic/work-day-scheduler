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

function hydrateNotes() {
  const calendarNotes = localStorage.getItem('calendarHours');

  if (calendarNotes === null) {
    localStorage.setItem('calendarHours', JSON.stringify(hourNotes))
  } else {
   
    Object.assign(hourNotes, JSON.parse(calendarNotes));
  }
}

function getNoteByHour(selectedHourNumber) {

  const selectedHourValue = hourNotes[selectedHourNumber];
  return selectedHourValue;
}

function setNoteByHour(selectedHourNumber, userInput) {
  hourNotes[selectedHourNumber] = userInput;   
  localStorage.setItem('calendarHours', JSON.stringify(hourNotes));
}

$().ready(function(){

  hydrateNotes();

  const refreshTimeInfo = setInterval(changeColorBlocks, 1000)

  const currentDate = dayjs().format('YYYY, dddd, MMMM D');
  const header = $('header');
  const dateElement = $('#currentDay');
  
  dateElement.text(currentDate);
  header.append(dateElement);
  
  const textareaEls = $('.description');

  textareaEls.each(function(i) {
    
    const hourNoteKey = $(this).siblings('div').attr('data-value');

    const savedUserInput = getNoteByHour(hourNoteKey) 

    $(this).val(savedUserInput);
  })

  const saveBtns = $('.saveBtn');

  saveBtns.each(function(i){
  
    $(this).on('click', function() {
  
      const selectedHour = $(this).siblings('div').attr('data-value');
      const userInput = $(this).siblings('textarea').val();
    
      setNoteByHour(selectedHour, userInput);
    })
  });
})

function loadInputUser () {

  $('textarea').text = localStorage.getItem(userInput);
}

function userInputVerification (selectedHour, userInput) {
  
  const timeBlock = $('.time-block');
  
  for (let index = 0; index < timeBlock.length - 1; index++) {


    if (userInput.length === 0) {
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
    let percent = Math.round(minutesNumber/60*100)
 
    $(this).css('background', `linear-gradient(to bottom, #8e8e8ed9 ${percent}%, #ddeb6f ${percent+(percent/50)}%)`)  

  } else {
    $(this).addClass('future');
  }
  })
};

const resetbtn = document.querySelector('#reset');

function deleteData() {

  for(let notes in hourNotes) {
    hourNotes[notes] = ''
  }
  const textareaEls = $('.description');

  textareaEls.each(function(i) {
    
    const hourNoteKey = $(this).siblings('div').attr('data-value');

    const savedUserInput = getNoteByHour(hourNoteKey) 

    $(this).val(savedUserInput);
  })
}

resetbtn.addEventListener('click', deleteData);

