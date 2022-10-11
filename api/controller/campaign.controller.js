const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM campaign", (err, campaign) => {
      if (err) {
        res.json(err);
      }
      // res.render("campaign", {
      //   data: campaign,
      // });
      console.log(campaign);
      res.send(campaign);
    });
  });
};

module.exports = controller;
