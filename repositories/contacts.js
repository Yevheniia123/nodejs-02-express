const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const result = await Contact.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "name email phone -_id",
  // });
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    offset = 0,
  } = query;
  const optionSearch = { owner: userId };
  // if (favorite !== null) {
  //   optionSearch.favorite = favorite;
  // }
  const results = await Contact.paginate(optionSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: { path: "owner", select: "name email phone" },
  });
  return results;
};

const getContactById = async (userId, ontactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email phone",
  });
  return result;
};

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (userId, body) => {
  const record = await Contact.create({ owner: userId, ...body });
  return record;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
