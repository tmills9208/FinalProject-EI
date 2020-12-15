
function getJSON(url){
  return fetch(url)
    .then(response => {
      return response.json().then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
    });
}

function getRandomDish() {
  return getJSON('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((data) => {
      return data.meals[0];
    })
    .catch((err) => {
      console.log(err);
    });
}

function getOneDish(id){
  return getJSON(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((data) => {
      return data.meals[0];
    })
    .catch((err) => {
      console.log(err);
    });
}

function getDishCategories(){
  return getJSON(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then((data) => {
      return data.categories;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getDishesFromCategory(category){
  return getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`)
    .then((data) => {
      return data.meals;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// this works, do not edit.
// function testPage(){
//   var json;
//   getJSON('https://www.themealdb.com/api/json/v1/1/random.php')
//     .then((data) => json = data)
//     .then(() => {
//       var meal = json.meals[0];
//       console.log(meal);
//       console.log(meal.strMeal);
//       console.log(meal.strMealThumb);
//       console.log(meal.strCategory);
//       console.log(meal.strArea);
//       sessionStorage.setItem('name', meal.strMeal);
//       sessionStorage.setItem('imageURL', meal.strMealThumb);
//       sessionStorage.setItem('category', meal.strCategory);
//       sessionStorage.setItem('area', meal.strArea);
//     })
//     .then(() => {
//       console.log(`name: ${sessionStorage.getItem('name')}`);
//       console.log(`imageURL: ${sessionStorage.getItem('imageURL')}`);
//       console.log(`category: ${sessionStorage.getItem('category')}`);
//       console.log(`area: ${sessionStorage.getItem('area')}`);
//     });
// }

function testAPICalls(){
  getRandomDish()
  .then((data) => {
    console.log('testing random dish...');
    console.log(data);

  });

  getOneDish(52772)
  .then((data) => {
    console.log('testing dish by id...');
    console.log(data);
  });

  getDishCategories()
  .then((data) => {
    console.log('testing dish categories...');
    console.log(data);
  });

  getDishesFromCategory('Beef')
  .then((data) => {
    console.log('testing dishes by category...');
    console.log(data);
  });
}

$(document).ready(function(){
  testAPICalls();
});
