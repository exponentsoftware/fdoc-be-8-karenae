module.exports = (sequelize, Sequelize) => {
    const tags = sequelize.define("tag", {
        todo_id: {
            type: Sequelize.INTEGER,
            required: true,
        },
        posted_by: {
            type: Sequelize.INTEGER,
            required: true
        },
        title:{
            type: Sequelize.STRING,
            required: true,
        },
        category:{
            type: Sequelize.STRING,
            required: true,
        }
    });

    return tags;
};