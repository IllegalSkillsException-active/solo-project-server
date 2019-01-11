const Model = require('../models/index');
const { Appointment, Slot } = Model;
const Nexmo = require("nexmo");

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => {
        console.log(appointments);
        res.json(appointments)});
  },
  create(req, res) {
    const requestBody = req.body;
    console.log(req.body);

    const newslot = new Slot({
      slot_time: requestBody.time,
      slot_date: requestBody.date,
      created_at: Date.now()
    });
    
    newslot.save();

    // Creates a new record from a submitted form

    const newappointment = new Appointment({
      firstName: requestBody.firstName,
      lastName:requestBody.lastName,
      email: requestBody.email,
      phone: requestBody.phone,
      sex:requestBody.sex,
      details:requestBody.details,
      time:requestBody.time,
      date:requestBody.date,
      massageType: requestBody.massageType, 
      HotStoneMassage:requestBody['Hot Stone Massage'], 
      JoJoAcupressureFacial:requestBody['JoJo Acupressure Facial'],
      CraniosacralTherapy:requestBody['Craniosacral Therapy'], 
      RosehipAcupressureFacial:requestBody['Rosehip Acupressure Facial'],
      ReflexologyFootTreatment:requestBody['Reflexology Foot Treatment'],
      Sauna:requestBody.Sauna,
      appointmentDuration:requestBody.appointmentDuration,
      slots: newslot._id
    });

    const nexmo = new Nexmo({
      apiKey: "5873ed7d",
      apiSecret: "B4Jd3ECQKeGKMJwo"
    });

    let msg =
      requestBody.firstName +
      " " +
      "this message is to confirm your appointment at" +
      " " +
      requestBody.time + 
      " " + 
      "on" + " " + requestBody.date +".";

    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      console.log(requestBody);
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));

      const from = '12075601497';
      const to = '18016388958';

      nexmo.message.sendSms(from, to, msg, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      });
    });
  }
};

module.exports = appointmentController;