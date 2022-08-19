const express = require('express');
const { type } = require('express/lib/response');

const app = express();
app.use(express.json())


const validatorLogger = (req, res, next) => {
    const data = req.body
    if (!data.id || !data.name || !data.rating || !data.description || !data.genre || !data.cast)
        res.end("Please Enter a valid values for all fields")
    else {
        if ((data.id.length === 0 || data.id < 0 || typeof (data.id) != "number"))
            res.end("invalid id").status(400)
        if (typeof (data.name) != "string")
            res.end("invlaid name").status(400)
        if (data.rating > 5 || typeof (data.rating) != "number")
            res.end("invlaid rating").status(400)
        if (typeof (data.description) != "string" || data.description.length < 50)
            res.end("invlaid desccription (must be more than 50 characters)").status(400)
        if (typeof (data.genre) != "string")
            res.end("invlaid genre").status(400)
        if (typeof (data.cast) != "string")
            res.end("invlaid cast").status(400)
        next()
    }

}

const movies = [];


app.post('/movies', validatorLogger, (req, res) => {
    movies.push(req.body)
    res.send({ status: 200 })
    console.log(movies)
}
)

app.listen(8080);