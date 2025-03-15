const express = require('express');
const fs = require('fs'); 
const os = require('os');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    
    for (const [name, iface] of Object.entries(interfaces)) {
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                // Skip Hamachi (25.x.x.x)
                if (config.address.startsWith('25.')) continue;
                // Skip ZeroTier 
                if (name.startsWith('zt') || name.toLowerCase().includes('zerotier')) continue;
                return config.address;
            }
        }
    }
    return '127.0.0.1';
}
const LOCAL_IP = getLocalIp();
const PORT = 3000;
app.listen(PORT, LOCAL_IP,() => {
   console.log(`Server is running on http://${LOCAL_IP}:${PORT}`);
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
app.post('/save-java', (req, res) => {
    const { fileName, content } = req.body;
    const filePath = path.join(__dirname, 'saved_classes', fileName);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            res.status(500).send('Error saving file');
        } else {
            res.status(200).send('File saved successfully');
        }
    });
});

app.post('/save-cs', (req, res) => {
    const { fileName, content } = req.body;
    const filePath = path.join(__dirname, 'saved_cs_classes', fileName);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            res.status(500).send('Error saving file');
        } else {
            res.status(200).send('File saved successfully');
        }
    });
});

app.get('/list-files', (req, res) => {
    const directory = path.join(__dirname, 'saved_classes');

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Error reading directory');
        } else {
            res.status(200).json(files);
        }
    });
});
app.get('/list-cs-files', (req, res) => {
    const directory = path.join(__dirname, 'saved_cs_classes');

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Error reading directory');
        } else {
            res.status(200).json(files);
        }
    });
});

app.get('/get-file', (req, res) => {
    const { fileName } = req.query;
    const filePath = path.join(__dirname, 'saved_classes', fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            res.status(200).send(data);
        }
    });
});
app.get('/get-cs-file', (req, res) => {
    const { fileName } = req.query;
    const filePath = path.join(__dirname, 'saved_cs_classes', fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            res.status(200).send(data);
        }
    });
});

app.get('/java-code/cars', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'Cars.java')));
app.get('/java-code/delivery_car', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'DeliveryCar.java')));
app.get('/java-code/off_road', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'OffRoad.java')));
app.get('/java-code/race_car', (req, res) => sendJavaFile(res, path.join(__dirname, 'java_src', 'RaceCar.java')));

app.get('/cs-code/cars', (req, res) => sendJavaFile(res, path.join(__dirname, 'cs_src', 'Cars.cs')));
app.get('/cs-code/delivery_car', (req, res) => sendJavaFile(res, path.join(__dirname, 'cs_src', 'DeliveryCar.cs')));
app.get('/cs-code/off_road', (req, res) => sendJavaFile(res, path.join(__dirname, 'cs_src', 'Offroad.cs')));
app.get('/cs-code/race_car', (req, res) => sendJavaFile(res, path.join(__dirname, 'cs_src', 'RaceCar.cs')));

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

