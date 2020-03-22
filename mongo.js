const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Password required");
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log("Command line argument <name>, or <number> missing");
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log("Too many command line arguments");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fso:${password}@fso-mvvsq.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  Contact.find({}).then((res) => {
    console.log("Contacts:");
    res.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
  });

  contact.save().then(() => {
    console.log("contact saved");
    mongoose.connection.close();
  });
}
