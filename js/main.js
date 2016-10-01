$(document).ready(function(){
  var items = [];
  var favItems = [];
  var articleUl = $('ul[class="list-group"]');
  var elementToAddFavorite = "";
  var elementToRemFavorite = "";
  function getArticle(){
    return {
      id: items.length + 1 + "-item", // Agregando un ID único al elemento creado en el Array
      name: $('#articleName').val(),
      desc: $('#articleDescription').val(),
      categ: $('#articleCategory').val(),
      img: $('#articleImage').val()
    }
  };
  function articleHTMLStructure(item){
    return '<img src="' + item.img + '"/>' + '<div class="articleItem"> <h2>' + item.name + '</h2>' + '<p>' + item.desc + '</p>' + '<p>' + item.categ + '</p> </div> <div class="fav"> <i class="glyphicon glyphicon-star"> </i> </div>';
  };
  function addClassErrorInput(){
    $('#articleName').css('border', "1px solid red");
    $('#articleDescription').css('border', "1px solid red");
  };
  function add(alfinal) {
    var item = getArticle();
    items.push(item);
    var li = $('<li id="' + item.id + '" class="list-group-item"/>');
    li.html(articleHTMLStructure(item));
    if (alfinal){
      articleUl.append($(li).hide().fadeIn('slow'));
    } else {
      articleUl.prepend($(li).hide().fadeIn('slow'));;
    }
  };
  function convertGrid(grid, list) {
    var listElement = articleUl[0].children;
    for (var i=0; i<listElement.length; i++) {
      if(list) {
        $(listElement[i]).removeClass("col-md-4");
      } else if (grid) {
        $(listElement[i]).addClass("col-md-4");
      } {}
    };
  };
  function removeList(){
    $('ul[class="list-group"] li').remove();
    items = [];
  };
  function clearInputs(){
    $('#articleName').val("");
    $('#articleDescription').val("");
    $('#articleImage').val("");
  };
  $('#btnAddFirst').on('click', function(event){
    if ($('#articleName').val() && $('#articleDescription').val()){
      add(false);
      clearInputs();
    } else {
      addClassErrorInput();
    }
  });
  $('#btnAddLast').on('click', function(event){
    if ($('#articleName').val() && $('#articleDescription').val()){
      add(true);
      clearInputs();
    } else {
      addClassErrorInput();
    }
  });
  $('#btnGrid').on('click', function(event){
    convertGrid(true, false);
  });
  $('#btnList').on('click', function(event){
    convertGrid(false, true);
  });
  $('#btnRemove').on('click', function(event){
    removeList();
  });
  function articleFavHTMLStructure(fav){
    return '<img src="' + fav.img + '"/>' + '<div class="articleItem"> <h2>' + fav.name + '</h2>' + '<p>' + fav.desc + '</p>' + '<p>' + fav.categ + '</p> </div> <div class="rem-fav"> <i class="glyphicon glyphicon-remove"> </i> </div>';
  };
  $(document).on('click', '.fav', function(event){ //Evento de clic para el botón estrella
    $(this).children('i').css('color', 'yellow');
    elementToAddFavorite = $(this).closest('li').attr('id');
    addFavoriteSection();
  });
  function addFavoriteSection(){  //Prueba de agregar a la lista de favoritos
    debugger;
    items.forEach(pruebaDeForEach);
  };
  function pruebaDeForEach(item, index){
    if (item.id === elementToAddFavorite){
      favItems.push(item);
      var fav = $(favItems).get(-1);
      var favElement = $('<li class="list-group-item"/>');
      favElement.html(articleFavHTMLStructure(fav));
      favElement.hide().slideUp('slow', function(){
        $('.favoriteArticle').append(favElement);
      })
      favElement.slideDown();
    }
  };
  $(document).on('click', '.rem-fav', function(event){  //Evento de clic para el botón remove
    $(this).children('i').css('color', 'red');
    elementToRemFavorite = $(this).closest('li').index();
    removeFavoriteSection();
    $($(this).closest('li')).slideUp('1000', function(){
      $(this).closest('li').remove();
    });

  });
  function removeFavoriteSection(){ //Prueba de eliminar de la lista de favoritos
    for (var j=0; j< favItems.length; j++){
      if (favItems[j] == favItems[elementToRemFavorite]){
        favItems.splice(favItems[j],1);
      }
    }
  };
});
