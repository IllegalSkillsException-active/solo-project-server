const Model = require('../models/index');
const {Appointment, Slot} = Model;

const slotController = {
  all (req, res) {
    // Returns all Slots
      Slot.find({})
          .exec((err, slots) => res.json(slots))
  },
  create (req, res) {
    var requestBody = req.body;

    var newSlot = new Slot ({
      slot_time: requestBody.time,
      slot_date: requestBody.date.toDateString(),
      created_at: Date.now()
    });
    newSlot.save((err, saved) => {
      //Returns the new slot
      //after a successful save
      Slot
        .findOne({_id: saved._id})
        .exec((err, slot) => res.json(slot));
    })
  },
  findByDate (req, res) {
    var slot_date = req.body.date;
    console.log('slot date: ', date);
    //slot_date = '2017-11-09';

    //Returns all slot with present date
    Slot.find({})
        .where('slot_date').equals(date)
        .exec((err, slots) => res.json(slots));
  }
};

module.exports = slotController;