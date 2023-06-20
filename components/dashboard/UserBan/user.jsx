import axios from "axios";
import { useState } from "react";
import styles from "../UserBan/User.module.css"

export const User = ({ user }) => {
  const [usuario, setUsuario] = useState(user);

  const handlerClick = async () => {
    let newBan = !usuario.ban ? true : false;
    setUsuario({ ...usuario, ban: newBan });
    await axios.put(`https://servidor-vinos.onrender.com/users/put`, {
      userEmail: usuario.email,
      changes: [{ name: "ban", data: newBan }],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <h2 className={styles.userName}>{usuario.userName}</h2>
        <h2 className={styles.userEmail}>{usuario.email}</h2>
        <button onClick={handlerClick} className={styles.userButton}>
          {usuario.ban ? "Desbanear" : "Banear"}
        </button>
      </div>
    </div>
  );
};
