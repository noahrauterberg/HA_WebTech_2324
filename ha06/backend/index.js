const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const columns = require("./data/columns.json");
const tags = require("./data/tags.json");

const app = express();
const port = 3000;

let taskIdCounter = Math.max(...columns.map(col => Math.max(...col.tasks.map(task => parseInt(task.id.slice(1)))) )) + 1;

function getTask(taskId) {
    for (const col of columns) {
        for (let i=0; i<col.tasks.length; i++) {
            if (col.tasks[i].id == taskId) {
                return [col.tasks, i];
            }
        }
    }
    return [null, null];
}

///////////////////////////
// Server setup
///////////////////////////

app.use(express.static("../frontend/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile("../frontend/dist/index.html");
});

///////////////////////////
// CRUD operations
///////////////////////////

app.get("/api/counter", (req,res) => {
    console.log("get counter");
    res.status(200).json({taskIdCounter: taskIdCounter});
})

app.get("/api/tags", (req, res) => {
    console.log("get tags");
    res.status(200).json(tags);
})

app.get("/api/columns", (req, res) => {
    console.log("get columns");
    res.status(200).json(columns);
})

app.post("/api/tasks", async (req, res) => {
    console.log(req.body);
    let column = req.body.column;
    let title = req.body.title;
    let text = req.body.text;
    let tags = req.body.taskTags;


    if (column == undefined || title == undefined || text == undefined || tags == undefined) {
        res.status(400).send("Task is not sufficiently defined");
        return;
    }

    let newTask = {
        id: `t${taskIdCounter}`,
        title: title,
        text: text,
        tags: tags
    }

    if (column != 0 && column != 1 && column != 2) {
        res.status(404).send(`Coludn't find column with id ${new_col}`);
        return;
    }

    columns[column].tasks.push(newTask);

    res.status(200).json({id: `t${taskIdCounter}`});
    taskIdCounter++;
})

app.put("/api/tasks/:id", (req, res) => {
    const id = req.params.id;
    let [tasks, index] = getTask(id);

    if (!tasks || index == null) {
        res.status(404).send(`Couldn't find task with id ${id}`);
        return;
    }

    tasks[index].title = req.body.title;
    tasks[index].text = req.body.text;
    tasks[index].tags = req.body.taskTags;
    
    res.status(200).send();
})

app.delete("/api/tasks/:id", (req, res) => {
    console.log("delete");
    const id = req.params.id;
    let [tasks, index] = getTask(id);

    if (!tasks || index == null) {
        res.status(404).send(`Couldn't find task with id ${id}`);
        return;
    }

    tasks.splice(index, 1);
    res.status(200).send();
})

app.put("/api/move-task/:id", (req, res) => {
    const id = req.params.id;
    let [tasks, index] = getTask(id);

    if (!tasks || index == null) {
        res.status(404).send(`Couldn't find task with id ${id}`);
        return;
    }

    const new_col = req.body.newColumnId;
    if (new_col != 0 && new_col != 1 && new_col != 2) {
        res.status(404).send(`Coludn't find column with id ${new_col}`);
        return;
    }

    const task = tasks.splice(index, 1)[0];

    columns[new_col].tasks.push(task);
    res.status(200).send();
})

///////////////////////////
// Start the server
///////////////////////////

app.listen(port, () => {
    console.log("listening on port 3000");
});
