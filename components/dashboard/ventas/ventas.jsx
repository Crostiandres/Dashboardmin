import axios from "axios";
import { useEffect, useState } from "react";
import { Venta } from "./venta";
import styles from "./Ventas.module.css"


export const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  useEffect(() => {
    axios
      .get("https://servidor-vinos.onrender.com/buy/all")
      .then(({ data }) => setVentas(data));
  }, []);

    return (
      <div className={styles.container}>
        {ventas.length ? (
          ventas.map((vent) => {
            return (
              <div className={styles.venta}>
                <p className={styles.fecha}>Fecha: {vent.fecha}</p>
                <p className={styles.producto}>Producto: {vent.producto}</p>
                <p className={styles.precio}>Precio: ${vent.precio}</p>
                <p className={styles.usuario}>Usuario: {vent.usuario}</p>
              </div>
            );
          })
        ) : (
          <p>No hay ventas</p>
        )}
      </div>
    );
  };