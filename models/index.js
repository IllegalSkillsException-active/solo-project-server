const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;


  const slotSchema = new Schema ({
    slot_time: String,
    slot_date: String,
    created_at: Date
  });

const Slot = model('Slot', slotSchema);

const appointmentSchema = new Schema({
  // id should not be here
//   id: ObjectId,
  firstName: String,
  lastName:String, 
  email: String,
  phone: Number,
  sex:String,
  time:String,
  appointmentDuration:String,
  details:String, 
  date:String,
  slots:{type: ObjectId, ref: 'Slot'},
  created_at: Date, 
  HotStoneMassage:Boolean, 
  JoJoAcupressureFacial:Boolean, 
  CraniosacralTherapy:Boolean, 
  RosehipAcupressureFacial:Boolean, 
  ReflexologyFootTreatment:Boolean, 
  Sauna:Boolean
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = {
  Appointment, Slot
};