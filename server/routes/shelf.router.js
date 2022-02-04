const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/',  rejectUnauthenticated, (req, res) => {
  console.log('req.user is', req.user)
  let queryText = 
  `SELECT * FROM "item"
  WHERE user_id = $1`;
  let queryParams = [req.user.id]
  pool.query(queryText, queryParams)
    .then((result) => {
      console.log('result is', result.rows);
      
      res.send(result.rows)
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500)
    })

});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
        const queryString = `
                            INSERT INTO "item" ("description", "image_url", "user_id")
                              VALUES ($1, $2, $3);
                            `
        const queryParams= [req.body.description, req.body.image_url, req.user.id]
                          
        pool.query(queryString, queryParams)
        .then((results) => {
          res.sendStatus(201);
        })
        .catch(err => {
          console.error(`POST /shelf failed on shelf.router.js page`, err);
          res.sendStatus(500);
        })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  console.log('id is', req.params.id);
  let queryString = `
    DELETE FROM "item"
    WHERE user_id = $1;`;
  let queryParams = [req.params.id]
    pool.query(queryString, queryParams)
      .then((results) => {
        res.sendStatus(204);
      })
      .catch(err =>{
        console.log('DELETE /shelf failed', err);
        res.sendStatus(500);
      })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
