import React from "react";
import classes from "./order.css";

const Order = (props) => {
  const ingredients = [];

  //firstway : inside burger component
  //SecondWay: we should convert Ingredients object to Ingredients array
  for (const ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName],
    });
  }

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredients.map((ig) => {
          return (
            <span
              style={{
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px",
                textTransform: "capitalize",
              }}
              key={ig.name}
            >
              {ig.name} ({ig.amount})
            </span>
          );
        })}
      </p>
      <p>
        Price:<strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
