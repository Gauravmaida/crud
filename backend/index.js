import express from "express";
import mongoose from "mongoose";
import cors from "cors"


const app = express();
const PORT = 9090;

app.use(express.json())
app.use(cors())


const crudSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
})


const model = new mongoose.model("data", crudSchema);

app.post("/createuser", (req, res) => {
    model.create(req.body).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    })
})

app.get("/getuser", (req, res) => {
    model.find({}).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    })
})

app.get("/getuser/:id", (req, res) => {
    const id = req.params.id;
    model.findById({ _id: id }).then(user => {
        res.json(user)
    }).catch(err => {
        res.json(err)
    })
})

app.put("/updateuser/:id", (req, res) => {
    const id = req.params.id;
    model.findByIdAndUpdate({ _id: id }, { name: req.body.name, age: req.body.age, email: req.body.email }).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    model.findByIdAndDelete({ _id: id }).then(user => {
        res.json(user)
    }).catch(
        err => {
            res.json(err)
        }
    )
})

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/crud");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}
connectToDatabase()
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})