const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
} = require("../../controllers/ThoughtController");

//!             /api/thoughts
router.route("/").get(getThoughts).post(createThought);

//!             /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
