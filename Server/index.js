const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const userModel=require('./Models/user')
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.post('/add', (req, res) => {
    const task = req.body.task;
    console.log('Received task:', task);
    if (!task) {
        console.error('No task provided');
        return res.status(400).json({ error: 'Task is required' });
    }
    TodoModel.create({ task: task })
        .then(result => {
            console.log('Task saved:', result);
            res.json(result);
        })
        .catch(err => {
            console.error('Error saving task:', err);
            res.status(500).json(err);
        });    
});
app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
    console.log("get sucessfully");
})
app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    console.log(id);
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json)
    .catch(err=>res.json(err))
})
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Task not found' });
            }
            console.log("Deleted successfully");
            res.json({ message: 'Task deleted successfully' });
        })
        .catch(err => {
            console.error('Error deleting task:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});
app.post('/register',(req,res)=>{
    userModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
});
app.post('/login',(req,res)=>{
    const{email,password}=req.body;
    userModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("success")
            }
            else{
                res.json("THe password is incorrect")
            }
        }else{
            res.json("User does not exist")
        }
    })
})
const port=3001;
app.listen(port, () => {
    console.log(`Server running at the ${port}`);
});
