import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "./user";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";
import styles from "../UserBan/userBan.module.css"

export const UserBan = () => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://servidor-vinos.onrender.com/users/all?paginas=${pages}&search=${search}`
      )
      .then(({ data }) => setUsers(data));
  }, []);

  return (
    <div className={styles.container}>
      {users.length ? (
        <div className={styles.userList}>
          {users.map((user) => {
            return <User user={user} />;
          })}
        </div>
      ) : (
        <h1 className={styles.loading}>Cargando...</h1>
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
          disabled={!users.length || users.length / 10 < 1}
          className={styles.pageButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
