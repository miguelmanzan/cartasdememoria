var Flashcards = function (desks) {
  this.selectedSubject; // Tema seleccionado
  this.currentDeck; // Mazo actual
  this.pos; // Posición actual
  this.cardNum; // Número de tarjeta
  this.decks; // Array de arrays[mazo][carta]
}

// Metodo startGame() //
Flashcards.prototype.startGame = function (evt) {
  // Inicialización
  // this.cardNum = 1;
  // this.pos = 0;

  // Capturar tema
  this.selectedSubject = $('#select-subject').val();

  // Rellenar mazos
  this.fillDecks(this.selectedSubject);

  // startDeck()
  this.startDeck();
}

// Método: startDeck() //
Flashcards.prototype.startDeck = function (evt) {
  // Inicialización
  this.cardNum = 1;
  this.pos = 0;

  // Contar Cartas
  this.countCards();

  // Eliminar clase selectedDeck
  $("#decks-table button").removeClass("selected-deck");

  // Si viene evento, capturar el valor para currentDeck
  if (evt != null) {
    this.currentDeck = $(evt.target).attr("id")[8];
    $(evt.target).addClass("selected-deck");
  }
  else { // Si no viene evento, currentDeck = 0
    this.currentDeck = 0;
    $("#decks-table button").first().addClass("selected-deck");
  }

  // Si mazo seleccionado no tiene tarjetas - showEmpty()
  if (flashcards.decks[this.currentDeck].length < 1) {

    this.showEmpty();
  }
  else {
    // Mostrar Carta
    this.showCart();

    // Ocultar botón "Ver Respuesta"
    $('#btn-show-answer').hide();

    // Imprimir pregunta de la primera carta
    $('#question').text(flashcards.decks[this.currentDeck][this.pos].pregunta);

    // Imprimir respuesta de la primera carta
    $('#answer').text(flashcards.decks[this.currentDeck][this.pos].respuesta);
  }
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
  // Incrementar cardNum;
  this.cardNum++;

  // Eliminar elementos null del array
  flashcards.decks[this.currentDeck] = flashcards.decks[this.currentDeck].filter(Boolean);

  // Condicional: Incorrecta y en Mazo 0  | Correcta y en Mazo 4
  if ((!correct && this.currentDeck == 0) || (correct && this.currentDeck == 4)){
    this.pos++; // Sumamos una posición
  }

  // Si pos <= length del mazo -> showCart()
  console.log(this.pos + " < " + flashcards.decks[this.currentDeck].length);
  if (this.pos < flashcards.decks[this.currentDeck].length) {
    // Mostrar Tarjeta
    this.showCart();
  }
  else { // En caso contrario -> showEmpty
    this.showEmpty();
  }

  // Contar cartas
  flashcards.countCards();
}

// Método: showEmpty() //
Flashcards.prototype.showEmpty = function () {
  // Ocultamos el botón "Correcta"
  $('#btn-correct').hide();

  // Mostramos el botón "Incorrecta"
  $('#btn-incorrect').hide();

  // Ocultar card-container
  $('.card-container').hide();

  // Mostrar option-container
  $('.option-container').show();

  $('.option-container').text("Mazo Terminado o Vacío. Por favor, seleccione otro mazo");

  // Mazo Terminado
  $('.header-title').text("// Mazo Terminado //");

  // Mostrar tabla
  $('#decks-table').show();
}

// Método: showCart() //
Flashcards.prototype.showCart = function () {
  // Guardamos la carta en un variable temporal
  temporal = flashcards.decks[this.currentDeck][this.pos];

  // Mostramos el botón "Correcta"
  $('#btn-correct').show();

  // Mostramos el botón "Incorrecta"
  $('#btn-incorrect').show();

  // Contar cartas
  this.countCards();

  // Mostrar card-container
  $('.card-container').show();

  // Mostrar tabla
  $('#decks-table').hide();

  // Imprimir pregunta de la siguiente carta
  $('#question').text(flashcards.decks[this.currentDeck][this.pos].pregunta);

  // Imprimir la respuesta de la carta que toque
  $('#answer').text(flashcards.decks[this.currentDeck][this.pos].respuesta);

  // Ocultamos el botón "Empezar"
  $('#btn-start').hide();

  // Ocultamos la caja option-container
  $('.option-container').hide();

  // Mostramos el encabezado "Pregunta X"
  $('.header-title').text("// Pregunta " + this.cardNum + " //");
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