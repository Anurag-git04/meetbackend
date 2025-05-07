const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String // URL to speaker image
    }
});

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    eventDetail: {
        type: String,
        required: true
    },
    eventImg: {
        type: String // URL to event image
    },
    eventType: {
        type: String,
        enum: ['Online', 'Offline'],
        required: true
    },
    dressCode: {
        type: String
    },
    ageRestriction: {
        type: Number, // Changed from Boolean to Number (e.g., 18)
        default: 0
    },
    eventTags: {
        type: [String],
        enum: ['marketing', 'digital', 'building connection']
    },
    eventVenue: {
        type: String
    },
    eventDateStart: {
        type: Date,
        required: true
    },
    eventDateEnd: {
        type: Date,
        required: true
    },
    location: {
        type: String
    },
    ticketPrice: {
        type: Number
    },
    speakers: [speakerSchema]
});

module.exports = mongoose.model('Event', eventSchema);
