const posts = ({ postIds }, args, { db }, info) =>
  db.query.posts({ where: { id_in: postIds } }, info);

module.exports = {
  posts
};
