const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createAuthPayload = user => ({
  token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
  user
});

const getUserIdFromRequest = request => {
  const authHeader = request.get('Authorization');

  if (!authHeader) {
    throw new Error('Not authenticated.');
  }

  const token = authHeader.replace('Bearer ', '');
  const { userId } = jwt.verify(token, process.env.APP_SECRET);

  return userId;
};

const signup = async (root, { name, email, password }, { db }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.mutation.createUser(
    {
      data: { name, email, password: hashedPassword }
    },
    `{ id }`
  );

  return createAuthPayload(user);
};

const login = async (root, { email, password }, { db }) => {
  const user = await db.query.user({ where: { email } }, `{ id password }`);

  if (!user) {
    throw new Error('Email and password do not match.');
  }

  const isValidCredentials = await bcrypt.compare(password, user.password);

  if (!isValidCredentials) {
    throw new Error('Email and password do not match.');
  }

  return createAuthPayload(user);
};

const createPost = (root, { url, description }, { db, request }, info) =>
  db.mutation.createPost(
    {
      data: {
        url,
        description,
        postedBy: { connect: { id: getUserIdFromRequest(request) } }
      }
    },
    info
  );

const vote = async (root, { postId }, { db, request }, info) => {
  const userId = getUserIdFromRequest(request);

  const isExists = await db.exists.Vote({
    user: { id: userId },
    post: { id: postId }
  });

  if (isExists) {
    throw new Error(`Already voted for post: ${postId}.`);
  }

  return db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } }
      }
    },
    info
  );
};

module.exports = {
  signup,
  login,
  createPost,
  vote
};
