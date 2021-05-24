import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import ProductSummaryCard from "./product/ProductSummaryCard.js";

function App() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(`/api/products?q=Practical&limit=10`)
      .then((r) => r.json())
      .then(
        (result) => {
          console.log("result", result);
          setProductList(result);
        },
        (error) => {
          console.log("error", error);
        }
      );
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <label>
          Search
          <input value="Practical" type="text" />
        </label>
      </div>
      <div className={styles.productList}>
        {productList.map((product) => (
          <ProductSummaryCard
            className={styles.productCard}
            name={product.name}
            shortDescription={product.short_desc}
            thumbnailImage={product.images.thumbnail}
            price={"$" + product.price.usd}
            highlightable
          />
        ))}
      </div>
    </div>
  );
}

export default App;
