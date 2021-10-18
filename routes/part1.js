const data = require("../data.json")

module.exports = app => {
    app.get("/recipes", (req, res) => {
        let response = {
            recipeNames: data.recipes.map(recipe => recipe.name)
        };
        res.status(200)
        res.json(response);
    });
};