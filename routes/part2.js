const data = require("../data.json")

module.exports = app => {
    app.get("/recipes/details/:recipeName", (req, res) => {
        let response = {};
        
        const recipe = data.recipes.filter(recipe => recipe.name == req.params.recipeName)

        if (recipe.length > 0) {
            const { ingredients } = recipe[0]
            const numSteps = recipe[0].instructions.length
            response = {
                details: {
                    ingredients,
                    numSteps
                }
            }
        }
        res.status(200)
        res.json(response);
    });
};