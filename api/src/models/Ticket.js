import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
{
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 0,
  },

  sold: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ['active', 'draft', 'soldout'],
    default: 'active',
  },
},
{ timestamps: true }
);

export default mongoose.model('Ticket', ticketSchema);