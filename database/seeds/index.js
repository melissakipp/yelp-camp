const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../../models/campground');

mongoose.connect('mongodb://mongodb:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    try {
        await Campground.deleteMany({});
            for (let i = 0; i < 300; i++) {
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
            const camp = new Campground({
                // Your User ID
                author: '60abbd47a1b89c007d4fe9fe',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: 'Street art scenester edison bulb, letterpress squid vice farm-to-table hoodie chartreuse la croix trust fund kale chips single-origin coffee.',
                price,
                geometry: {
                    type: "Point",
                    coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude,
                    ]
                },
                image: [
                    {
                        url: 'https://res.cloudinary.com/portfolio-mjk/image/upload/v1621973015/samples/animals/three-dogs.jpg',
                        filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                    },
                    {
                        url: 'https://res.cloudinary.com/portfolio-mjk/image/upload/v1621973015/samples/animals/three-dogs.jpg',
                        filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                    }
                ]
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