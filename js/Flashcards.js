var Flashcards = function (desks) {
  this.selectedSubject; // Tema seleccionado
  this.currentDeck; // Mazo actual
  this.pos; // Posición actual
  this.cardNum; // Número de tarjeta
  this.decks; // Array de arrays[mazo][carta]
}

// Metodo startGame() //
Flashcards.prototype.startGame = function (evt) {
  // Capturar tema
  this.selectedSubject = $('#select-subject').val();

  // Mostrar tabla
  $('#decks-table').show();

  // Rellenar mazos
  this.fillDecks(this.selectedSubject);

  // Contar cartas
  this.countCards();

  // startDeck()
  this.startDeck();
}

// Método: startDeck() //
Flashcards.prototype.startDeck = function (evt) {
  // Inicializar currentDeck
  this.currentDeck = 0;

  // Contar Cartas
  this.countCards();

  // Eliminar clase selectedDeck
  $("#decks-table button").removeClass("selected-deck");

  // Si viene evento, asignar nuevo valor a currentDeck
  if (evt != null) {
    this.currentDeck = $(evt.target).attr("id")[8];
    $(evt.target).addClass("selected-deck");
  }
  else { // Si no viene evento, asignar clase selected-deck al botón 1
    $("#decks-table button").first().addClass("selected-deck");
  }

  // Posición en el mazo
  this.pos = 0;

  // Número de tarjeta
  this.cardNum = 1;

  // Mostrar Front
  this.showFront();

  // Ocultar Botón "Instrucciones"
  $('#btn-instructions').hide();

  if (flashcards.decks[this.currentDeck].length < 1) {
    $('#btn-show-answer').hide();

    // Mazo Vacío
    $('.header-title').text("Mazo Vacío");

    // El Mazo está vacío. Por favor, seleccione otro Mazo.
    $('#question').text("Mazo vacío. Por favor, seleccione otro Mazo");
  }
  else {
    // Mostrar botón "Ver Respuesta"
    $('#btn-show-answer').show();

    // Imprimir pregunta de la primera carta
    $('#question').text(flashcards.decks[this.currentDeck][this.pos].pregunta);
  }
}

// Método: showAnswer() //
Flashcards.prototype.showAnswer = function () {
  // Mostramos el Back de la Tarjeta
  this.showBack();

  // Imprimir la respuesta de la carta que toque
  $('#answer').text(flashcards.decks[this.currentDeck][this.pos].respuesta);

  // Guardamos la carta en un variable temporal
  temporal = flashcards.decks[this.currentDeck][this.pos];
}

// Método: pressCorrect()
Flashcards.prototype.pressCorrect = function () {
  // Si mazo < 4
  if (this.currentDeck < 4) {
    // Eliminar carta del mazo actual
    flashcards.decks[this.currentDeck][this.pos] = "";

    // Guardar carta en la última posición del siguiente mazo
    flashcards.decks[parseInt(this.currentDeck) + 1].push(temporal);
  }

  // Ver carta siguiente
  this.showNext(true);
}

// Método: pressIncorrect()
Flashcards.prototype.pressIncorrect = function () {
  if (this.currentDeck != 0) {
    // Eliminar carta del mazo actual
    flashcards.decks[this.currentDeck][this.pos] = "";

    // Guardar carta en la última posición del mazo anterior
    flashcards.decks[parseInt(this.currentDeck) - 1].push(temporal);
  }
  // Ver carta siguiente
  this.showNext(false);
}

// Método: showNext()
Flashcards.prototype.showNext = function (correct) {
  // Incrementamos cardNum;
  this.cardNum++;

  // Eliminamos los elementos null del array
  flashcards.decks[this.currentDeck] = flashcards.decks[this.currentDeck].filter(Boolean);

  // Contar cartas
  flashcards.countCards();

  if ((!correct && this.currentDeck == 0) || (correct && this.currentDeck == 4))
    this.pos++; // Sumamos una posición

  // Mostrar Front de la tarjeta
  this.showFront();

  // Si posición es menor o igual que length del mazo, imprimir pregunta de la siguiente carta
  console.log(this.pos + " < " + flashcards.decks[this.currentDeck].length);
  if (this.pos < flashcards.decks[this.currentDeck].length) {

    // Imprimir pregunta de la siguiente carta
    $('#question').text(flashcards.decks[this.currentDeck][this.pos].pregunta);

    // Mostramos el botón "Ver respuesta"
    $('#btn-show-answer').show();
  }
  else { // En caso contrario, mostramos el mensaje "Caja Terminada. Seleccione otra caja"
    // Imprimir pregunta de la siguiente carta
    $('#question').text("Mazo Terminado. Por favor, seleccione otro mazo");

    // Ocultar botón "Ver respuesta"
    $('#btn-show-answer').hide();

    // Mazo Terminado
    $('.header-title').text("Mazo Terminado");
  }
}

// Método: showFront() //
Flashcards.prototype.showFront = function () {
  // Ocultamos el botón "Empezar"
  $('#btn-start').hide();

  // Ocultamos el botón "Correcta"
  $('#btn-correct').hide();

  // Ocultamos el botón "Incorrecta"
  $('#btn-incorrect').hide();

  // Ocultamos la caja de Respuesta
  $('#answer').hide();

  // Mostramos la caja de Pregunta
  $('#question').show();

  // Mostramos el botón "Ver Respuesta"
  $('#btn-show-answer').show();

  // Mostramos el encabezado "Pregunta X"
  $('.header-title').text("Pregunta " + this.cardNum);
}

// Método: showBack() //
Flashcards.prototype.showBack = function () {
  // Escondemos la imagen de la flecha
  $('#circle').hide();

  // Escondemos el botón "Ver Respuesta"
  $('#btn-show-answer').hide();

  // Mostramos el botón "Correcta"
  $('#btn-correct').show();

  // Mostramos el botón "Incorrecta"
  $('#btn-incorrect').show();

  // Ocultamos la caja de Pregunta
  $('#question').hide();

  // Mostramos la caja de Respuesta
  $('#answer').show();

  // Mostramos el encabezado "Respuesta X"
  $('.header-title').text("Respuesta " + this.cardNum);
}

// Método fillDecks()
Flashcards.prototype.fillDecks = function (selectedSubject) {
  var deck = [];
  var selectedCards = [];
  var pos;
  var numTarjetas = $("#select-num-cards").val();
  if (numTarjetas > subjects[selectedSubject].length)
    numTarjetas = subjects[selectedSubject].length;
  for (var i = 0; i < numTarjetas; i++) {
    do {
      pos = Math.floor(Math.random() * subjects[selectedSubject].length);
    }
    while (selectedCards.includes(pos));
    selectedCards.push(pos);
    deck.push(subjects[selectedSubject][pos]);
  }
  this.decks = [
    [] = deck,
    [],
    [],
    [],
    []
  ];
}

// Método: countCards() //
Flashcards.prototype.countCards = function () {
  $('#box0').text("Tarjetas: " + this.decks[0].length);
  $('#box1').text("Tarjetas: " + this.decks[1].length);
  $('#box2').text("Tarjetas: " + this.decks[2].length);
  $('#box3').text("Tarjetas: " + this.decks[3].length);
  $('#box4').text("Tarjetas: " + this.decks[4].length);
};