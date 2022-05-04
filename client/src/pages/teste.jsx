import React, { useEffect, useState } from "react";
import Axios from "axios";
import Card from "../components/cards/cards";



export default function Agenda() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  

  const handleRegisterContato = () => {
    Axios.post("http://localhost:3001/register", {
      id: values.id,
      name: values.name,
      email: values.email,
      fone: values.fone,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        email: values.email,
        fone: values.fone,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values.name,
            email: values.email,
            fone: values.fone,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value
    }));
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="shadow-sm p-5 mb-5 bg-body rounded">
        <h1 className="mb-5">Agenda de contato</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleaddValues}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          onChange={handleaddValues}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Telefone"
          name="fone"
          className="form-control mb-2"
          mask="(99)99999-9999"
          onChange={handleaddValues}
        />

        
        <button onClick={handleRegisterContato} className="btn btn-primary w-100 p-2">
          Cadastrar
        </button>
      </div>

      <div className="d-flex justify-content-start align-items-start flex-wrap container mt-5">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Email</th>
            <th scope="col">Admin</th>
          </tr>
        </thead>
        <tbody>
          {listCard.map((val) => (
            <Card
              listCard={listCard}
              setListCard={setListCard}
              key={val.id}
              id={val.id}
              name={val.name}
              email={val.email}
              fone={val.fone}
            />
          ))}
        </tbody>
      </table>

      </div>


    </div>
  );
}
