module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        userId: {
            type: Sequelize.INTEGER
        },
        userName:{
            type: Sequelize.STRING,
            required: true,
        },
        todoTitle: {
            type: Sequelize.STRING,
            required: true,
        },
        todoCompleted: {
            type: Sequelize.DataTypes.ENUM(["true", "false"]),
            default: "false"
        },
        todoCategory: {
            type: Sequelize.DataTypes.ENUM(["task", "hobby", "work"]),
            default: "task"
        },

    });

    return Todo;
};
