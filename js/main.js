// Variables Globales
var flashcards = new Flashcards();

// Ready
$(document).ready(function () {
  // Ocultamos card-container
  $('.card-container').hide();

  // Evento: startGame()
  $('#btn-start').click(flashcards.startGame.bind(flashcards));

  // Evento: startDeck()
  $('#decks-table button').click(flashcards.startDeck.bind(flashcards));

  // Evento: pressCorrect()
  $('#btn-correct').click(flashcards.pressCorrect.bind(flashcards));

  // Evento: pressIncorrect()
  $('#btn-incorrect').click(flashcards.pressIncorrect.bind(flashcards));

});