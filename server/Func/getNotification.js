const case_schema = require('../Models/case_schema')

const getNotification = (caseIDList) => {
    console.log('In fun');

    console.log(caseIDList);
    let temp = []
    // const l = await caseIDList.map(async (id) => {temp.push(await case_schema.findOne({ case_id: id }))})

    case_schema.findOne({ case_id: { $in: caseIDList } }, (error, users) => {
        if (error) {
            console.error(error);
        } else {
            console.log(users.notifications)
            temp.push(users.notifications)
        }
    });
    return temp
}

module.exports = getNotification