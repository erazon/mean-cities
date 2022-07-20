const mongoose= require("mongoose");

const citySchema= mongoose.Schema({
    city: String,
    zip: String,
    loc: { 
        y: Number, 
        x: Number
    },
    location: {
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    pop: Number,
    state: String
});

mongoose.model(process.env.CITY_MODEL, citySchema, process.env.DB_CITIES_COLLECTION)