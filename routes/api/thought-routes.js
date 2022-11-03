const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
  } = require('../../controllers/thought-controller')
const router = require("express").Router()

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getThought)
  .post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:ThoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction);

//api/thoughts/:thoughtId/reactions/reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;