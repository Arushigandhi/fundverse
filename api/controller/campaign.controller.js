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

controller.getById = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM campaign WHERE id = ?", [id], (err, campaign) => {
      res.json(campaign);
    });
  });
};

controller.create = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO campaign set ?", [data], (err, campaign) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      console.log(campaign);
      res.json(campaign);
    });
  });
};

module.exports = controller;
