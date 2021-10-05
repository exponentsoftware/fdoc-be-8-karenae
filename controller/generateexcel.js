const db = require("../../models");
const User = db.user;

const excel = require("exceljs");

const download = (req, res) => {
    const users = await User.findAll()


    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("User");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "username", key: "title", width: 25 },
      { header: "email", key: "email", width: 25 },
      { header: "phone", key: "phone", width: 10 },
      {header: "TotalTodos", key :"TotalTodos", width:20}
    ];

    users.for(obj=>{
        
    })
    // Add Array Rows
    worksheet.addRows();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tutorials.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });

};