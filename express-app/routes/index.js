var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const steelData = [
  { name: "SS400", aliases: ["JIS G3101", "ASTM A36"] },
  { name: "S355J2", aliases: ["EN 10025-2", "ASTM A572 Grade 50"] },
  { name: "Q235B", aliases: ["GB/T 700-2006", "ASTM A36"] },
  {
    name: "AISI 4140",
    aliases: ["EN 19", "DIN 1.7225", "4140", "SAE 4140"],
    chemicalComposition: {
      "Chromium": 0.12,
      "Nickel": 0.17,
      "Molybdenum": 0.025,
      "Carbon": 0.0008,
      "Manganese": 0.02,
      "Phosphorus": 0.0005,
      "Sulfur": 0.0003,
      "Silicon": 0.0075,
      "Nitrogen": 0.001,
      "Iron": 0.6549
    }
  },
  {
    name: "316 SS",
    aliases: ["SAE 316 SS", "AISI 316 SS"],
    chemicalComposition: {
      "Chromium": 0.17,
      "Nickel": 0.12,
      "Molybdenum": 0.025,
      "Carbon": 0.0008,
      "Manganese": 0.02,
      "Phosphorus": 0.0005,
      "Sulfur": 0.0003,
      "Silicon": 0.0075,
      "Nitrogen": 0.001,
      "Iron": 0.6549
    }
  },
];

router.get("/api/steel", (req, res) => {
  const { name } = req.query;

  const steel = steelData.find((s) =>
    [s.name, ...s.aliases].includes(name)
  );

  if (steel) {
    res.json({
      name: steel.name,
      chemicalComposition: steel.chemicalComposition,
    });
  } else {
    res.status(404).json({ message: "Steel grade not found" });
  }
});

module.exports = router;
