const express = require("express");
const app = express();

app.use(express.json());

let contacts = [
  {
    name: "Arto Hellas",
    number: "78-77-78-78",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: "Clark Kent",
    number: "88-888-88-88-88",
    id: 5
  },
  {
    name: "Bruce Wayne",
    number: "79*77*66*66",
    id: 6
  }
];

app.get("/", (req, res) => {
  res.send("<h1>Phonebook</h1>");
});

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/info", (req, res) => {
  res.send(`
  <div>Phonebook has ${contacts.length} contacts.</div>
  <br/>
  <div>${new Date()}</>
  `);
});

app.get("/api/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const contact = contacts.find(contact => contact.id === contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
