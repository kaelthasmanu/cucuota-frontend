import React, { useState } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuario 1', isAdmin: false },
    { id: 2, name: 'Usuario 2', isAdmin: false },
    { id: 3, name: 'Usuario 3', isAdmin: false },
    // Agrega más usuarios según sea necesario
  ]);

  const handleCheckboxChange = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
  };
  return (
    <div>
      <Typography variant="h5">Lista de Usuarios</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={user.isAdmin}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </ListItemIcon>
            <ListItemText primary={`${user.name} ${user.isAdmin ? '(Admin)' : ''}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
