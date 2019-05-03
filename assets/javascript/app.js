$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
  
    questions: {
      q1: 'Normal adult dogs have how many teeth?',
      q2: 'What is a dog’s most highly developed sense?',
      q3: 'What is the most popular breed of dog, according to the American Kennel Club’s registrations??',
      q4: 'Which dog yodels instead of barks?',
      q5: "The first dogs registered in the American Kennel Club belonged to what group?",
      q6: 'Which dog breed has a black tongue?',
      q7: "Puppies are delivered how many weeks after conception?"
    },
    options: {
      q1: ['24', '38', '42', '32'],
      q2: ['Taste', 'Smell', 'Sight', 'Touch'],
      q3: ['Golden retriever', 'Beagle', 'German Shepherd', 'Labrador'],
      q4: ['Komondor', 'Otterhound', 'Basenji', 'Basset hound'],
      q5: ['Herding','Sporting','Working','Hound'],
      q6: ['Husky','Labrador','Weimaraner','Chow chow'],
      q7: ['36', '22', '9','16']
    },
    answers: {
      q1: '42',
      q2: 'Smell',
      q3: 'Labrador',
      q4: 'Basenji',
      q5: 'Sporting',
      q6: 'Chow chow',
      q7: '9'
    },
   
    startGame: function(){
    
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
 
      trivia.nextQuestion();
      
    },

    nextQuestion : function(){
      
      trivia.timer = 10;
      $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
       $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
 
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
       else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
         $('#game').hide();
        
  
        $('#start').show();
      }
      
    },
 
    guessChecker : function() {
      
      var resultId;
  
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
       
      if($(this).text() === currentAnswer){
         $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
         $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      
       trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();

      trivia.nextQuestion();
       
    }
  
  }