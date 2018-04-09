const newPost = {
  subscribe: (root, args, { db }, info) =>
    db.subscription.post(
      // https://github.com/graphcool/prisma/issues/1734
      // { where: { mutation_in: ['CREATED'] } },
      {},
      info
    )
};

const newVote = {
  subscribe: (root, args, { db }, info) =>
    db.subscription.vote(
      // https://github.com/graphcool/prisma/issues/1734
      // { where: { mutation_in: ['CREATED'] } },
      {},
      info
    )
};

module.exports = {
  newPost,
  newVote
};
