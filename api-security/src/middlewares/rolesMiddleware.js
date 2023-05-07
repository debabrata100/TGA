const _ = require("lodash");
const { Users, UserRoles } = require("../db");

async function rolesChecker(requiredRole, req, res, next) {
  try {
    const { id } = req.user;
    const { role } = await Users.findById(id);
    const { roles } = await UserRoles.findOne(
      (userRole) => userRole.title === requiredRole
    );
    const exists = _.includes(roles, role);
    if (exists === true) {
      return next();
    }
    return res.status(401).json({ error: "Permission denied!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

async function createRoles(...args) {
  return rolesChecker("CREATE_ROLES", ...args);
}

async function createNoteRoleCheck(...args) {
  return rolesChecker("CREATE_NOTE", ...args);
}

function deleteNoteRoleCheck(...args) {
  return rolesChecker("DELETE_NOTE", ...args);
}

module.exports = { createRoles, createNoteRoleCheck, deleteNoteRoleCheck };
