require("dotenv").config()

const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.json())

app.listen(3000)

const posts = [
    {
        username: "Lance",
        title: "The Great"
    },
    {
        username: "Daniel",
        title: "The Good Looking Guy"
    },
    {
        username: "Dax",
        title: "The Delusional Piece of Shit"
    },
]

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)

        req.user = user 
        next()
    })
}