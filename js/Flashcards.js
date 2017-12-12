var Flashcards = function (desks) {
  this.selectedSubject; // Tema seleccionado
  this.currentDeck; // Mazo actual
  this.pos; // Posición actual
  this.cardNum; // Número de tarjeta
  this.decks; // Array de arrays[mazo][carta]
  this.frontHeight; // Altura front
  this.backHeight; // Altura back
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
  $('.flip').hide();

  // Mostrar option-container
  $('.option-container').show();

  $('.option-container').html(' Mazo Terminado o Vacío. Por favor, seleccione otro mazo');

  // Mazo Terminado
  $('.header-title').html('<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>' + ' Mazo Terminado');

  // Mostrar tabla
  $('#decks-table').show();
}

// Método: showCart() //
Flashcards.prototype.showCart = function () {

  // Asegurar que aparezca el front
  $('.card').removeClass('flipped');

  // Guardar carta en temporal
  temporal = flashcards.decks[this.currentDeck][this.pos];

  // Mostrar botón "Correcta"
  $('#btn-correct').show();

  // Mostrar botón "Incorrecta"
  $('#btn-incorrect').show();

  // Contar cartas
  this.countCards();

  // Mostrar card-container
  $('.flip').show();

  // Ocultar tabla
  $('#decks-table').hide();

  // Imprimir pregunta
  $('.front').text(flashcards.decks[this.currentDeck][this.pos].pregunta);

  // Imprimir respuesta
  $('.back').text(flashcards.decks[this.currentDeck][this.pos].respuesta);

  // Resetear altura a auto
  $('.front').height("auto");
  $('.back').height("auto");
  $('.flip').height("auto");

  // Ocultar botón "Empezar"
  $('#btn-start').hide();

  // Ocultar option-container
  $('.option-container').hide();

  // Mostrar encabezado "Pregunta X"
  $('.header-title').html('<i class="fa fa-question-circle fa-spin" aria-hidden="true"></i>' + ' Pregunta ' + this.cardNum);

  // Asignamos altura
  this.frontHeight = $('.front').outerHeight();
  this.backHeight = $('.back').outerHeight();

  // Asignamos a
  if (this.frontHeight >= this.backHeight) {
    $('.front').height(this.frontHeight);
    $('.back').height(this.frontHeight);
    $('.flip').height(this.frontHeight);
  }
  else {
    $('.front').height(this.backHeight);
    $('.back').height(this.backHeight);
    $('.flip').height(this.backHeight);
  }
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
  $('#box0').text(" Tarjetas: " + this.decks[0].length);
  $('#box1').text(" Tarjetas: " + this.decks[1].length);
  $('#box2').text(" Tarjetas: " + this.decks[2].length);
  $('#box3').text(" Tarjetas: " + this.decks[3].length);
  $('#box4').text(" Tarjetas: " + this.decks[4].length);
};