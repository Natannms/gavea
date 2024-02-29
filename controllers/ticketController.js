const database = require("../models");

class TicketController {
  static async create(req, res) {
    const { name ,price ,short_description ,long_description  } = req.body;

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
        type,
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
  static async index(req, res) {
    const users = await database.User.findAll();
    res.send(users);
  }

  static async show(req, res) {
    const userId = req.params.id;
    const user = await database.User.findByPk(userId);

    if (user) {
      res.send(user);
    } else {
      res.send({ message: "User not found" });
    }
  }

  static async update(req, res) {
    const userId = req.params.id;
    const { name, email, password, type } = req.body;

    const user = await database.User.findByPk(userId);

    if (user) {
      await user.update({
        name,
        email,
        password,
        type,
      });

      res.send({ message: "User updated successfully" });
    } else {
      res.send({ message: "User not found" });
    }
  }

  static async delete(req, res) {
    const userId = req.params.id;
    const user = await database.User.findByPk(userId);

    if (user) {
      await user.destroy();
      res.send({ message: "User deleted successfully" });
    } else {
      res.send({ message: "User not found" });
    }
  }

  static async patch(req, res) {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const user = await database.User.findByPk(userId);

    if (user) {
      // Atualizar apenas os campos fornecidos
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;

      await user.save();

      res.send({ message: "User updated successfully" });
    } else {
      res.send({ message: "User not found" });
    }
  }
  
}

module.exports = TicketController;