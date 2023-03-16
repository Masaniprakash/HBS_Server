import Hall from '../models/hallModel.js'
import Hour from '../models/hoursModel.js'

export const createHall=async(req,res,next)=>{
    try {
        const find=await Hall.findOne({name:req.body.name})
        if(find){
            res.status(401).json({message:"Hall name exists"})
        }else{
            const newHall =await new Hall(req.body)
            let saveHall=await newHall.save()
            let item1 ={hourNumbers:[{number:1}]}
            let item2 ={hourNumbers:[{number:2}]}
            let item3 ={hourNumbers:[{number:3}]}
            let item4 ={hourNumbers:[{number:4}]}
            let item5 ={hourNumbers:[{number:5}]}
            let item6 ={hourNumbers:[{number:6}]}
            let item7 ={hourNumbers:[{number:7}]}
            try {
                let AddHours1= await new Hour(item1)
                let saveHour1=await AddHours1.save()
                await Hall.findByIdAndUpdate(saveHall._id,{$push:{hours:saveHour1._id}},{new:true})
                let AddHours2= await new Hour(item2)
                let saveHour2=await AddHours2.save()
                await Hall.findByIdAndUpdate(saveHall._id,{$push:{hours:saveHour2._id}},{new:true})
                let AddHours3= await new Hour(item3)
                let saveHour3=await AddHours3.save()
                await Hall.findByIdAndUpdate(saveHall._id,{$push:{hours:saveHour3._id}},{new:true})
                let AddHours4= await new Hour(item4)
                let saveHour4=await AddHours4.save()
                await Hall.findByIdAndUpdate(saveHall._id,{$push:{hours:saveHour4._id}},{new:true})
                let AddHours5= await new Hour(item5)
                let saveHour5=await AddHours5.save()
                await Hall.findByIdAndUpdate(saveHall._id,{$push:{hours:saveHour5._id}},{new:true})
                let AddHours6= await new Hour(item6)
                let saveHour6=await AddHours6.save()
                await Hall.findByIdAndUpdate(saveHall._id,{$push:{hours:saveHour6._id}},{new:true})
                let AddHours7= await new Hour(item7)
                let saveHour7=await AddHours7.save()
                await Hall.findByIdAndUpdate(saveHall._id,{$push:{hours:saveHour7._id}},{new:true})
            } catch (error) {
                next(error)
            }
            
            res.status(201).json([saveHall])
        }
    } catch (error) {
        next(error)
    }
}

export const updateHall=async(req,res,next)=>{
    try {
        let updateHall=await Hall.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateHall)
    } catch (error) {
        next(error)
    }
}
export const getByName=async(req,res,next)=>{
    try {
        let updateHall=await Hall.findOne({name:req.body.name})
        res.status(200).json(updateHall)
    } catch (error) {
        next(error)
    }
}

export const deleteHall=async(req,res,next)=>{
    try {
        await Hall.findByIdAndDelete(req.params.id)
        res.status(200).json("Hall is deleted")
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await Hall.findById(req.params.id)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const getAll=async(req,res,next)=>{
    try {
        const get=await Hall.find()
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

/*not use Promise.all it error as "Converting circular structure to JSON\n    --> starting at object with 
constructor 'Topology'\n    |     property 's' -> object with constructor 'Object'\n  | property 
'sessionPool' -> object with constructor 'ServerSessionPool'\n    --- property 'topology' closes the circle"*/
export const getHallHours = async (req,res,next)=>{
    try {
        const hall=await Hall.findById(req.params.id)
        const lists = await  Promise.all(hall.hours.map(hour=>{
            return Hour.findById(hour)
        }))
        
        res.status(200).json(lists)

    } catch (error) {
        next(error)
    }
}

export const getHallHoursAdmin = async (req,res,next)=>{
    try {
        const hall=await Hall.findById(req.params.id)
        const list = await  Promise.all(hall.hours.map(hour=>{
            return Hour.findById(hour)
        }))
        let updateHour=await list.updateOne({"_id":req.params.id},{$pull:{
            "hourNumbers.$[].unavailableDates":{date:req.body.dates}
        }})
        res.status(200).json({data:updateHour,message:"hoursNo deleted "})
        
        res.status(200).json(list)

    } catch (error) {
        next(error)
    }
}