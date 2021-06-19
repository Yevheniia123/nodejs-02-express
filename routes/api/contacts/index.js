const ctrl = require("../../../controllers/contacts");
const express = require("express");
const router = express.Router();
const { UpdatePerson, CreatePerson, ValidateMongoId } = require("./validation");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, ctrl.listContacts)
  .post("/", guard, CreatePerson, ctrl.addContact);

router
  .get("/:contactId", guard, ValidateMongoId, ctrl.getContactById)
  .delete("/:contactId", guard, ValidateMongoId, ctrl.removeContact)
  .put("/:contactId", guard, ValidateMongoId, UpdatePerson, ctrl.updateContact);

router.patch("/:contactId/favourite", guard, UpdatePerson, ctrl.updateContact);

module.exports = router;
