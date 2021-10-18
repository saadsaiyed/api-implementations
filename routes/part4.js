const data = require("../data.json");
const fs = require('fs')
const sanitizeRequestBody = require('../middleware/sanitizeRequestBody')

module.exports = app => {
    app.put("/recipes", sanitizeRequestBody, (req, res) => {
        let response = {};
        const recipe = req.body;

        if (recipe.name != "" && recipe.ingredients.length > 0 && recipe.instructions.length > 0) {
            const elementIndex = data.recipes.findIndex(dataRecipe => dataRecipe.name == recipe.name)
            if (elementIndex >= 0) {
                data.recipes[elementIndex] = recipe;
                fs.writeFile('./data.json', JSON.stringify(data), err => { if (err) return console.log(err) });
                res.status(204)
            }
            else {
                response = { error: "Recipe does not exist" }
                res.status(404)
            }
        } else {
            response = { error: "One or more fields are empty in request body" }
            res.status(406)
        }
        
        res.json(response);
    });
};
