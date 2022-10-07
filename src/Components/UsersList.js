import React from "react";

export function UsersList({users}) {

  return users.length > 0 ? (
    <div>
      {users.map((user) => (
        <div key={user.id}>
            { user.name }
        </div>
      ))}
    </div>
  ) : (
    <p>Chargement...</p>
  );
}
