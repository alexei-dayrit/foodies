require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

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

app.get('/api/posts/:id', (req, res, next) => {
  const userId = parseFloat(req.params.id);
  if (Number.isInteger(userId) !== true || userId < 0) {
    throw new ClientError(400, 'UserId must be a positive integer');
  }
  const sql = `
    select *
      from "photos"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  const userId = 1;
  const { caption, location, isBought } = req.body;
  if (!caption || !location || !isBought) {
    throw new ClientError(400, 'Caption, location, and isBought are required fields');
  }
  const imageUrl = req.file.filename;
  const sql = `
    insert into "photos" ("userId", "imageUrl", "caption", "location", "isBought")
      values ($1, $2, $3, $4, $5)
      returning *;
  `;
  const params = [userId, imageUrl, caption, location, isBought];
  db.query(sql, params)
    .then(result => {
      const [photo] = result.rows;
      res.status(201).json(photo);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
