const food = require("./foodData");

function sumTotal(...args) {
  let allFood = [];
  [...args].forEach(item => (allFood = [...item, ...allFood]));

  const total = allFood.reduce(
    (accumulator, currentValue) => {
      let obj = {};
      for (key in accumulator) {
        const value = parseFloat(
          (accumulator[key] + currentValue[key]).toFixed(2)
        );
        obj = { ...obj, [key]: value };
      }

      return obj;
    },
    {
      cal: 0,
      carbs: 0,
      fat: 0,
      protein: 0
    }
  );

  const totalMacros = total.carbs + total.fat + total.protein;
  let percentages = {};

  for (key in total) {
    if (key !== "cal") {
      const value = `${parseFloat(
        ((total[key] * 100) / totalMacros).toFixed(2)
      )}%`;
      percentages = { ...percentages, [`${key}Percent`]: value };
    }
  }

  return { ...total, ...percentages };
}

console.log(sumTotal(food.meats));

/*
  goal meal plan
  cal: 1886.80
  -- total grams --
  carbs: 178 grams
  fat: 35.6 grams
  protein: 213.6 grams
  -- percentages --
  carbs: 41.7%
  fat: 8.3%
  protein: 50%
*/

/*
  first select a meat
  pick 4 veggies
  pick 2 fruits
  - if room for carbs pick grains
  1 dairy

  1st max out protein
  2nd max out carbs and subtract from protein choices as needed
  3rd check fat level
*/

function constructMealPlan(foodData) {
  const meat = selectRandomItems(foodData.meats, 1);
  const veggies = selectRandomItems(foodData.vegetables, 4);
  const fruits = selectRandomItems(foodData.fruits, 2);
  const dairy = selectRandomItems(foodData.dairy, 1);

  // console.log(meat);
  // console.log(veggies);
  // console.log(fruits);
  // console.log(dairy);
}

function selectRandomItems(arr, numOfItems) {
  let allItems = [...arr];
  let items = [];

  while (items.length < numOfItems) {
    const i = randomIndex(allItems);
    items.push(allItems[i]);
    allItems.splice(i, 1);
  }

  return items;
}

function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

constructMealPlan(food);
