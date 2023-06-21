import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "./product";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";
import styles from "./Products.module.css"

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://servidor-vinos.onrender.com/product/all?paginas=${pages}&search=${search}`
      )
      .then(({ data }) => {
        setProducts(data);
        console.log(data);
      });
  }, [pages, search]);


  return (
      
    <div className={styles.container}>
      {products.length ? (
        <div className={styles.productList}>
          {products.map((product) => {
            return <Product product={product} />;
          })}
        </div>
      ) : (
        <h1 className={styles.loading}>Cargando</h1>
      )}
      <div className={styles.pagination}>
        <button
          onClick={() => handlePreviousPage(pages, setPages)}
          disabled={pages === 1}
          className={styles.pageButton}
        >
          Anterior
        </button>
        <button
          onClick={() => handleNextPage(pages, setPages)}
          disabled={!products.length || products.length / 10 < 1}
          className={styles.pageButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
