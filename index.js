require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Contact = require("./models/contact");

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

app.delete("/api/contacts/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
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

// Error handling
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
