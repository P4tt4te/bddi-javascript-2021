import React from "react";

export function UsersList({users}) {

  return users !== null ? (
    <div>
      {users.map((user) => (
        <div key={user.id}>
            { user.name }
        </div>
      ))}
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
    </div>
  ) : (
    <p>Chargement...</p>
  );
}
