import mongoose from "mongoose";
const HourSchema = new mongoose.Schema(
    {
        hourNumbers:[ 
            { 
                number: Number, 
                unavailableDates: {
                    type: [{
                        date:{
                            type:Date,
                            require:true
                        },
                        name:{
                            type:String,
                            require:true
                        },
                        hallName:{
                            type:String,
                            require:true
                        },
                        department:{
                            type:String,
                            require:true
                        },
                        reason:{
                            type:String,
                            require:true
                        },
                        hourNo:{
                            type:Number,
                            require:true
                        },
                    }]
                }
            }
        ]
    },
    { timestamps: true }
);

const Hour = mongoose.model("Hour", HourSchema);
export default Hour