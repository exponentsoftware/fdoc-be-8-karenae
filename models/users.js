module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
        },
        password:{
            type: Sequelize.STRING,
            required: true
        },
        phone: {
            type: Sequelize.STRING,
            required: true
        },
        paidUser: {
            type: Sequelize.STRING,
            default: "false",
        }
    });
    return User;
};