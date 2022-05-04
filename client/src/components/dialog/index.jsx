import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";



export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    email: props.email,
    fone: props.fone,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditContato = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      name: editValues.name,
      email: editValues.email,
      fone: editValues.fone,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                name: editValues.name,
                email: editValues.email,
                fone: editValues.fone,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteContato = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            defaultValue={props.email}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="fone"
            label="Telefone"
            defaultValue={props.fone}
            type="text"
            onChange={handleChangeValues}
            fullWidth
            className="form-control mb-2"
            
          />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} class="btn btn-dark">
            Cancel
          </button>

          <button class="btn btn-success" onClick={() => handleEditContato()}>
            Salvar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
