const { Router } = require("express");
const router = Router();
const TokenMiddleware = require("../middlewares/token.middleware");
const Questions = require("../models/question");
const { checkAdmin } = new TokenMiddleware();

router.post("/", async (req, res) => {
  try {
    const { question, answer, options, level } = req.body;
    const newQuestion = {
      question,
      answer,
      options,
      level,
    };
    const matchQuestion = await Questions.findOne({ question });
    if (question !== matchQuestion || Questions.length === 0) {
      const Question = await Questions.create(newQuestion);
      res.json({ status: "ok", msg: "Savol bazaga qo'shildi", Question });
    } else {
      res.json({
        status: "bad",
        msg: "Bu savol tizimda mavjud. Iltimos boshqa savol kiriting !",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const respons = await Questions.find();
    res.json({ status: "ok", msg: "Barcha savollar", respons });
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/all/:id", async (req, res) => {
  try {
    const result = await Questions.findById(req.params.id);
    if (result) {
      res.json({ status: "ok", msg: "Id bo'yicha ma'lumot", result });
    } else {
      res.json({ status: "bad", msg: "Id bo'yicha ma'lumot topilmadi" });
      res.redirect("/explore");
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { question, options, answer, level } = req.body;
    const respons = await Questions.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          question,
          options,
          answer,
          level,
        },
      },
      { new: true }
    );
    res.json({ status: "ok", msg: "Savol yangilandi", respons });
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const respons = await Questions.findByIdAndRemove(req.params.id);
    res.json({ status: "ok", msg: "Savol Bazadan o'chirildi !", respons });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/role", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
