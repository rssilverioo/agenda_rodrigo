import React, { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";
import Axios from "axios";





export default function Card(props) {
  const [open, setOpen] = React.useState(false);



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


  const handleDeleteContato = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
  };



  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        fone={props.fone}
        email={props.email}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <tr>
        <th scope="row">{props.id}</th>
        <td>{props.name}</td>
        <td>{props.fone}</td>
        <td>{props.email}</td>
        <td><button class="btn btn-danger" onClick={() => handleDeleteContato()}>Delete</button> <button onClick={() => setOpen(true)} class="btn btn-secondary">Edit</button></td>
      </tr>
    </>
  );
}
