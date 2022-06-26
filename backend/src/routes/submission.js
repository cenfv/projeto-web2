const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const checkToken = require("../helpers/checkToken");
const checkAdmin = require("../helpers/checkAdmin");
const checkTokenQueryParam = require("../helpers/checkTokenQueryParam");

router.get("/", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);

  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const admin = await checkAdmin.checkAdmin(req, res);
  try {
    const submission = await submissionController.getAllSubmission();
    return res.status(200).json({
      submission,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Submission not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);

  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const admin = await checkAdmin.checkAdmin(req, res);
  const submissionId = req.params.id;
  try {
    const submission = await submissionController.getSubmissionById(
      submissionId
    );
    return res.status(200).json({
      submission,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Submission not found",
    });
  }
});

router.post("/:id", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const questionAlternative = req.params.id;
  const { choice } = req.body;
  try {
    const submission = await submissionController.createSubmission(
      req.id,
      questionAlternative,
      choice
    );
    return res.status(201).json({
      submission,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      validationError: err,
    });
  }
});

router.get("/user/:id", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const targetId = req.params.id;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const correctOnly = req.query.correctOnly;
  const admin = await checkAdmin.checkAdmin(req, res);
  if (targetId != req.id && !admin) {
    return res.status(404).json({
      msg: "User not authenticated",
    });
  }
  try {
    if (correctOnly === "true") {
      const submission =
        await submissionController.getCorrectSubmissionByUserId(
          targetId,
          page,
          limit
        );
      return res.status(200).json({
        submission,
      });
    } else {
      const submission = await submissionController.getSubmissionByUserId(
        targetId,
        page,
        limit
      );
      return res.status(200).json({
        submission,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      validationError: err,
    });
  }
});

router.get("/user/:id/statistics", async (req, res, next) => {
  const token = req.query.token;
  const tokenRes = checkTokenQueryParam.checkTokenQueryParam(token);
  if (tokenRes === false) {
    return res
      .status(401)
      .json({ msg: "User not authenticated", redirect_url: "/login" });
  } else {
    req.id = tokenRes;
  }
  const targetId = req.params.id;
  const admin = await checkAdmin.checkAdmin(req, res);
  if (targetId != req.id && !admin) {
    return res.status(404).json({
      msg: "User not authenticated",
    });
  }
  try {
    const statistics = await submissionController.getSubmissionStatistics(
      targetId
    );
    return res.status(200).json({
      statistics,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      validationError: err,
    });
  }
});
module.exports = router;
