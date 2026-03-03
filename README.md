Timer Pro PWA ⏱️

Una aplicación web progresiva (PWA) de temporizador, diseñada específicamente para entrenamientos, estudio o productividad. Está optimizada para dispositivos móviles, con una interfaz oscura y controles táctiles fáciles de usar.
🚀 Características principales

    Interfaz "Dark Mode": Diseño amigable con la vista para entornos oscuros o gimnasios.

    Preparación Inteligente: Cuenta regresiva previa de 10 segundos (con silencio total y pitido solo en los últimos 3 segundos).

    Alertas Auditivas:

        "Halfway there" al llegar a la mitad del tiempo.

        "Ten seconds" cuando faltan 10 segundos.

    Feedback Visual y Sonoro: Pitidos configurables (tipo 'square') para los últimos 3 segundos y al finalizar.

    Instalable (PWA): Puedes añadirlo a la pantalla de inicio de tu celular para usarlo como una app nativa.

    Modo Offline: Gracias al Service Worker, la app funciona incluso sin conexión a internet una vez instalada.

📁 Estructura del Proyecto
Plaintext

├── index.html       # Estructura principal
├── style.css        # Estilos y diseño (CSS)
├── script.js        # Lógica del temporizador y audio
├── sw.js            # Service Worker para funcionamiento offline
├── manifest.json    # Configuración de PWA (App instalable)
└── icon.png         # Icono de la aplicación

🛠 Tecnologías utilizadas

    HTML5 / CSS3 / JavaScript (ES6+): Código nativo, sin dependencias externas.

    Web Audio API: Para generar pitidos precisos de alta calidad.

    Web Speech API: Para la síntesis de voz ("Halfway there", "Ten seconds").

    PWA API: Para la capacidad de instalación y caché offline.

📱 Cómo instalarlo en tu celular

    Android: Abre el sitio en Chrome, toca el menú de tres puntos y selecciona "Instalar aplicación" o "Añadir a pantalla de inicio".

    iOS (Safari): Abre el sitio, toca el botón "Compartir" (el cuadrado con la flecha) y selecciona "Añadir al inicio".

📜 Licencia

Este proyecto es de código abierto. ¡Siéntete libre de modificarlo, mejorarlo o adaptarlo a tus necesidades!