import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../products/Product.module.css"

export const Product = ({ product }) => {
  const [habilitado, setHabilitado] = useState({
    productId: product.id,
    changes: [{ name: "availability", data: product.availability }],
  });


  const handleClick = () => {
    if (habilitado.changes[0].data) {
      setHabilitado({
        ...habilitado,
        changes: [
          {
            ...habilitado.changes[0],
            data: false,
          },
        ],
      });
      habilitado.changes[0].data = false
      axios.put(
        "https://servidor-vinos.onrender.com/product/putProduct",
        habilitado
      );
    } else {
      setHabilitado({
        ...habilitado,
        changes: [
          {
            ...habilitado.changes[0],
            data: true,
          },
        ],
      });
      habilitado.changes[0].data = true
      axios.put(
        "https://servidor-vinos.onrender.com/product/putProduct",
        habilitado
      );
    }
  };

  return (
    <div className={styles['product-container']}>
      {product.name ? (
        <div className={styles['product-details']}>
          <img src={product.images[0]} alt="" />
          <h2>{product.name}</h2>
          <button
            className={habilitado.changes[0].data ? styles['enabled-button'] : styles['disabled-button']}
            onClick={handleClick}
          >
            {habilitado.changes[0].data + ""}
          </button>
          <Link to={`/editar/${product.id}`} className={styles['product-edit-button']}>
            <button className={styles['edit-button']}>Editar</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
