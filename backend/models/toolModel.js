const { Schema, model } = require('../connection');

const toolSchema = new Schema({
    name: String,
    description: String,
    category: String,
    status: Boolean,
    logo: String,
    features: [String],
    pricing: {
        free: Boolean,
        startingPrice: String,
        trial: Boolean,
        subscription: {
            monthly: String,
            yearly: String
        }
    },
    platform: {
        web: Boolean,
        windows: Boolean,
        mac: Boolean,
        linux: Boolean,
        ios: Boolean,
        android: Boolean
    },
    api: {
        available: Boolean,
        documentation: String
    },
    rating: {
        type: Number,
        default: 0
    },
    performance: {
        speed: {
            type: Number,
            min: 1,
            max: 5
        },
        accuracy: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    website: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    featured: {
        type: Boolean,
        default: false
    }
});

module.exports = model("Tools", toolSchema);