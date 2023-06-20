import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./venta.module.css"
export const Venta = ({ vent }) => {
  const [pedido, setPedido] = useState({});

  useEffect(() => {
    axios
      .get(`https://servidor-vinos.onrender.com/pedidos/id?idUser=${vent.payment_intent}`)
      .then(({ data }) => setPedido(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = async (ventStatus, ventId) => {
    let newStatus = ventStatus === "pending" ? "delivered" : "pending";
    setPedido({ ...pedido, estado: newStatus });
    await axios.put(
      `https://servidor-vinos.onrender.com/buy/put?idVent=${ventId}&status=${newStatus}`
    );
  };

  return (
    <div className={styles.venta}>
      <h2 className={styles.description}>{vent.description}</h2>
      <h2 className={styles.amount}>{vent.amount / 100}</h2>
      <h2 className={styles.email}>{vent.receipt_email}</h2>
      <h2 className={styles.postalCode}>{vent.billing_details.address.postal_code}</h2>
      <button
        className={styles.button}
        onClick={() => handleClick(pedido.estado, vent.payment_intent)}
      >
        {pedido.estado}
      </button>
    </div>
  );
};