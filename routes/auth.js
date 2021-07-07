const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  //Procura usuário
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("Usuário não encontrado");

  //Senha correta
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Senha Inválida");

  //Cria token de autenticação
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
