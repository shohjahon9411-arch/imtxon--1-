import express from "express"
import fs from "fs"
import path from "path"
const PORT = 7896
const app = express()

app.use(express.json())

app.get("/users/all", (req, res) => {
    let users = fs.readFileSync(path.join(process.cwd(), "src", "db", "users.json"), "utf-8")
    users = JSON.parse(users)
    res.send(users)
})

app.get("/orders/all", (req, res) => {
    let orders = fs.readFileSync(path.join(process.cwd(), "src", "db", "orders.json"), "utf-8")
    orders = JSON.parse(orders)
    res.send(orders)
})

app.get("/foods/all", (req, res) => {
    let foods = fs.readFileSync(path.join(process.cwd(), "src", "db", "foods.json"), "utf-8")
    foods = JSON.parse(foods)
    res.send(foods)
})




app.post("/users", (req, res) => {
    const filePath = path.join(process.cwd(), "src", "db", "users.json")
    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    const newUser = {
        id: (users.at(-1)?.id || 0) + 1,
        ...req.body
    }

    users.push(newUser)
    fs.writeFileSync(filePath, JSON.stringify(users, null, 4));

    res.status(201).json({
        message: "User added",
        data: newUser
    })
})

app.post("/orders", (req, res) => {
    const { id } = req.params

    const filePath = path.join(process.cwd(), "src", "db", "orders.json")
    let orders = JSON.parse(fs.readFileSync(filePath, "utf-8") )

    const newOrder = {
        id: (orders.at(-1)?.id || 0) + 1,
        userId: Number(id),
        ...req.body
    }

    orders.push(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 4));

    res.status(201).json({
        message: "order added",
        data: newOrder
    })
})







app.listen(PORT, () => console.log("run........"))