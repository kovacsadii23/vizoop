const express = require('express');
const fs = require('fs'); 
const os = require('os');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser'); 
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI is undefined. Check your environment variables.");
    process.exit(1);
}
mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

const classSchema = new mongoose.Schema({
    fileName: String,
    content: String
});
const diagramSchema = new mongoose.Schema({
  projectName: { type: String, required: true, unique: true },
  diagramData: { type: String, required: true }
});
const Diagram = mongoose.model('Diagram', diagramSchema);
const ClassFile = mongoose.model('ClassFile', classSchema);
const csClassFile = mongoose.model('csClassFile', classSchema);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function sendJavaFile(res, filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Java file not found');
        } else {
            res.send(data);
        }
    });
}
function sendCSFile(res, filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('CSharp file not found');
        } else {
            res.send(data);
        }
    });
}
app.post('/save-java', async (req, res) => {
    const { fileName, content } = req.body;
    
    try {
        const existingFile = await ClassFile.findOne({ fileName });
    
        if (existingFile) {
            existingFile.content = content; 
            await existingFile.save();
        } else {
            const newClassFile = new ClassFile({ fileName, content });
            await newClassFile.save();
        }
    
        res.status(200).send('Fájl sikeresen mentve!');
        } catch (error) {
        console.error(error);
        res.status(500).send('Hiba történt a fájl mentésekor.');
        }
  });

app.post('/save-cs', async (req, res) => {
    const { fileName, content } = req.body;

    try {
        const existingFile = await csClassFile.findOne({ fileName });
        
            if (existingFile) {
            existingFile.content = content; 
            await existingFile.save();
            } else {
            const newcsClassFile = new csClassFile({ fileName, content });
            await newcsClassFile.save();
            }
        
            res.status(200).send('Fájl sikeresen mentve!');
        } catch (error) {
            console.error(error);
            res.status(500).send('Hiba történt a fájl mentésekor.');
        }
});

app.get('/list-files', async (req, res) => {
    try {
      const files = await ClassFile.find().select('fileName -_id');
      res.json(files.map(file => file.fileName));
    } catch (error) {
      console.error(error);
      res.status(500).send('Hiba történt a fájlok lekérésekor.');
    }
  });
app.get('/list-cs-files', async (req, res) => {
    try {
        const files = await csClassFile.find().select('fileName -_id');
        res.json(files.map(file => file.fileName));
      } catch (error) {
        console.error(error);
        res.status(500).send('Hiba történt a fájlok lekérésekor.');
      }
});


app.get('/get-file', async (req, res) => {
    const { fileName } = req.query;
  
    try {
      const file = await ClassFile.findOne({ fileName });
      if (file) {
        res.send(file.content);
      } else {
        res.status(404).send('Fájl nem található.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Hiba történt a fájl betöltésekor.');
    }
  });
app.get('/get-cs-file', async (req, res) => {
    const { fileName } = req.query;
  
    try {
      const file = await csClassFile.findOne({ fileName });
      if (file) {
        res.send(file.content);
      } else {
        res.status(404).send('Fájl nem található.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Hiba történt a fájl betöltésekor.');
    }
});
app.post('/save-diagram', async (req, res) => {
  const { projectName, diagramData } = req.body;
  if (!projectName || !diagramData) return res.status(400).send("❌ projectName and diagramData are required.");

  try {
      const diagram = await Diagram.findOneAndUpdate(
          { projectName },
          { diagramData },
          { upsert: true, new: true }
      );
      res.status(200).send(`✅ Diagram '${projectName}' saved successfully.`);
  } catch (error) {
      console.error(error);
      res.status(500).send("❌ Error saving diagram.");
  }
});
app.get('/load-diagram', async (req, res) => {
  const { projectName } = req.query;
  if (!projectName) return res.status(400).send("❌ projectName is required.");

  try {
      const diagram = await Diagram.findOne({ projectName });
      if (diagram) res.json(JSON.parse(diagram.diagramData));
      else res.status(404).send("❌ Diagram not found.");
  } catch (error) {
      console.error(error);
      res.status(500).send("❌ Error loading diagram.");
  }
});

app.get('/java-code/cars', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'Cars.java')));
app.get('/java-code/delivery_car', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'DeliveryCar.java')));
app.get('/java-code/off_road', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'OffRoad.java')));
app.get('/java-code/race_car', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'RaceCar.java')));

app.get('/cs-code/cars', (req, res) => sendCSFile(res, path.join(__dirname, 'cs_src', 'Cars.cs')));
app.get('/cs-code/delivery_car', (req, res) => sendCSFile(res, path.join(__dirname, 'cs_src', 'DeliveryCar.cs')));
app.get('/cs-code/off_road', (req, res) => sendCSFile(res, path.join(__dirname, 'cs_src', 'Offroad.cs')));
app.get('/cs-code/race_car', (req, res) => sendCSFile(res, path.join(__dirname, 'cs_src', 'RaceCar.cs')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'main.html')));
app.get('/csharp', (req, res) => res.sendFile(path.join(__dirname, 'public/cs', 'csharp.html')));
app.get('/csharp/objects', (req, res) => res.sendFile(path.join(__dirname, 'public/cs', 'csobjects.html')));
app.get('/csharp/inheritance', (req, res) => res.sendFile(path.join(__dirname, 'public/cs', 'csinh.html')));
app.get('/csharp/class', (req, res) => res.sendFile(path.join(__dirname, 'public/cs', 'csclass.html')));
app.get('/csharp/abstract', (req, res) => res.sendFile(path.join(__dirname, 'public/cs', 'csabstract.html')));
app.get('/csharp/interface', (req, res) => res.sendFile(path.join(__dirname, 'public/cs', 'csinterface.html')));
app.get('/csharp/planner', (req, res) => res.sendFile(path.join(__dirname, 'public/cs', 'csplanner.html')));
app.get('/java', (req, res) => res.sendFile(path.join(__dirname, 'public/java', 'java.html')));
app.get('/java/class', (req, res) => res.sendFile(path.join(__dirname, 'public/java', 'class.html')));
app.get('/java/objects', (req, res) => res.sendFile(path.join(__dirname, 'public/java', 'objects.html')));
app.get('/java/inheritance', (req, res) => res.sendFile(path.join(__dirname, 'public/java', 'inheritance.html')));
app.get('/java/abstract', (req, res) => res.sendFile(path.join(__dirname, 'public/java', 'abstract.html')));
app.get('/java/interface', (req, res) => res.sendFile(path.join(__dirname, 'public/java', 'interface.html')));
app.get('/java/planner', (req, res) => res.sendFile(path.join(__dirname, 'public/java', 'planner.html')));

