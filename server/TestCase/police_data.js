const officaerschema = require('../Models/officaerschema')
const bcrypt = require('bcrypt')
const dataInsertionPolice = async () => {
    const hash_pass = await bcrypt.hash('12345678', 10);
    const data = new officaerschema({
        email: "harshrahevar80@gmail.com",
        password: hash_pass,
        police_ofiicer_name: "HD Developer",
        // bakki hai 
        case_ids: [{ case_id: "1079" }, { case_id: "1082" }],
        police_station_name: "A division",
        district: "Patan",
        taluka: "Patan"
    })
    await data.save()
}
module.exports = dataInsertionPolice