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
    ? req.file.location
    : null;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "profilePhotoUrl")
             values ($1, $2, $3)
        on conflict (username) do nothing
        returning "signedUpAt", "username", "userId", "profilePhotoUrl"
      `;
      const params = [username, hashedPassword, profilePhoto];
      db.query(sql, params)
        .then(result => {
          const [user] = result.rows;
          if (!user) {
            res.status(401).json({
              error: 'Username taken'
            });
          } else {
            res.status(201).json(user);
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'Username and password are required fields.');
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
        throw new ClientError(401, 'Invalid login');
      }
      const { userId, hashedPassword, profilePhotoUrl } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'Invalid login');
          }
          const payload = { userId, username, profilePhotoUrl };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
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
           "postId",
           "comments"."userId"
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

app.get('/api/posts', (req, res, next) => {
  const { userId } = req.user;
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
         on ("isLiked"."postId" = "p"."postId" and "isLiked"."userId" = $1)
      group by "u"."userId", "isLiked"."userId", "p"."postId"
      order by "p"."createdAt" desc
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/posts/:userId', (req, res, next) => {
  const { userId } = req.user;
  const viewedUserId = parseFloat(req.params.userId);
  if (Number.isInteger(userId) !== true || userId < 0) {
    throw new ClientError(400, 'UserId must be a positive integer');
  }
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
         on ("isLiked"."postId" = "p"."postId" and "isLiked"."userId" = $2)
      where "p"."userId" = $1
      group by "u"."userId", "isLiked"."userId", "p"."postId"
      order by "p"."createdAt" desc
  `;
  const params = [viewedUserId, userId];
  db.query(sql, params)
    .then(result => {
      const posts = result.rows;
      res.status(201).json(posts);
    })
    .catch(err => next(err));
});

app.get('/api/user/:userId', (req, res, next) => {
  const { userId } = req.user;
  const followingId = parseFloat(req.params.userId);
  if (Number.isInteger(followingId) !== true || followingId < 0) {
    throw new ClientError(400, 'FollowingId must be a positive integer');
  }
  const sql = `
  with "followerCount" as (
    select count("followers"."userId") as "total"
      from "followers"
      where "userId" = $1
  ),
   "followingCount" as (
    select count("followers"."followerId") as "total"
      from "followers"
      where "followerId" = $1
  ),
  "postCount" as (
    select count(*) as "total"
      from "posts"
     where "userId" = $1
  ),
  "isFollowing" as (
    select "u"."userId",
           "isFollowing"."userId" is not null as "isFollowing"
      from "users" as "u"
      left join "followers" as "isFollowing"
             on ("isFollowing"."userId" = "u"."userId" and "isFollowing"."followerId" = $2)
     where "u"."userId" = $1
  )
  select "u"."username",
         "u"."profilePhotoUrl",
         "u"."userId",
         coalesce("f"."total", 0) as "followerCount",
         coalesce("a"."total", 0) as "followingCount",
         coalesce("p"."total", 0) as "postCount",
         "i"."isFollowing"
    from "followerCount" as "f",
         "followingCount" as "a",
         "postCount" as "p",
         "users" as "u"
    left join "isFollowing" as "i" using ("userId")
    where "u"."userId" = $1
    group by "u"."userId", "f"."total", "a"."total", "p"."total", "i"."isFollowing"
  `;
  const params = [followingId, userId];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(200).json(user);
    })
    .catch(err => console.error(err));
});

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
  const imageUrl = req.file.location;
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

app.post('/api/follow', (req, res, next) => {
  const { userId } = req.user;
  const toBeFollowedUserId = parseFloat(req.body.userId);
  if (Number.isInteger(toBeFollowedUserId) !== true || toBeFollowedUserId < 0) {
    throw new ClientError(400, 'Target userId must be a positive integer');
  } else if (!toBeFollowedUserId) {
    throw new ClientError(400, 'Target userId is a required field');
  }
  const sql = `
    insert into "followers" ("userId", "followerId")
      values($1, $2)
      returning *;
  `;
  const params = [toBeFollowedUserId, userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/unfollow', (req, res, next) => {
  const { userId } = req.user;
  const toBeUnfollowedUserId = parseFloat(req.body.userId);
  if (Number.isInteger(toBeUnfollowedUserId) !== true || toBeUnfollowedUserId < 0) {
    throw new ClientError(400, 'Target userId must be a positive integer');
  } else if (!toBeUnfollowedUserId) {
    throw new ClientError(400, 'Target userId is a required field');
  }
  const sql = `
    delete from "followers"
     where "userId" = $1 and "followerId" = $2
     returning *;
  `;
  const params = [toBeUnfollowedUserId, userId];
  db.query(sql, params)
    .then(result => {
      const [unfollow] = result.rows;
      if (!unfollow) {
        res.status(404).json({
          error: `Cannot find user with followerId ${userId}`
        });
      } else {
        res.status(204);
      }
    });
});

app.put('/api/edit/:postId', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { caption, isBought, location } = req.body;
  const postId = parseFloat(req.params.postId);
  const imageUrl = req.file ? req.file.location : null;
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
  const sqlDeleteLikes = `
    delete from "likes"
     where "postId" = $1
     returning *;
  `;
  const sqlDeleteComments = `
    delete from "comments"
      where "postId" = $1
      returning *;
  `;
  const sqlDeletePosts = `
    delete from "posts"
     where "postId" = $1 and "userId" = $2
     returning *;
  `;
  const postIdParam = [postId];
  const params = [postId, userId];
  return db.query(sqlDeleteLikes, postIdParam)
    .then(result => {
      db.query(sqlDeleteComments, postIdParam)
        .then(result => {
          db.query(sqlDeletePosts, params)
            .then(result => {
              const [deletedPost] = result.rows;
              if (!deletedPost) {
                res.status(404).json({
                  error: `Cannot find posts with postId ${postId}`
                });
              } else {
                res.sendStatus(204);
              }
            });
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
