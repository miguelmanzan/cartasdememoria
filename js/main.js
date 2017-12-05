// Variables Globales
var flashcards = new Flashcards();
console.log("Iniciando");

// Ready
$(document).ready(function () {
  // Evento: startGame()
  $('#btn-start').click(flashcards.startGame.bind(flashcards));

  // Evento: startDeck()
  $('#decks-table button').click(flashcards.startDeck.bind(flashcards));

  // Evento: pressCorrect()
  $('#btn-correct').click(flashcards.pressCorrect.bind(flashcards));

  // Evento: pressIncorrect()
  $('#btn-incorrect').click(flashcards.pressIncorrect.bind(flashcards));

  //Evento de rotación
  $(".flip").click(function(){
    $('.card').toggleClass('flipped');
  });
});