# Web Gratis para ONG - Formulario de Inscripción con Integración a Notion

Este proyecto consiste en una página web sencilla para que las ONG puedan inscribirse y solicitar servicios web gratuitos. Los datos del formulario (nombre y email) se envían a una base de datos de Notion.

## Características

*   **Frontend:**
    *   Diseño atractivo y responsivo con Tailwind CSS.
    *   Formulario de inscripción con validación básica.
    *   Envío de datos del formulario al backend mediante `fetch`.
    *   Muestra mensajes de éxito o error al usuario.
*   **Backend (Node.js con Express):**
    *   Recibe los datos del formulario desde el frontend.
    *   Se conecta a la API de Notion para crear una nueva página en una base de datos específica.
    *   Manejo de errores y respuestas adecuadas al frontend.
    *   Uso de variables de entorno para la clave de la API de Notion.

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener lo siguiente instalado:

*   **Node.js:** (v16 o superior) - [https://nodejs.org/](https://nodejs.org/)
*   **npm:** (viene con Node.js)

## Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2.  **Instalar las dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**

    *   Crea un archivo `.env` en la raíz del proyecto.
    *   Agrega las siguientes variables:

        ```
        NOTION_API_KEY=tu_clave_de_api_de_notion
        ```

        Reemplaza `tu_clave_de_api_de_notion` con tu clave de la API de Notion.

        **¿Cómo obtener la clave de la API de Notion?**

        1.  Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations).
        2.  Crea una nueva integración.
        3.  Obtén el "Internal Integration Token".  Este es tu `NOTION_API_KEY`.

4.  **Configurar el ID de la base de datos de Notion:**

    *   En el archivo `server.js`, busca la siguiente línea:

        ```javascript
        const DATABASE_ID = '1ea698de62cd80519bdce96041741bea'; // Reemplaza con tu ID
        ```

        Reemplaza `'1ea698de62cd80519bdce96041741bea'` con el ID de tu base de datos de Notion.

        **¿Cómo obtener el ID de la base de datos de Notion?**

        1.  Crea una base de datos en Notion.
        2.  Comparte la base de datos con tu integración (la que creaste para obtener la clave de la API).
        3.  La URL de tu base de datos tendrá el siguiente formato:

            ```
            https://www.notion.so/<nombre_de_usuario>/<ID_DE_LA_BASE_DE_DATOS>?v=<otro_id>
            ```

            El `<ID_DE_LA_BASE_DE_DATOS>` es el valor que necesitas.

        **Importante:** Asegúrate de que las propiedades "Nombre" (tipo Title o Rich Text) y "Email" (tipo Email o Rich Text) existan en tu base de datos de Notion y que coincidan exactamente con los nombres utilizados en el código (`server.js`).

## Ejecución

1.  **Iniciar el servidor backend:**

    ```bash
    node server.js
    ```

    Esto iniciará el servidor en el puerto 3000 (o el puerto que hayas configurado).

2.  **Abrir la página web:**

    Abre tu navegador web y ve a `http://localhost:3000`.

## Uso

1.  Rellena el formulario de inscripción con tu nombre y email.
2.  Haz clic en el botón "Enviar".
3.  Si todo está configurado correctamente, verás un mensaje de éxito y una nueva página se creará en tu base de datos de Notion con los datos del formulario.

## Estructura del Proyecto
