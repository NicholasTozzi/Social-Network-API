const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require("../../controllers/ThoughtController");

//!             /api/thoughts
router.route("/").get(getThoughts).post(createThought);

//!             /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//!             /api/thoughts/:thoughtId/reaction

router.route("/:thoughtId/reaction").post(createReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);
module.exports = router;
