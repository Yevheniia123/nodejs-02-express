const { updateContact } = require("../controllers/contacts");
const Contact = require("../repositories/contacts");

jest.mock("../repositories/contacts");

describe("Unit test controllers contacts", () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 1 } };
  const res = { json: jest.fn((data) => data) };
  const next = jest.fn();
  it("test update contact exists", async () => {
    const contact = { id: 3, name: "Alex" };
    Contact.updateContact = jest.fn(() => {
      return contact;
    });
    const result = await updateContact(req, res, next);
    expect(result.status).toEqual("succes");
    expect(result.code).toEqual(201);
    expect(result.data.cat).toEqual(contact);
  });
  it("test update contact isn't exist", async () => {
    Contact.updateContact = jest.fn();
    const result = await updateContact(req, res, next);
    expect(result.status).toEqual("error");
    expect(result.code).toEqual(404);
    expect(result.message).toEqual("Not found");
  });

  it("test update contact wrong", async () => {
    Contact.updateContact = jest.fn(() => {
      throw new Error("Ups");
    });
    await updateContact(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
