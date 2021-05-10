const express = require('express');

const app = express();
const jsonBody = express.json({ limit: '5mb' })
const port = 9000;

const users = [{
    name: 'Խաչատուր',
    surName: 'Մարտիրոսյան',
    email: 'grantovich91@mail.ru',
    password: '12345xxx'
}];

const tasks = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
})

app.post('/users', jsonBody, (req, res) => {
    console.log(req.body)
    let user = users.find((user) => user.email === req.body.email)

    if (user) {
        res.status(401)
        res.send('Տվյալ Էլ հասցեով հաճախոր գոյություն ունի!!!')
    }
    else {

        users.push(req.body)
        res.status(201)
        res.send({ valid: 'Դուք բարեհաջող գրանցվել եք:' })
    }

})

app.post('/users/information', jsonBody, (req, res) => {
    let user = users.find((user) => user.email === req.body.email)

    if (user && user.password === req.body.password) {
        res.send({
            name: user.name,
            sureName: user.surName,
            isGuard: 'true'
        })
    }
    else if (user && user.password !== req.body.password) {
        res.status(401)
        res.send('Գաղտնաբառը սխալ է լրացված')
    }
    else {
        res.status(404)
        res.send('Տվյալ Էլ հասցեով հաճախորդ գոյություն չունի')
    }
})

app.post('/todo/tasks', jsonBody, (req, res) => {
    tasks.push(req.body)
    res.send({ valid: 'true' })
})

app.get("/todo/all/tasks", (req, res) => {
    res.send({ task: JSON.stringify(tasks) })
})

app.delete("/todo/task/delete/:id", (req, res) => {
    let index = tasks.findIndex((task) => task.id == req.params.id)
    tasks.splice(index, 1)
    res.send({ valid: 'true' })
})

app.put("/todo/task/edit", jsonBody, (req, res) => {
    let index = tasks.findIndex((task) => task.id == req.body.id)
    tasks.splice(index, 1, req.body)
    res.send({ valid: 'true' })
})

app.patch("/todo/edit/task/done", jsonBody, (req, res) => {
    let task = tasks.find((task) => task.id == req.body.id)
    task.checked = req.body.checked
    res.send({ valid: "true" })
})


app.listen(port, () => {
    console.log(`http://localhost${port}`)
})
