require("dotenv").config(); // Carga las variables de entorno del archivo .env
const express = require("express");
const app = express();
const port = 3000; // O cualquier otro puerto libre

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());

// Configura Express para servir archivos estáticos (tu index.html y style.css)
// Esto permite que tu navegador cargue index.html cuando visites http://localhost:3000
app.use(express.static("."));

// Tu ruta /api/subscribe donde el frontend enviará los datos
app.post("/api/subscribe", async (req, res) => {
    const { nombre, email } = req.body; // Obtén los datos del formulario

    console.log("Datos recibidos en el backend:", nombre, email);

    // ** Aquí va la lógica para enviar los datos a Notion **
    const NOTION_API_KEY = process.env.NOTION_API_KEY; // Obtén la clave de .env
    const DATABASE_ID = ""; // Reemplaza con tu ID

    if (!NOTION_API_KEY || !DATABASE_ID) {
        console.error("NOTION_API_KEY o DATABASE_ID no configurados.");
        return res
            .status(500)
            .json({
                success: false,
                message: "Configuración del servidor incompleta.",
            });
    }

    try {
        const notionResponse = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28", // Usa la versión de la API
            },
            body: JSON.stringify({
                parent: {
                    database_id: DATABASE_ID,
                },
                properties: {
                    // ** Mapea aquí los datos a las propiedades de tu base de datos **
                    // Asegúrate de que los nombres de propiedad ("Nombre", "Email") coincidan EXACTAMENTE
                    // con los de tu base de datos en Notion y que la estructura JSON sea correcta
                    // según el tipo de propiedad (Title, Rich Text, Email, etc.).
                    Nombre: {
                        // Reemplaza "Nombre" con el nombre real de tu columna Title/Rich Text
                        title: [
                            // O "rich_text" si es ese tipo
                            {
                                text: {
                                    content: nombre,
                                },
                            },
                        ],
                    },
                    Email: {
                        // Reemplaza "Email" con el nombre real de tu columna Email/Rich Text
                        email: email, // O la estructura para "rich_text" si aplica
                    },
                },
            }),
        });

        const notionData = await notionResponse.json();

        if (notionResponse.ok) {
            console.log("Página creada en Notion:", notionData);
            res.json({
                success: true,
                message: "Inscripción guardada en Notion!",
            });
        } else {
            console.error("Error al enviar a Notion:", notionData);
            res.status(notionResponse.status).json({
                success: false,
                message: "Error al guardar en Notion.",
                details: notionData,
            });
        }
    } catch (error) {
        console.error("Error en el backend:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor.",
            error: error.message,
        });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
    console.log(
        `Abre http://localhost:${port} en tu navegador para ver el formulario.`
    );
});
