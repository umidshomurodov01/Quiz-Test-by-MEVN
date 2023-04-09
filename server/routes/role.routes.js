const { Router } = require("express");
const router = Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const AuthService = require("../services/auth.service");

const authMiddleware = new AuthMiddleware();
const authService = new AuthService();

router.post("/", authMiddleware.register, async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
