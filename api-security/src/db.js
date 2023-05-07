const { Database } = require("fakebase");

const db = new Database("./data/");

const Users = db.table("users");
const Notes = db.table("notes");
const Roles = db.table("roles");
const UserRoles = db.table("userRoles");

module.exports = {
  Users,
  Notes,
  Roles,
  UserRoles,
};
