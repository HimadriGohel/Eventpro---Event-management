import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    name: String,
    type: String, // paid | free

    price: {
      type: Number,
      default: 0,
    },

    qty: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    checkedIn: {
      type: Number,
      default: 0,
    },
 
    perOrder: Number,
    fee: String,

    saleStart: String,
    saleEnd: String,
  },
  { _id: false }
);
 
const venueSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    capacity: Number,
    layout: String,
    images: [String],
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: String,

    location: String,

    image: String,

    startDate: Date,

    endDate: Date,

    price: {
      type: Number,
      default: 0,
    },

    organizer: String,

    venue: venueSchema,

    tickets: [ticketSchema],

    visibility: {
      type: String,
      default: 'public',
    },

    searchable: {
      type: Boolean,
      default: true,
    },

    marketplaceListing: {
      type: Boolean,
      default: true,
    },

    onlineEvent: {
      platform: String,
      meetingUrl: String,
    },

    status: {
      type: String,
      default: 'draft',
      enum: ['draft', 'published', 'cancelled'],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model(
  'Event',
  eventSchema
);

export default Event;