const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "agenda",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { fone } = req.body;

  let mysql = "INSERT INTO contatos ( name, email, fone) VALUES (?, ?, ?)";
  db.query(mysql, [name, email, fone], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { fone } = req.body;

  let mysql =
    "SELECT * from contatos WHERE name = ? AND email = ? AND fone = ?";
  db.query(mysql, [name, email, fone], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM contatos";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { fone } = req.body;
  let mysql = "UPDATE contatos SET name = ?, email = ?, fone = ? WHERE id = ?";
  db.query(mysql, [name, email, fone, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM contatos WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
