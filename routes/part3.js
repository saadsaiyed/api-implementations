const data = require("../data.json");
const fs = require('fs')
const sanitizeRequestBody = require('../middleware/sanitizeRequestBody')

module.exports = app => {
    app.post("/recipes", sanitizeRequestBody, (req, res) => {
        let response = {};
        const recipe = req.body;

        if (recipe.name != "" && recipe.ingredients.length > 0 && recipe.instructions.length > 0) {
            let duplicate = data.recipes.filter(dataRecipe => recipe.name == dataRecipe.name);
            if (duplicate.length > 0) {
                response = { error: "Recipe already exists" }
                res.status(400)
            }
            else {
                data.recipes.push(recipe);
                fs.writeFile('./data.json', JSON.stringify(data), err => { if (err) return console.log(err) });
                res.status(201)
            }
        } else {
            response = { error: "One or more fields are empty in request body" }
            res.status(406)
        }
        
        res.json(response);
    });
};
