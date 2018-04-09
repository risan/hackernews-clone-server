const user = (root, args, { db }, info) =>
  db.query.user({ where: { id: root.user.id } }, info);

module.exports = { user };
