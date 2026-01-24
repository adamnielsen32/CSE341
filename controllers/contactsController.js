const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = getDb();

    const contact = await db
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  if (
    !contact.firstName ||
    !contact.lastName ||
    !contact.email ||
    !contact.favoriteColor ||
    !contact.birthday
  ) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  const db = getDb();
  const response = await db.collection('contacts').insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json({ id: response.insertedId });
  } else {
    res.status(500).json({ message: 'Some error occurred while creating the contact.' });
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const db = getDb();
  const response = await db
    .collection('contacts')
    .updateOne({ _id: contactId }, { $set: contact });

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'Some error occurred while updating the contact.' });
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const db = getDb();
  const response = await db
    .collection('contacts')
    .deleteOne({ _id: contactId });

  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json({ message: 'Some error occurred while deleting the contact.' });
  }
};


module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact

};
