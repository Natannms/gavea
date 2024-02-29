const jwt = require("jsonwebtoken");
const database = require("../models");
const redisClient = require('../config/redisConfig.js');

require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

class AuthController {
  static async welcome(req, res) {
    res.send({ message: "Wecome To Api", status: "ok" });
  }
  static async login(req, res, next) {
    const { email, password } = req.body;

    const user = await database.User.findOne({
      where: { email , password },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });


    redisClient.client.setEx(`user:${user.id}`, 3600, JSON.stringify({
      type: user.type,
      token
    }));


    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  }

  static async logout(req, res, next) {
    //get token in header
    const token = req.headers["x-access-token"];

    //verify if token existis in BlackListTokens
    const tokenExists = await database.BlackListToken.findOne({
      where: { token: token },
    });

    if (tokenExists) {
       //delete token
      await database.BlackListToken.destroy({
        where: { token: token },
      });

      return res.status(200).json({ message: "Logout successfully" });
    }else{
      return res.status(400).json({ error: "Token not found" });
    }
  }

  static async register(req, res) {
    const { email, password, name } = req.body;

    const userExists = await database.User.findOne({
      where: { email: email },
    });

    if (userExists) {
      res.send({ message: "User already exists" });
    } else {
      console.log({
        name,
        email,
        password,
        type: 1,
      })
      const user = await database.User.create({
        name,
        email,
        password,
        type: 1,
      });

      if (!user) {
        res.send({ message: "error" });
      } else {
        res.send({
          message: "Created successfully",
          user: user.id,
        });
      }
    }
  }

}

module.exports = AuthController;