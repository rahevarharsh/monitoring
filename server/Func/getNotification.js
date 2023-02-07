const case_schema = require('../Models/case_schema')

const getNotification = async (caseIDList) => {
    // console.log('In fun');

    // console.log(caseIDList);
    // let temp = []
    // // const l = await caseIDList.map(async (id) => {temp.push(await case_schema.findOne({ case_id: id }))})

    // temp =  await case_schema.findOne({ case_id: { $in: caseIDList } })
    // // console.log(await case_schema.findOne({ case_id: { $in: caseIDList } }));
    //  req.parseArr = temp

     const users = await case_schema.find({ case_id :{$in:caseIDList} });
     return users
}

module.exports = getNotification


// case_schema.findOne({ case_id: { $in: caseIDList } }, (error, users) => {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log(users.notifications)
    //         temp.push(users.notifications)
    //     }
    // });