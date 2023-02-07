const mongoose = require("mongoose");


const phase = new mongoose.Schema({
  start_at: Date,
  documents: String, // single file
  end_at:  Date
})

const userSchema = new mongoose.Schema({
  /*
  taluka find({taluka : "patan"})
  unique need to store for easy fetching of all case details for nodal;
  */
  case_id: {
    type: String,
  },
  // ?????
  police_officer_id: {
    type: String,
  },
  // ??????
  nodal_officer: {
    type: String,
  },
  // ?????
  notifications: [
    {
      name:String,
      nodal_id:String,
      suggestion: String
    }
  ],

  fir_pdf: {
    type: String,
  },

  phase1: [phase],
  phase2: [phase],
  phase3: [phase],
  phase4: [phase],
  phase5: [phase],
  phase6: [phase],
  phase7: [phase],
  phase8: [phase],
  phase9: [phase]
});



module.exports = mongoose.model("case", userSchema);
