const data = require("../data.json");
const fs = require('fs')

module.exports = app => {
    app.post("/recipes", (req, res) => {
        let response = {};
        const recipe = req.body;

        if (recipe.name != "" && recipe.ingredients.length > 0 && recipe.instructions.length > 0) {
            var duplicate = data.recipes.filter(dataRecipe => recipe.name == dataRecipe.name);
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
            response = { error: "Error in the request body" }
            res.status(406)
        }
        
        res.json(response);
    });
};
