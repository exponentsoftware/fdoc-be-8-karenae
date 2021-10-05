const dbConfig = require("../config/DBconnection.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./users")(sequelize, Sequelize);
db.comments = require("./comments")(sequelize, Sequelize);
db.role = require("./role")(sequelize, Sequelize);
db.tags = require("./tags")(sequelize, Sequelize);
db.todo = require("./todo")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});


db.user.belongsTo(db.role, {
  through: "user_roles",
  foreignKey: "user_Id",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin",];

db.comments.belongsTo(db.todo,{
  foreignKey:"todoId",
  as:"comments"
})

db.todo.hasMany(db.comments,{as:"comments"});


db.tags.belongsToMany(db.tags,{
  through:"todo_tag",
  as:"todo",
  foreignKey:"tag_id",
});

db.todo.belongsToMany(db.tags,{
  through:"todo_tag",
  as:"tags",
  foreignKey:"todo_id",
})

module.exports = db;