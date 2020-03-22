require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Contact = require("./models/contact");

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000000));
};

// Middleware
morgan.token("body", req => JSON.stringify(req.body));
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Phonebook</h1>");
});

app.get("/api/contacts", (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()));
  });
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

  if (body.name === undefined) {
    return res.status(400).json({ error: "Contact name missing" });
  }

  if (body.number === undefined) {
    res.status(400).json({ error: "Contact number missing" });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
    date: new Date()
  });

  contact.save().then(savedContact => {
    res.json(savedContact.toJSON());
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
