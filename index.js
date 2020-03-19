const express = require("express");
const app = express();
const morgan = require("morgan");

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

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000000));
};

// Middleware
morgan.token("body", req => JSON.stringify(req.body));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Routes
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

app.delete("/api/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  contacts = contacts.filter(contact => contact.id !== contactId);

  res.status(204).end();
});

app.post("/api/contacts", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  if (contacts.find(contact => contact.name === body.name)) {
    return res.status(400).json({
      error: "contact already exists"
    });
  }

  const contact = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  contacts = contacts.concat(contact);

  res.json(contacts);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
