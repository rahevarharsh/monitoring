const case_schema = require('../Models/case_schema')

const dataInsertion = async() => {
    const data = new case_schema({
        case_id: "1082",
        // ?????
        police_officer_id: "harshrahevar80@gmail.com",
        // ??????
        nodal_officer: "harshrahevar38@gmail.com",
        // ?????
    
        fir_pdf: "test.pdf",

        phase1: {
            start_at:new Date()
        }

    })

    await data.save();
    console.log('IN Test case  '+Date.now().toLocaleString());
    
}
module.exports = dataInsertion