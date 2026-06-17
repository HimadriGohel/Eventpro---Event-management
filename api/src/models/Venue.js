import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    city: String,

    area: String,

    address: String,

    capacity: {
      type: Number,
      default: 0,
    },

    image: String,

    tags: [String],

    upcomingEvents: {
      type: Number,
      default: 0,
    },

    pastEvents: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'Venue',
  venueSchema
);