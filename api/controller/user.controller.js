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
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM user WHERE id = ?", [uid], (err, user) => {
      if (err) {
        res.json(err);
      }
      res.send(user);
    });
  });
};

controller.updateUser = (req, res) => {
  const { uid } = req.params;
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("UPDATE user set ? WHERE id = ?", [data, uid], (err, user) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      res.json(user);
    });
  });
};

module.exports = controller;
