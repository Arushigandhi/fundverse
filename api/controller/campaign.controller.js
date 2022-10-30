const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM campaign", (err, campaign) => {
      if (err) {
        res.json(err);
      }
      res.send(campaign);
    });
  });
};

controller.getById = (req, res) => {
  const { uid } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM campaign WHERE id = ?",
      [uid],
      (err, campaign) => {
        res.json(campaign);
      }
    );
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
      res.json(campaign);
    });
  });
};

controller.createDonation = (req, res) => {
  const data = req.body;
  console.log(data);
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO donation set ?", [data], (err, donation) => {
      // update campaign table
      conn.query(
        "UPDATE campaign SET currentAmount = currentAmount + ?, numberOfDonors = numberOfDonors + 1 WHERE id = ?",
        [data.amountDonated, data.campaignId],
        (err, campaign) => {
          if (err) {
            console.log(err);
            res.json(err);
          }
          console.log("success", campaign);
        }
      );
      if (err) {
        console.log(err);
        res.json(err);
      }
      res.json(donation);
    });
  });
};

controller.getAllDonations = (req, res) => {
  const { uid } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM donation WHERE campaignId = ?",
      [uid],
      (err, donation) => {
        if (err) {
          res.json(err);
        }
        res.send(donation);
      }
    );
  });
};

controller.addComment = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO comment set ?", [data], (err, comment) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      res.json(comment);
    });
  });
};

controller.getAllComments = (req, res) => {
  const { uid } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "select * from user, comment where user.id = comment.userId and comment.campaignId = ?",
      [uid],
      (err, comment) => {
        if (err) {
          res.json(err);
        }
        res.send(comment);
      }
    );
  });
};

controller.getAllCategories = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT category FROM campaign ", (err, category) => {
      if (err) {
        res.json(err);
      }
      res.send(category);
    });
  });
};

module.exports = controller;
