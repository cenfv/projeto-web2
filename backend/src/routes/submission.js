
const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

router.get("/", async (req, res, next) => {
  try {
    const submission = await submissionController.getAllSubmission();
    return res.status(200).json({
      submission,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Submission not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const submissionId = req.params.id;
  try {
    const submission = await submissionController.getsubmissionById(
      submissionId
    );
    return res.status(200).json({
      submission,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Submission not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { user, questionAlternative, choice } = req.body;

  try {
    const submission = await submissionController.createsubmission(
      user,
      questionAlternative,
      choice
    );
    return res.status(201).json({
      submission,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

module.exports = router;
