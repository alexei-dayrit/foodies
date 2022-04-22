require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);
app.use(staticMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.post('/api/auth/sign-up', uploadsMiddleware, (req, res, next) => {
  const { username, password } = req.body;
  const profilePhoto = req.file
    ? req.file.filename
    : null;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "postCount",
            "followerCount", "followingCount", "profilePhotoUrl")
        values ($1, $2, $3, $4, $5, $6)
        returning "signedUpAt", "username", "userId", "profilePhotoUrl"
      `;
      const params = [username, hashedPassword, 0, 0, 0, profilePhoto];
      db.query(sql, params)
        .then(result => {
          const [user] = result.rows;
          res.status(201).json(user);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword",
           "profilePhotoUrl"
      from "users"
     where "username" = $1;
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invald login');
      }
      const { userId, hashedPassword, profilePhotoUrl } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username, profilePhotoUrl };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.get('/api/posts', (req, res, next) => {
  const sql = `
     select "u"."username",
            "u"."profilePhotoUrl",
            "p"."userId",
            "p"."postId",
            "p"."imageUrl",
            "p"."caption",
            "p"."isBought",
            "p"."location",
            "p"."createdAt",
            "p"."editedAt",
            "isLiked"."userId" is not null as "isLiked",
            count("l".*) as "numberOfLikes"
       from "posts" as "p"
       join "users" as "u" using ("userId")
       left join "likes" as "l" using ("postId")
       left join "likes" as "isLiked"
         on ("isLiked"."postId" = "p"."postId" and "isLiked"."userId" = "u"."userId")
      group by "u"."userId", "isLiked"."userId", "p"."postId"
      order by "p"."createdAt" desc
  `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/posts/:userId', (req, res, next) => {
  const userId = parseFloat(req.params.userId);
  if (Number.isInteger(userId) !== true || userId < 0) {
    throw new ClientError(400, 'UserId must be a positive integer');
  }
  const sql = `
     select "u"."username",
            "u"."profilePhotoUrl",
            "p"."postId",
            "p"."imageUrl",
            "p"."caption",
            "p"."isBought",
            "p"."location",
            "p"."createdAt",
            "p"."editedAt",
            "isLiked"."userId" is not null as "isLiked",
            count("l".*) as "numberOfLikes"
       from "posts" as "p"
       join "users" as "u" using ("userId")
       left join "likes" as "l" using ("postId")
       left join "likes" as "isLiked"
         on ("isLiked"."postId" = "p"."postId" and "isLiked"."userId" = $1)
      where "p"."userId" = $1
      group by "u"."userId", "isLiked"."userId", "p"."postId"
      order by "p"."createdAt" desc
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const posts = result.rows;
      res.status(201).json(posts);
    })
    .catch(err => next(err));
});

