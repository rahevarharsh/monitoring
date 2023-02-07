const nodal_schema = require('../Models/nodal_schema')
const bcrypt = require('bcrypt')
const dataInsertionNodal = async () => {
    const hash_pass = await bcrypt.hash('12345678', 10);
    const data = new nodal_schema({
        email: "harshrahevar38@gmail.com",
        password: hash_pass,
        nodal_ofiicer_name: "Rahevar Harshdeep V.",
        case_ids: [{ case_id: "1079" }, { case_id: "1082" }],
    })
    await data.save()
}
module.exports = dataInsertionNodal