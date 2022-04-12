require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

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

app.post('/api/photos', (req, res, next) => {
  const { userId, fileUrl, caption, location, isBought } = req.body;
  if (!userId || !fileUrl || !caption || !location || !isBought) {
    throw new ClientError(401, 'Username, fileUrl, and isBought are required fields');
  }
  const sql = `
    insert into "photos" ("userId", "fileUrl", "caption", "location", "isBought")
                "values" ($1, $2, $3, $4, $5)
                returning *
  `;
  const params = [userId, fileUrl, caption, location, isBought];
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
