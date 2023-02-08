const case_schema = require('../Models/case_schema')

const dataInsertion = async () => {
    const data = new case_schema({
        case_id: "1082",
        // ?????
        police_officer_id: "harshrahevar80@gmail.com",
        // ??????
        nodal_officer: "harshrahevar38@gmail.com",
        // ?????

        fir_pdf: "test.pdf",
        notifications: [
            {
                name: "Lav patel",
                nodal_id: "1082",
                suggestion: "it is test case from lav"
            },
            {
                name: "chandrakant jha",
                nodal_id: "1020",
                suggestion: "take look on it ..."
            },
            {
                name: "Shanu kumar",
                nodal_id: "1026",
                suggestion: "forwrad xyz file"
            },
            {
                name: "Mobin Desia",
                nodal_id: "1010",
                suggestion: "take investigation at her home"
            },
            {
                name: "Ayush Patel",
                nodal_id: "1037",
                suggestion: "Hu ajju sikhu 6u la.."
            }
        ],
        phase1: {
            start_at: new Date()
        }

    })

    await data.save();
    console.log('IN Test case  ' + Date.now().toLocaleString());

}
module.exports = dataInsertion