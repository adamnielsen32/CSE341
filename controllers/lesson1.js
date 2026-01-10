const madelineRoute = (req, res) => {
  res.send('Madeline Nielsen');
};

const everettRoute = (req, res) => {
  res.send('Everett Nielsen');
};

module.exports = { madelineRoute, everettRoute };