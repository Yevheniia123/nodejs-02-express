const fs = require("fs/promises");

const isAccsessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccsessible(folder))) {
  }
  fs.mkdir(folder);
};
module.exports = createFolderIsNotExist;
