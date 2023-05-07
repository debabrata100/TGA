const _ = require("lodash");
const { Roles, UserRoles } = require("../db");

async function getRoles(req, res) {
  const roles = await Roles.findAll();
  console.log({ user: req.user });
  res.status(200).json(roles);
}
async function createNewRole(req, res) {
  const { title } = req.body;
  const roleExist = await Roles.findOne((role) => role.title === title);
  if (roleExist) {
    return res.status(409).json({ error: `${title} already exists!` });
  }
  const role = await Roles.create({ title });
  res.status(201).json(role);
}
async function createUserRole(req, res) {
  const { title, role } = req.body;
  const roleExist = await Roles.findOne((role) => role.title === title);
  if (!roleExist) {
    return res.status(401).json({ error: `Role '${title}' does not exist` });
  }
  const userRoleExist = await UserRoles.findOne((role) => role.title === title);
  if (userRoleExist) {
    return res
      .status(409)
      .json({ error: `${title} already created, please update` });
  }

  const userRole = await UserRoles.create({
    title,
    roles: ["admin", role],
  });
  res.status(201).json(userRole);
}

async function updateUserRole(req, res) {
  const { title, roles } = req.body;
  const roleExist = await Roles.findOne((role) => role.title === title);
  if (!roleExist) {
    return res.status(401).json({ error: `Role '${title}' does not exist` });
  }
  const userRole = await UserRoles.findOne((role) => role.title === title);
  if (!userRole) {
    return res
      .status(409)
      .json({ error: `${title} does not exist, please create first` });
  }

  const updateUserRole = await UserRoles.update({
    id: userRole.id,
    roles: _.union(userRole.roles, roles),
  });
  res.status(201).json(updateUserRole);
}

async function getUserRoles(req, res) {
  const userRoles = await UserRoles.findAll();
  res.status(200).json(userRoles);
}
module.exports = {
  getRoles,
  createNewRole,
  createUserRole,
  updateUserRole,
  getUserRoles,
};
