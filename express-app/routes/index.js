const { PythonShell } = require('python-shell');
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

router.get("/api/initial-composition", (req, res) => {
  const initialComposition = {
    "Chromium": 0.1479,
    "Nickel": 0.02,
    "Molybdenum": 0.005,
    "Carbon": 0.0001,
    "Manganese": 0.01,
    "Phosphorus": 0.0003,
    "Sulfur": 0.0002,
    "Silicon": 0.006,
    "Nitrogen": 0.0005,
    "Iron": 0.81
  }

  setTimeout(function () {
    res.json({
      name: "316 SS",
      initialComposition: initialComposition
    });
  }, 2000); // 3000ms = 3 seconds
});

router.get('/api/elements-to-add', (req, res) => {
  const options = {
    mode: 'text',
    pythonPath: 'C:\\Python311\\python.exe', // path to the Python executable
    pythonOptions: ['-u'], // unbuffered stdout and stderr
    scriptPath: '.', // path to the script
  };

  PythonShell.run('compute_added_elements.py', options).then(messages => {
    const stringArray = messages[21]
    const parsedArray = JSON.parse(stringArray);

    const initialComposition = {
      "Chromium": 0.1479,
      "Nickel": 0.02,
      "Molybdenum": 0.005,
      "Carbon": 0.0001,
      "Manganese": 0.01,
      "Phosphorus": 0.0003,
      "Sulfur": 0.0002,
      "Silicon": 0.006,
      "Nitrogen": 0.0005,
      "Iron": 0.81
    };

    const massesToAdd = {};
    for (const key in initialComposition) {
      massesToAdd[key] = parsedArray.shift();
    }

    res.json({
      finalWeight: messages[20],
      massesToAdd: massesToAdd
    })
  });
});

module.exports = router;