app.get('/api/comments/:postId', (req, res, next) => {
  const postId = parseFloat(req.params.postId);
  if (Number.isInteger(postId) !== true || postId < 0) {
    throw new ClientError(400, 'PostId must be a positive integer');
  }
  const sql = `
    select "username",
           "profilePhotoUrl",
           "commentId",
           "comment",
           "commentedAt",
           "postId"
      from "comments"
      join "users" using ("userId")
     where "postId" = $1
     order by "comments"."commentedAt" desc
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/post/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = parseFloat(req.params.postId);
  if (Number.isInteger(postId) !== true || postId < 0) {
    throw new ClientError(400, 'PostId must be a positive integer');
  }
  const sql = `
    select  "u"."username",
            "u"."profilePhotoUrl",
            "p"."postId",
            "p"."imageUrl",
            "p"."caption",
            "p"."isBought",
            "p"."location",
            "p"."createdAt",
            "p"."editedAt",
            "isLiked"."userId" is not null as "isLiked",
            count("l".*) as "numberOfLikes"
       from "posts" as "p"
       join "users" as "u" using ("userId")
       left join "likes" as "l" using ("postId")
       left join "likes" as "isLiked"
         on ("isLiked"."postId" = "p"."postId" and "isLiked"."userId" = $2)
      where "p"."postId" = $1
      group by "u"."userId", "isLiked"."userId", "p"."postId"
  `;
  const params = [postId, userId];
  db.query(sql, params)
    .then(result => {
      const [post] = result.rows;
      if (!post) {
        res.status(404).json({
          error: `Cannot find a post with postId ${postId}`
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/deleteLikes/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = parseFloat(req.params.postId);
  if (Number.isInteger(postId) !== true || postId < 0) {
    throw new ClientError(400, 'PostId must be a positive integer');
  }
  const sql = `
    delete from "likes"
     where "postId" = $1 and "userId" = $2
     returning *;
  `;
  const params = [postId, userId];
  db.query(sql, params)
    .then(result => {
      const [deletedLike] = result.rows;
      if (!deletedLike) {
        res.status(404).json({
          error: `Cannot find likes with postId ${postId}`
        });
      } else {
        res.sendStatus(204);
      }
    });
});

app.post('/api/likes/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = parseFloat(req.params.postId);
  if (Number.isInteger(postId) !== true || postId < 0) {
    throw new ClientError(400, 'PostId must be a positive integer');
  }
  const sql = `
    insert into "likes" ("postId", "userId")
      values ($1, $2)
      returning *;
  `;
  const params = [postId, userId];
  db.query(sql, params)
    .then(result => {
      const [likedRow] = result.rows;
      res.status(201).json(likedRow);
    })
    .catch(err => next(err));
});

app.post('/api/uploadComment/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = parseFloat(req.params.postId);
  const comment = req.body.comment;
  if (Number.isInteger(postId) !== true || postId < 0) {
    throw new ClientError(400, 'PostId must be a positive integer');
  } else if (!comment) {
    throw new ClientError(400, 'Comment is a required field');
  }
  const sql = `
    insert into "comments" ("userId", "comment", "postId")
      values ($1, $2, $3)
      returning *;
  `;
  const params = [userId, comment, postId];
  db.query(sql, params)
    .then(result => {
      const [comment] = result.rows;
      res.status(201).json(comment);
    })
    .catch(err => next(err));
});

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { caption, location, isBought } = req.body;
  if (!caption || !location || !isBought) {
    throw new ClientError(400, 'Caption, location, and isBought are required fields');
  }
  const imageUrl = req.file.filename;
  const sql = `
    insert into "posts" ("userId", "imageUrl", "caption", "location", "isBought")
      values ($1, $2, $3, $4, $5)
      returning *;
  `;
  const params = [userId, imageUrl, caption, location, isBought];
  db.query(sql, params)
    .then(result => {
      const [post] = result.rows;
      res.status(201).json(post);
    })
    .catch(err => next(err));
});

app.put('/api/edit/:postId', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { caption, isBought, location } = req.body;
  const postId = parseFloat(req.params.postId);
  const imageUrl = req.file ? req.file.filename : null;
  const editedAt = new Date();
  if (Number.isInteger(postId) !== true || postId < 0) {
    throw new ClientError(400, 'PostId must be a positive integer');
  } else if (!caption || !location || !isBought) {
    throw new ClientError(400, 'Caption, location, and isBought are required fields');
  }
  const sql = `
    update "posts"
      set  "imageUrl" = coalesce($1, "imageUrl"),
           "caption" = $2,
           "isBought" = $3,
           "location" = $4,
           "editedAt" = $5
      where "postId" = $6 and "userId" = $7
      returning *;
  `;
  const params = [imageUrl, caption, isBought, location, editedAt, postId, userId];
  db.query(sql, params)
    .then(result => {
      const [editedPost] = result.rows;
      if (!editedPost) {
        res.status(404).json({
          error: `Cannot find a post with postId ${postId}`
        });
      }
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/deletePost/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = parseFloat(req.params.postId);
  if (Number.isInteger(postId) !== true || postId < 0) {
    throw new ClientError(400, 'PostId must be a positive integer');
  }
  const sql = `
    delete from "likes"
     where "postId" = $1 and "userId" = $2
     returning *;
  `;
  const sql2 = `
    delete from "posts"
     where "postId" = $1 and "userId" = $2
     returning *;
  `;
  const params = [postId, userId];
  db.query(sql, params)
    .then(result => {
      db.query(sql2, params)
        .then(result => {
          const [deletedPost] = result.rows;
          if (!deletedPost) {
            res.status(404).json({
              error: `Cannot find posts with postId ${postId}`
            });
          } else {
            res.sendStatus(204);
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
