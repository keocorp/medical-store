/* ==========================================================================
   CATÁLOGO DE PRODUCTOS
   --------------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que editar para añadir, quitar o
   modificar equipos. Las cards del catálogo, las de la página de inicio y
   el modal de detalles se generan automáticamente desde aquí.

   Para añadir un equipo:
     1. Copia su foto a  images/productos/  (ej. images/productos/xx.webp)
     2. Copia su ficha técnica a  assets/pdf/  (ej. assets/pdf/marca-xx.pdf)
     3. Agrega un objeto nuevo en PRODUCTOS siguiendo el formato de abajo.
        (Campo opcional "modeloDetalle": texto que reemplaza a "Modelo XXX"
        bajo el título del modal, útil cuando una ficha cubre varios modelos.)
   ========================================================================== */

/* Categorías (clave -> nombre visible). Las claves se usan en los filtros
   y en el menú "Productos" (productos.html#clave). */
const CATEGORIAS = {
    anestesia: "Anestesia",
    laboratorio: "Laboratorio",
    refrigeracion: "Refrigeración",
    calentadores: "Calentadores de sangre",
    esterilizadores: "Esterilizadores de sobremesa",
    "tecnologia-informacion": "Tecnología de la información"
};

/* true  = las cards y el modal muestran la marca (ej. "Frimed · PN45V")
   false = solo se muestra el modelo (ej. "PN45V") */
const MOSTRAR_MARCA = true;

/* IDs de los equipos que se muestran en "Productos Destacados" (inicio). */
const DESTACADOS = ["ax500", "poleax"];

