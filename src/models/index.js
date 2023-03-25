require("dotenv").config();

const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(POSTGRES_URI, {});

const User = require("./user.model");

async function ConnectionTest() {
  try {
    await sequelize.authenticate();
    console.log("------Connection has been established successfully.---------");
  } catch (error) {
    console.error("------Unable to connect to the database:------", error);
  }
}

module.exports = {
  db: sequelize,
  ConnectionTest: ConnectionTest,
  User: User(sequelize, DataTypes),
};
