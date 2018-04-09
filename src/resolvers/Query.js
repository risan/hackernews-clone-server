const info = () => 'A simple GraphQL server example with in-memory data.';

const feed = async (root, { skip, first, search, orderBy }, { db }) => {
  const where = search
    ? {
        OR: [{ url_contains: search }, { description_contains: search }]
      }
    : {};

  const posts = await db.query.posts({ where, skip, first, orderBy }, `{ id }`);

  const postsConnection = await db.query.postsConnection(
    {},
    `{ aggregate { count } }`
  );

  return {
    count: postsConnection.aggregate.count,
    postIds: posts.map(post => post.id)
  };
};

module.exports = {
  info,
  feed
};
