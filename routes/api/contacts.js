const ctrl = require("../../controllers/contacts");
const express = require("express");
const router = express.Router();
const { UpdatePerson, CreatePerson, ValidateMongoId } = require("./validation");

router.get("/", ctrl.listContacts).post("/", CreatePerson, ctrl.addContact);

router
  .get("/:contactId", ValidateMongoId, ctrl.getContactById)
  .delete("/:contactId", ValidateMongoId, ctrl.removeContact)
  .put("/:contactId", ValidateMongoId, UpdatePerson, ctrl.updateContact);

router.patch("/:contactId/favourite", UpdatePerson, ctrl.updateContact);

module.exports = router;
