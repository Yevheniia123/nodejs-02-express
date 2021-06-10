const Contacts = require("../repositories/contacts");

const listContacts = async (req, res, next) => {
  try {
    const results = await Contacts.listContacts();
    return res.json({ status: "succes", code: 200, data: { results } });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const result = await Contacts.getContactById(req.params.contactId);
    if (result) {
      return res.json({ status: "succes", code: 201, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: "succes", code: 201, data: { result } });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const result = await Contacts.removeContact(req.params.contactId);
    if (result) {
      return res.json({ status: "succes", code: 201, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const result = await Contacts.updateContact(req.params.contactId, req.body);
    if (result) {
      return res.json({ status: "succes", code: 201, data: { result } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
