const connectDb = require('./db/db.connect')
const Event = require('./models/event.models'); 
const cors = require('cors')

connectDb()

const express = require('express')
const app = express()
app.use(express.json());
app.use(cors())


const Addevent = async(newevent)=>{
    try{
        const event = new Event(newevent)
        const savedevent = await event.save()
        console.log(savedevent)
        return savedevent
    }catch(error){
        console.log("Error while pushing data",error)
    }
}

app.post('/events',async(req,res)=>{
    try{
        const savedevent = await Addevent(req.body)
        if(savedevent){
            res.status(200).json({message:"Event is saved succesfully :",savedevent})
        }else{
            res.status(404).json({message:"Error while saving event"})
        }
    }catch(error){
        res.status(500).json({error:'Error occur while saving a post'})
    }
})

const ReadAllEvent = async()=>{
    try{
        const events = await Event.find()
        console.log(events)
        return events
    }catch(error){
        console.log("Error while reading event",error)
    }
}

app.get('/events', async(req,res)=>{
    try{
        const events = await ReadAllEvent()
        if(events){
            res.status(200).json(events)
        }else{
            res.status(404).json({message:"No Event Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error while reading events"})
    }
})

const readeventbyId = async(eventId)=>{
    try{
        const event = await Event.findOne({_id:eventId})
        console.log(event)
        return event
    }catch(error){
        console.log("Error while getting Id")
    }
}

app.get('/event/:eventId', async(req,res)=>{
    try{
        const event = await readeventbyId(req.params.eventId)
        if(event){
            res.status(200).json(event)
        }else{
            res.status(404).json({message:"No Event Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error while reading events"})
    }
})

const readByName = async(eventName)=>{
    try{
        const event = await Event.findOne({eventName:eventName})
        console.log(event)
        return event
    }catch(error){
        console.log("Error while search by name",error)
    }
}

app.get('/eventName/:eventName',async(req,res)=>{
    try{
        const event = await readByName(req.params.eventName)
        if(event){
            res.status(200).json(event)
        }else{
            res.status(400).json({message:"No Data Found"})
        }
    }catch{
        res.status(500).json({error:"Error while reading events"})
    }
})

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Server is running on: ${PORT}`)
})