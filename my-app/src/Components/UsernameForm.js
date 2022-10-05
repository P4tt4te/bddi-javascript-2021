import React, { useState } from "react";
import { updateUsername } from "../updateUsername";

export function UsernameForm({ user, onUpdate }) {
  const [value, setValue] = useState(user.name);

  const onSubmit = (e) => {
    //regarder par rapport au chargement
    updateUsername(value);
    onUpdate(value);
    e.preventDefault();
  }

  return user !== null ? (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="usernameContent">Changer de pseudo :</label>
        <input
          type="text"
          name="usernameContent"
          placeholder="Nouveau pseudo ici..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </form>
    </div>
  ) : (
    <p>Chargement...</p>
  );
}
