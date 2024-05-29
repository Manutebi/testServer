const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la solicitud de datos
app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://api.airtable.com/v0/appb8gjqLDyJb8THM/tblz2QVyGSNMOS0BY', {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
