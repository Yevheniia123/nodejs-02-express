const Contacts = require("../repositories/contacts");

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: results, ...rest } = await Contacts.listContacts(
      userId,
      req.query
    );
    return res.json({ status: "succes", code: 200, data: { results, rest } });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await Contacts.getContactById(userId, req.params.contactId);
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
    const userId = req.user.id;
    const result = await Contacts.addContact(userId, req.body);
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
    const userId = req.user.id;
    const result = await Contacts.removeContact(userId, req.params.contactId);
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
    const userId = req.user.id;
    const result = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
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
