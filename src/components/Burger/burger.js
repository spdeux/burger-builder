import React from "react";
import classes from "./burger.css";
import Ingrediant from "./Ingrediant/ingrediant";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <Ingrediant key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <Ingrediant type="bread-top" />
      {transformedIngredients}
      <Ingrediant type="bread-bottom" />
    </div>
  );
};

export default Burger;
