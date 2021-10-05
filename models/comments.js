module.exports = (sequelize, Sequelize) => {
    const comments = sequelize.define("comment", {
        todo_id: {
            type: Sequelize.INTEGER,
            required: true,
        },
        posted_by: {
            type: Sequelize.INTEGER,
            required: true
        },
        comment_text:{
            type: Sequelize.STRING,
            required: true,
        },
    });

    return comments;
};