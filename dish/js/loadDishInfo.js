
function populateView(data){
  // check and arrange if dish is saved
  $("#idMeal").val(data.idMeal);
  //localStorage.clear();
  if (localStorage.getItem('savedIds') == null){
    localStorage.setItem('savedIds', JSON.stringify([1]));
  }
  
  var savedIdIndex = JSON.parse(localStorage.getItem('savedIds')).indexOf(parseInt(data.idMeal));
  if (savedIdIndex >= 0) {
    $('#btnSave').html('Saved');
    $("#isSaved").val('true');
  }
  else {
    $('#btnSave').html('Not saved');
    $("#isSaved").val('false');
  }

  // Arrange
  $("#dishName").text(data.strMeal);
  $("#dishImg").attr('src', data.strMealThumb);
  $("#dishInstructions").text(data.strInstructions);
}

$(window).on('load', function(){
  // load dish info
  var query = new URLSearchParams(window.location.search);
  if (!query.has('id')) {
    getRandomDish()
    .then((data) => {
      populateView(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else {
    getOneDish(query.get('id'))
    .then((data) => {
      populateView(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
});

$(document).ready(function(){
  $('#btnSave').on('click', function(e){
    e.preventDefault();
    if ($('#isSaved').val() != 'true'){
      // if not saved
      var savedIds = JSON.parse(localStorage.getItem('savedIds'));
      // but if item also doesnt exist
      if (savedIds == null) {
        savedIds = [];
      }
      
      savedIds.push(parseInt($('#idMeal').val()));
      localStorage.setItem('savedIds', JSON.stringify(savedIds));
      $('#isSaved').val('true');
      $('#btnSave').html('Saved');
    }
    else {
      // if saved already
      var savedIds = JSON.parse(localStorage.getItem('savedIds'));
      var id = savedIds.indexOf(parseInt($('#idMeal').val()));
      if (savedIds != null && (id != null || id >= 0)){
        savedIds.splice(id, 1);
        localStorage.setItem('savedIds', JSON.stringify(savedIds));
        if (savedIds.indexOf(parseInt($('#idMeal').val())) < 0) {
          $('#isSaved').val('false');
          $('#btnSave').html('Not Saved');
        }
      }
    }
  });
})
