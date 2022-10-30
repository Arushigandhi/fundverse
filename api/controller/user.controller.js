const controller = {};

controller.createUser = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO user set ?", [data], (err, user) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      res.json(user);
    });
  });
};

controller.getUser = (req, res) => {
  const { uid } = req.params;
  console.log("uid isssss", uid);
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM user WHERE id = ?", [uid], (err, user) => {
      if (err) {
        res.json(err);
      }
      res.send(user);
    });
  });
};

module.exports = controller;