const PRODUCTOS = [
    {
    "id": "d2mini",
    "nuevo": true,
    "nombre": "Sistema de identificación microbiana y antibiograma",
    "marca": "DL Biotech",
    "modelo": "D2 Mini",
    "categoria": "laboratorio",
    "imagen": "images/productos/dl-d2mini.webp",
    "ficha": "assets/pdf/dl-d2mini-ficha.pdf",
    "catalogo": "assets/pdf/dl-d2mini-catalogo.pdf",
    "etiquetaFicha": "Ficha técnica D2 Mini (PDF)",
    "etiquetaCatalogo": "Folleto D2 Mini (PDF)",
    "resumen": "Sistema de sobremesa para identificación microbiana y pruebas de susceptibilidad a antimicrobianos (ID/AST). Lee y analiza tarjetas para generar resultados de identificación, concentración mínima inhibitoria (MIC) e interpretación S/I/R.",
    "specs": [
        [
            "Identificación",
            "Colorimetría"
        ],
        [
            "Susceptibilidad a antimicrobianos",
            "Turbidimetría"
        ],
        [
            "Capacidad de lectura",
            "Al menos 50 tarjetas por hora"
        ],
        [
            "Dimensiones con pantalla cerrada",
            "215 × 258 × 215 mm"
        ],
        [
            "Dimensiones con pantalla abierta",
            "215 × 258 × 378 mm"
        ],
        [
            "Peso neto",
            "4,4 kg"
        ],
        [
            "Alimentación",
            "100–240 V CA, 50/60 Hz"
        ],
        [
            "Condiciones de funcionamiento",
            "5–30 °C; humedad relativa ≤80 %"
        ],
        [
            "Muestreador automático",
            "Opcional; 50 placas por hora según ficha técnica de 2025"
        ]
    ],
    "caracteristicas": [
        "Identificación de más de 500 microorganismos según la ficha técnica",
        "Reportes con valores MIC e interpretación S/I/R",
        "Seguimiento de mecanismos de resistencia como MRSA, VRE y ESBL",
        "Formato de informe personalizable y funciones estadísticas",
        "Soporte LIS y WHONET descrito en el folleto",
        "Consultar las tarjetas, reactivos y accesorios incluidos en la configuración cotizada"
    ]
},
    {
        id: "ax500",
        enPromocion: true,
        nombre: "Máquina de anestesia",
        marca: "COMEN",
        modelo: "AX-500",
        categoria: "anestesia",
        imagen: "images/productos/comen-ax500.webp",
        ficha: "assets/pdf/comen-ax500.pdf",
        catalogo: "assets/pdf/comen-ax400-ax500-catalogo.pdf",
        etiquetaFicha: "Ficha técnica AX-500 (PDF)",
        resumen: "Equipo para anestesia perioperatoria con pantalla táctil TFT de 10,4 pulgadas y diseño modular. Consulta con nuestro equipo la configuración, accesorios y disponibilidad del AX-500.",
        specs: [
            ["Pantalla", "Táctil TFT de 10,4 pulgadas; 800 × 600 píxeles"],
            ["Dimensiones", "678 × 580 × 1370 mm"],
            ["Peso", "90 kg (configuración estándar)"],
            ["Modos estándar", "Manual/Spont, VCV y PCV"],
            ["Modos opcionales", "PRVC, SIMV-VC, SIMV-PC, SIMV-PRVC, CPAP/PSV, PSVPro; CPB opcional"],
            ["Alimentación", "100–240 V CA, 50/60 Hz"],
            ["Aplicación", "Anestesia perioperatoria"],
            ["Monitorización modular", "BIS, gases anestésicos y CO₂: opcionales, según configuración"],
            ["Evacuación de gases (AGSS)", "Opcional"]
        ],
        caracteristicas: [
            "Interfaz disponible en español y otros idiomas",
            "Medición de flujo mecánica",
            "Absorbedor de CO₂ de 2000 ml con bypass estándar",
            "Confirmar los módulos, vaporizadores y accesorios incluidos antes de cotizar"
        ]
    },
    /* ---------------------------- FRIMED ---------------------------- */
    {
        id: "pn45v",
        categoria: "refrigeracion",
        marca: "Frimed",
        modelo: "PN45V",
        nombre: "Refrigerador para laboratorio y farmacia de 450 litros",
        imagen: "images/productos/pn45v.webp",
        ficha: "assets/pdf/frimed-pn45v.pdf",
        resumen: "Refrigerador de alta capacidad con puerta de vidrio y control digital de temperatura, ideal para laboratorios y farmacias que requieren una conservación uniforme y estable.",
        specs: [
            ["Capacidad", "450 litros"],
            ["Rango de temperatura", "+2 °C a +12 °C (preajustado a +4 °C)"],
            ["Estantes", "3 de acero inoxidable, regulables en altura"],
            ["Dimensiones externas (A×P×H)", "700 × 800 × 1840 mm"],
            ["Peso neto", "124 kg"],
            ["Voltaje", "230 V / 50 Hz"],
            ["Potencia", "271 W"],
            ["Gas refrigerante", "R290, libre de CFC/HCFC"]
        ],
        caracteristicas: [
            "Puerta de vidrio doble autocerrante con cerradura de llave",
            "Iluminación LED con encendido automático al abrir la puerta",
            "Refrigeración por aire forzado para máxima uniformidad de temperatura",
            "Desescarche totalmente automático",
            "Panel de control con sistema de alarmas y memoria de últimas alarmas",
            "Data logger con puerto USB para descargar registros de temperatura"
        ]
    },
    {
        id: "fs15v",
        categoria: "refrigeracion",
        marca: "Frimed",
        modelo: "FS15V",
        nombre: "Refrigerador para farmacia de 150 litros",
        imagen: "images/productos/fs15v.webp",
        ficha: "assets/pdf/frimed-fs15v.pdf",
        resumen: "Refrigerador compacto para farmacia con puerta de vidrio y panel de control full touch, pensado para espacios reducidos sin sacrificar control ni seguridad.",
        specs: [
            ["Capacidad", "150 litros"],
            ["Rango de temperatura", "+2 °C a +12 °C (preajustado a +4 °C)"],
            ["Estantes", "2 de acero inoxidable, regulables en altura"],
            ["Dimensiones externas (A×P×H)", "600 × 600 × 1360 mm"],
            ["Peso neto", "78 kg"],
            ["Voltaje", "230 V / 50 Hz"],
            ["Potencia", "150 W"],
            ["Gas refrigerante", "R290, libre de CFC/HCFC"]
        ],
        caracteristicas: [
            "Panel de control TP-1 full touch con sistema de alarmas",
            "Puerta de vidrio doble autocerrante con cerradura de llave",
            "Iluminación LED con encendido automático al abrir la puerta",
            "Refrigeración por aire forzado y desescarche automático",
            "Data logger con puerto USB para descargar registros",
            "Contacto remoto libre de tensión para alarma"
        ]
    },
    {
        id: "fs20v",
        categoria: "refrigeracion",
        marca: "Frimed",
        modelo: "FS20V",
        nombre: "Refrigerador para farmacia de 200 litros",
        imagen: "images/productos/fs20v.webp",
        ficha: "assets/pdf/frimed-fs20v.pdf",
        resumen: "Refrigerador de tamaño intermedio para farmacia, con puerta de vidrio, tres estantes y panel de control full touch.",
        specs: [
            ["Capacidad", "200 litros"],
            ["Rango de temperatura", "+2 °C a +12 °C (preajustado a +4 °C)"],
            ["Estantes", "3 de acero inoxidable, regulables en altura"],
            ["Dimensiones externas (A×P×H)", "600 × 600 × 1560 mm"],
            ["Peso neto", "86 kg"],
            ["Voltaje", "230 V / 50 Hz"],
            ["Potencia", "155 W"],
            ["Gas refrigerante", "R290, libre de CFC/HCFC"]
        ],
        caracteristicas: [
            "Panel de control TP-1 full touch con sistema de alarmas",
            "Puerta de vidrio doble autocerrante con cerradura de llave",
            "Iluminación LED con encendido automático al abrir la puerta",
            "Refrigeración por aire forzado y desescarche automático",
            "Data logger con puerto USB para descargar registros",
            "Contacto remoto libre de tensión para alarma"
        ]
    },
    {
        id: "af140v",
        categoria: "refrigeracion",
        marca: "Frimed",
        modelo: "AF140V",
        nombre: "Refrigerador para farmacia de 1,400 litros",
        imagen: "images/productos/af140v.webp",
        ficha: "assets/pdf/frimed-af140v.pdf",
        resumen: "Refrigerador de gran capacidad con dos puertas de vidrio, diseñado para farmacias hospitalarias y almacenes que manejan grandes volúmenes de medicamentos.",
        specs: [
            ["Capacidad", "1,400 litros"],
            ["Rango de temperatura", "+2 °C a +12 °C (preajustado a +4 °C)"],
            ["Puertas", "2 de vidrio doble autocerrantes"],
            ["Estantes", "8 de acero inoxidable, regulables en altura"],
            ["Dimensiones externas (A×P×H)", "1400 × 800 × 1990 mm"],
            ["Peso neto", "226 kg"],
            ["Voltaje", "230 V / 50 Hz"],
            ["Potencia", "230 W"],
            ["Gas refrigerante", "R290, libre de CFC/HCFC"]
        ],
        caracteristicas: [
            "Panel de control TP-1 full touch con sistema de alarmas",
            "Cerradura de llave y sellado magnético en los cuatro lados",
            "Iluminación LED con encendido automático al abrir la puerta",
            "Refrigeración por aire forzado y desescarche automático",
            "Data logger con puerto USB para descargar registros",
            "Ruedas con patas estabilizadoras ajustables"
        ]
    },
    {
        id: "fp30v2",
        categoria: "refrigeracion",
        marca: "Frimed",
        modelo: "FP30V/2",
        nombre: "Refrigerador combinado de 150 / 150 litros",
        imagen: "images/productos/fp30v2.webp",
        ficha: "assets/pdf/frimed-fp30v2.pdf",
        resumen: "Refrigerador de dos compartimentos independientes (superior e inferior), cada uno con su propio compresor, control de temperatura y puerta de vidrio.",
        specs: [
            ["Capacidad", "150 L superior + 150 L inferior"],
            ["Rango de temperatura", "+2 °C a +15 °C en cada compartimento (preajustado a +4 °C)"],
            ["Estantes", "3 por compartimento, regulables en altura"],
            ["Dimensiones externas (A×P×H)", "600 × 700 × 2030 mm"],
            ["Peso neto", "125 kg"],
            ["Voltaje", "230 V / 50 Hz"],
            ["Potencia", "150 W + 150 W"],
            ["Gas refrigerante", "R290, libre de CFC/HCFC"]
        ],
        caracteristicas: [
            "Dos compartimentos totalmente independientes, con dos compresores",
            "Dos puertas de vidrio doble autocerrantes con cerraduras de llave",
            "Panel de control LGK-2 digital o TP-1 full touch, a elección",
            "Data logger con puerto USB para ambos compartimentos",
            "Desescarche totalmente automático en ambos compartimentos",
            "Iluminación LED con encendido automático al abrir la puerta"
        ]
    },

    /* ---------------------------- KEEWELL --------------------------- */
    {
        id: "qw618",
        categoria: "calentadores",
        marca: "Keewell",
        modelo: "QW618",
        nombre: "Calentador de sangre e infusión",
        imagen: "images/productos/qw618-oficial.jpg",
        ficha: "assets/pdf/keewell-qw618.pdf",
        resumen: "Calentador seco de sangre e infusiones para aplicaciones clínicas rutinarias y de gran volumen: transfusiones durante o después de una cirugía, emergencias y nutrición enteral/parenteral.",
        specs: [
            ["Temperatura", "37 °C a 42 °C"],
            ["Precisión de temperatura", "± 0.5 °C"],
            ["Capacidad de calentamiento", "Hasta 6000 ml/hora"],
            ["Tiempo de calentamiento", "Menos de 45 s (de 20 °C a 36 °C)"],
            ["Alarma de baja temperatura", "36 °C"],
            ["Alimentación", "AC 230 V ± 10 % / 50-60 Hz, máx. 250 VA"],
            ["Protección contra líquidos", "IPX4 (a prueba de salpicaduras)"],
            ["Dimensiones (A×P×H)", "100 × 170 × 210 mm"],
            ["Peso neto", "1.3 kg"]
        ],
        caracteristicas: [
            "Control por microprocesador con autochequeos permanentes y alarmas de falla",
            "Cilindro de calentamiento seco acanalado: usa extensiones o vías IV estándar de bajo costo",
            "Tres sensores de temperatura independientes con display numérico en 0.1 °C",
            "Protección contra sobrecalentamiento y alarma por falla de sensor",
            "Función de prueba de la alarma de alta temperatura, útil para el mantenimiento",
            "Operación continua las 24 horas. Soporte de infusión no incluido"
        ]
    },
    {
        id: "ft70",
        categoria: "calentadores",
        marca: "Keewell",
        modelo: "FT70",
        nombre: "Calentador de fluidos",
        imagen: "images/productos/ft70-oficial.jpg",
        ficha: "assets/pdf/keewell-ft70.pdf",
        resumen: "Calentador de fluidos económico y compacto para infusión rutinaria a flujo lento o medio, nutrición enteral y parenteral, e infusión en niños y neonatos.",
        specs: [
            ["Temperatura", "39 °C (ajuste de fábrica)"],
            ["Precisión de temperatura", "± 2.0 °C"],
            ["Tiempo de calentamiento", "Aprox. 3 min (de 20 °C a 39 °C)"],
            ["Protección contra sobrecalentamiento", "42 °C"],
            ["Alarma de baja temperatura", "37 °C"],
            ["Alimentación", "AC 100-240 V / 50-60 Hz, máx. 50 VA"],
            ["Protección contra líquidos", "IPX2"],
            ["Perfil de calentamiento", "1000 mm, para tubo IV de 3.5 a 5.0 mm de D.E."],
            ["Dimensiones (A×P×H)", "70 × 25 × 90 mm"],
            ["Peso neto", "0.7 kg"]
        ],
        caracteristicas: [
            "Control de temperatura automático con operación de un solo toque",
            "Sistema abierto: acepta tubo IV estándar, sin descartables especiales",
            "Calienta hasta el paciente: el tubo IV queda envuelto, sin pérdida de calor",
            "Puede usarse solo o junto a bombas de infusión o de alimentación",
            "Parte aplicada tipo BF, protegida contra desfibrilación",
            "Tamaño compacto y operación continua"
        ]
    },
    {
        id: "ft2800",
        categoria: "calentadores",
        marca: "Keewell",
        modelo: "FT2800",
        nombre: "Calentador de sangre e infusión de 2 canales",
        imagen: "images/productos/ft2800-oficial.jpg",
        ficha: "assets/pdf/keewell-ft2800.pdf",
        resumen: "Calentador seco de alto rendimiento con dos canales independientes para fluidos de infusión, sangre y hemoderivados, líquidos de diálisis y soluciones de nutrición o enjuague.",
        specs: [
            ["Canales", "2, independientes o combinables"],
            ["Temperatura", "33 °C a 41 °C"],
            ["Precisión de temperatura", "± 1.0 °C"],
            ["Tiempo de calentamiento", "Aprox. 2 min (de 20 °C a 36 °C)"],
            ["Alarma de baja temperatura", "32 °C"],
            ["Alimentación", "AC 100-240 V / 50-60 Hz, máx. 180 VA"],
            ["Protección contra líquidos", "IPX2"],
            ["Perfil de calentamiento", "1400 mm, para tubo IV de 3.5 a 5.0 mm de D.E."],
            ["Dimensiones (A×P×H)", "200 × 130 × 250 mm"],
            ["Peso neto", "2.3 kg"]
        ],
        caracteristicas: [
            "Cada canal funciona con su propia temperatura y control, o se combinan para mayor capacidad",
            "Doble protección independiente contra sobrecalentamiento con corte automático",
            "Alarma visual y acústica por alta temperatura, baja temperatura o falla de sensor",
            "Pantalla LED grande: temperatura programada, temperatura real, tiempo y fallas",
            "Sistema abierto: acepta tubo IV estándar, sin descartables especiales",
            "Autochequeos permanentes y operación continua las 24 horas. Soporte de infusión no incluido"
        ]
    },

    /* ---------------------------- STURDY ---------------------------- */
    {
        id: "poleax",
        categoria: "esterilizadores",
        marca: "Sturdy",
        modelo: "Serie Poleax",
        modeloDetalle: "Serie Poleax · Modelos SA-230, SA-232 y SA-232V",
        nombre: "Autoclave de sobremesa serie Poleax",
        imagen: "images/productos/poleax.webp",
        ficha: "assets/pdf/sturdy-poleax.pdf",
        resumen: "Autoclaves compactos de 16 litros, con diseños de microprocesador y mecánico tradicional, que ahorran energía y agua y requieren poco mantenimiento. Sus paneles de control son simples, pensados para tareas básicas de esterilización.",
        specs: [
            ["Modelos", "SA-230 · SA-232 · SA-232V"],
            ["Capacidad de la cámara", "16 litros"],
            ["Tamaño de la cámara", "Ø 230 × 410 mm"],
            ["Temperatura", "SA-230 y SA-232: 126 °C<br>SA-232V: 118 a 134 °C"],
            ["Tiempo de esterilización", "SA-230: 0 a 60 min (perilla)<br>SA-232: 18 min sin envolver / 33 min envuelto<br>SA-232V: 4, 15 o 30 min"],
            ["Dimensiones (An × Al × Pr)", "SA-230 y SA-232: 335 × 430 × 510 mm<br>SA-232V: 382 × 614 × 398 mm"],
            ["Peso neto", "SA-230 y SA-232: 15.5 kg<br>SA-232V: 23.5 kg"],
            ["Voltaje", "SA-230: 230 V<br>SA-232: 230 / 110 V<br>SA-232V: 230 V"],
            ["Potencia", "SA-230: 1400 W (7 A)<br>SA-232: 1400 W (230 V) / 1200 W (110 V)<br>SA-232V: 1200 W (5.3 A)"],
            ["Llenado de agua", "Manual, en cada sesión"],
            ["Consumo de agua por ciclo", "SA-230 y SA-232: 350 a 400 cc<br>SA-232V: 300 a 450 cc"],
            ["Tipo", "Sobremesa (SA-230, SA-232) · Vertical (SA-232V)"]
        ],
        caracteristicas: [
            "Panel de control sencillo y mantenimiento fácil",
            "Protección contra sobrecalentamiento y contra exceso de presión",
            "Válvula de seguridad de presión",
            "Manómetro de presión y temperatura al frente del equipo",
            "SA-232 y SA-232V: luces indicadoras de cada fase del ciclo",
            "SA-232V: bloqueo automático de puerta por presión (opcional)",
            "Fabricados según 93/42/EEC (Clase IIB), 2014/68/EU (PED), EN 13060 e ISO 13485",
            "El modelo SA-232X, con bloqueo de puerta y tanque de agua, tiene su propia ficha"
        ]
    },
    {
        id: "sa232x",
        categoria: "esterilizadores",
        marca: "Sturdy",
        modelo: "SA-232X",
        nombre: "Autoclave de sobremesa con microprocesador",
        imagen: "images/productos/sa232x.webp",
        ficha: "assets/pdf/sturdy-sa232x.pdf",
        resumen: "Autoclave de sobremesa de 16 litros con control por microprocesador, panel simple, bloqueo automático de puerta por presión y tanque de agua integrado. Solo se rellena el agua, se elige el programa y se inicia el ciclo.",
        specs: [
            ["Sistema de control", "Microprocesador"],
            ["Volumen de la cámara", "16 litros (4.2 galones)"],
            ["Tamaño de la cámara", "Ø 230 × 410 mm"],
            ["Dimensiones (An × Al × Pr)", "501 × 406 × 537 mm"],
            ["Peso neto", "28 kg"],
            ["Temperatura", "118 a 134 °C"],
            ["Tiempo de esterilización", "4 / 15 / 30 min"],
            ["Programas", "121 °C (1.2 bar): 30 min envuelto · 15 min sin envolver<br>134 °C (2.1 bar): 15 min envuelto · 4 min sin envolver"],
            ["Llenado de agua", "Tank-Man: tanque de 4200 cc; la perilla se abre y cierra manualmente para llenar la cámara"],
            ["Consumo de agua por ciclo", "300 a 450 cc"],
            ["Voltaje", "230 V / 110 V, 50/60 Hz"],
            ["Potencia sin secado (estándar)", "6.1 A / 1400 W (230 V)<br>11 A / 1200 W (110 V)"],
            ["Potencia con secado (opcional)", "7.7 A / 1763 W (230 V)<br>14.2 A / 1563 W (110 V)"],
            ["Secado (opcional)", "Escape y drenaje automático, secado a puerta cerrada con bomba de aire. Tiempo de secado: 18 min"]
        ],
        caracteristicas: [
            "Control simple: se rellena el agua, se elige el programa y el ciclo se realiza de forma automática",
            "Luces indicadoras de cada fase y aviso cuando la esterilización se completa",
            "Bloqueo automático de puerta por presión y cierre de seguridad en la puerta",
            "Protección contra sobrecalentamiento (corta la electricidad) y contra exceso de presión",
            "Opcionales: escape y drenaje automático, secado a puerta cerrada (mejora la eficiencia del secado en un 90 %) y filtro de aire HEPA (retiene el 99.97 % de las partículas)",
            "Accesorios: canasta, juego de bandejas, caja, bolsas de esterilización, filtro de agua RO, destilador de agua y Cham-Mate",
            "Cumple CE, PED 2014/68/EU, EN 61010-1, EN 61010-2-040, EN 61326-1, ISO 13485 y RoHS"
        ]
    },

    /* Soluciones Novarad descritas en los folletos suministrados. */
    {
        "id": "novapacs",
        "categoria": "tecnologia-informacion",
        "marca": "Novarad",
        "modelo": "NovaPACS",
        "modeloDetalle": "Software de imagenología médica",
        "nombre": "Sistema PACS para imágenes médicas",
        "imagen": "images/productos/novapacs.webp",
        "ficha": "assets/pdf/novarad-novapacs.pdf",
        "tituloSpecs": "Funciones de la solución",
        "etiquetaFicha": "Ver folleto (PDF)",
        "resumen": "NovaPACS es una solución de imagenología para visualizar, interpretar y comparar estudios médicos. Ofrece flujos de trabajo personalizables y opciones de almacenamiento adaptables a las necesidades de hospitales y centros de diagnóstico.",
        "specs": [
            [
                "Visualización",
                "Ecografías, rayos X, TC, RM y TEP"
            ],
            [
                "Procesamiento",
                "Herramientas de manipulación de imágenes y procesamiento mediante GPU"
            ],
            [
                "Visualización avanzada",
                "Herramientas 3D y 4D, MPR/MIP y fusión de imágenes"
            ],
            [
                "Acceso web",
                "Visor HTML5 y funciones de lectura, dictado e informes basados en la web"
            ],
            [
                "Almacenamiento",
                "Opciones locales, externas, híbridas, virtualizadas y en la nube"
            ],
            [
                "Mamografía",
                "Módulo opcional de visualización y protocolos para mamografía y tomosíntesis"
            ]
        ],
        "caracteristicas": [
            "Listas y flujos de trabajo personalizables para radiología",
            "Enrutamiento inteligente con Intellirouting y gestión remota de preferencias",
            "Herramientas de medición, anotación y comparación de imágenes",
            "Automatización de tareas como sincronización de series, ajuste de tamaño y cine",
            "Herramientas de control de calidad y revisión por colegas",
            "Intercambio de imágenes e información con médicos dentro y fuera del centro"
        ]
    },
    {
        "id": "novaris",
        "categoria": "tecnologia-informacion",
        "marca": "Novarad",
        "modelo": "Nova RIS",
        "modeloDetalle": "Software de gestión de radiología",
        "nombre": "Sistema de información radiológica RIS",
        "imagen": "images/productos/novaris.webp",
        "ficha": "assets/pdf/novarad-novaris.pdf",
        "tituloSpecs": "Funciones de la solución",
        "etiquetaFicha": "Ver folleto (PDF)",
        "resumen": "Nova RIS ayuda a organizar el recorrido del paciente y los flujos de trabajo del departamento de radiología, desde la programación de citas hasta la distribución de resultados. Integra herramientas de coordinación, informes y análisis de gestión.",
        "specs": [
            [
                "Programación",
                "Solicitud de citas por el paciente y recordatorios configurables"
            ],
            [
                "Integración",
                "Sincronización entre RIS, PACS, modalidad y sistema financiero"
            ],
            [
                "Interoperabilidad",
                "HL7 bidireccional e integración con historias clínicas electrónicas"
            ],
            [
                "Informes",
                "Herramientas de transcripción, dictado y reconocimiento de voz"
            ],
            [
                "Distribución de resultados",
                "Impresión, fax, correo electrónico, mensajes de texto o HCE mediante HL7"
            ],
            [
                "Gestión",
                "Análisis de procedimientos, productividad y médicos remitentes"
            ],
            [
                "Opcionales",
                "CryptoChart, AlertView, formularios electrónicos personalizados y gestión de facturación financiera"
            ]
        ],
        "caracteristicas": [
            "Lista de trabajo de modalidad incorporada",
            "Alertas para contraindicaciones, procedimientos no programados, preautorizaciones y estudios urgentes",
            "Portal para médicos remitentes con acceso a imágenes e informes y herramientas de programación",
            "Interfaz basada en la web para gestionar el flujo de trabajo de radiología",
            "Codificación CPT e ICD-10 integrada",
            "CryptoChart permite compartir imágenes e informes mediante código QR como opción adicional",
            "AlertView ofrece alertas de texto seguras para teléfonos móviles como opción adicional"
        ]
    }
];
