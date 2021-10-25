module.exports = (req, res, next) => {
    const { body } = req;

    let isEmpty = true
    for (var i in body) isEmpty = false;
    if (isEmpty) {
        res.status(400)
        return res.json({error: "The request body is empty"})
    }
    next();
}