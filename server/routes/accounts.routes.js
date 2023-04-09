const { Router } = require("express");
const router = Router();

const AccountService = require("../services/accounts.service");
const TokenMiddleware = require("../middlewares/token.middleware");
const AccountMiddleware = require("../middlewares/account.middleware");

const { checkAll, checkPrivacy, checkAdmin } = new TokenMiddleware();
const { update } = new AccountMiddleware();
const accountService = new AccountService();

// get all users
router.get("/", async (req, res) => {
  try {
    const result = await accountService.getUsers();

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// update account
router.put("/:id", update, async (req, res) => {
  try {
    const result = await accountService.update({
      id: req.params.id,
      account: req.body.account,
    });
    res.json(result);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
});

// get user
router.get("/:id", async (req, res) => {
  try {
    const result = await accountService.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const result = await accountService.deleteUser(req.params.id);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
