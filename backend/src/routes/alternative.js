const express = require("express");
const router = express.Router();
const alternativeController = require("../controllers/alternativeController");

router.get("/", async (req, res, next) => {
  try {
    const alternatives = await alternativeController.getAllAlternatives();
    return res.status(200).json({
      alternatives,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Alternative not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const alternativeId = req.params.id;
  try {
    const alternative = await alternativeController.getAlternativeById(
      alternativeId
    );
    return res.status(200).json({
      alternative,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      msg: "Alternative not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const alternatives = req.body.alternatives;
  try {
    const alternative = await alternativeController.createAlternative(
      alternatives
    );
    return res.status(201).json({
      alternative,
    });
  } catch (err) {
    return res.status(400).json({
      validationError: err,
    });
  }
});

module.exports = router;
