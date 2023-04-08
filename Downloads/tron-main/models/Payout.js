const mongoose = require('mongoose');
const { Schema } = mongoose;

const payoutSchema = new Schema({
  investor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payout = mongoose.model('Payout', payoutSchema);

module.exports = Payout;
