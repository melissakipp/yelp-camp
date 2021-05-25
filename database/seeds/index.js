const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../../models/campground");

mongoose.connect("mongodb://mongodb:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    try {
        await Campground.deleteMany({});
            for (let i = 0; i < 50; i++) {
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
            const camp = new Campground({
                author: '60abbd47a1b89c007d4fe9fe',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                image: "https://source.unsplash.com/collection/482351",
                description: "Street art scenester edison bulb, letterpress squid vice farm-to-table hoodie chartreuse la croix trust fund kale chips single-origin coffee.",
                price
            })
            await camp.save();
        }
    }
    catch (err) {
        console.log(err);
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})