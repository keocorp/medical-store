/* ==========================================================================
   Textos de las páginas por línea (/lineas/...). Los modelos, fotos y
   especificaciones salen de js/productos-data.js; aquí solo va lo editorial.
   Usar solo datos de las fichas técnicas: nada de precios ni promesas nuevas.

   - comparar: claves de especificación para la tabla comparativa
     ("A|B" = usa A y, si el equipo no la tiene, B). null = sin tabla.
   - compromisos: false oculta la franja de instalación/garantía.
   ========================================================================== */
module.exports = {
    refrigeracion: {
        titulo: "Refrigeradores para farmacia y laboratorio en Perú | Frimed",
        h1: "Refrigeradores para farmacia y laboratorio",
        descripcion: "Refrigeradores Frimed para farmacia y laboratorio de 150 a 1,400 litros, con rango de +2 °C a +12 °C. Compara modelos y cotiza en Lima y todo el Perú.",
        intro: [
            "Refrigeradores Frimed para conservar medicamentos, reactivos y otros productos que requieren cadena de frío, con control digital de temperatura entre +2 °C y +12 °C.",
            "Hay cinco modelos: desde 150 litros para una farmacia pequeña hasta 1,400 litros para farmacias hospitalarias y almacenes. Todos tienen puerta de vidrio, estantes de acero inoxidable regulables y gas refrigerante R290.",
        ],
        comparar: ["Capacidad", "Rango de temperatura", "Estantes", "Dimensiones externas (A×P×H)", "Potencia"],
        criterios: [
            ["Capacidad", "Calcula el volumen que almacenas hoy y deja margen para crecer. El FS15V y el FS20V (150 y 200 litros) están pensados para farmacias y espacios reducidos; el PN45V (450 litros), para laboratorios y farmacias; el AF140V (1,400 litros), para farmacias hospitalarias y almacenes."],
            ["Espacio disponible", "Revisa ancho, fondo y alto del lugar. Los modelos FS15V y FS20V ocupan 60 × 60 cm; el AF140V, con dos puertas, necesita 1.40 m de ancho."],
            ["Uno o dos compartimentos", "El FP30V/2 tiene dos compartimentos de 150 litros, cada uno con su propio compresor y control, para separar productos que se conservan a temperaturas distintas."],
            ["Instalación eléctrica", "Todos los modelos funcionan a 230 V / 50 Hz. La potencia de cada uno figura en la tabla comparativa."],
        ],
        faq: [
            ["¿Qué rango de temperatura manejan?", "De +2 °C a +12 °C, preajustados a +4 °C. En el FP30V/2 cada compartimento llega hasta +15 °C."],
            ["¿Cuál conviene para una farmacia pequeña?", "El FS15V (150 litros) ocupa poco espacio. Si necesitas un estante más, el FS20V ofrece 200 litros con la misma base de 60 × 60 cm."],
            ["¿Tienen modelos de gran capacidad?", "Sí. El PN45V tiene 450 litros y el AF140V, con dos puertas de vidrio, 1,400 litros para farmacias hospitalarias y almacenes."],
        ],
        compromisos: true,
    },

    calentadores: {
        titulo: "Calentadores de sangre e infusión en Perú | Keewell",
        h1: "Calentadores de sangre e infusión",
        descripcion: "Calentadores de sangre y fluidos Keewell para quirófano, emergencias y neonatología. Compara el FT70, QW618 y FT2800 y cotiza en Perú.",
        intro: [
            "Calentadores Keewell que llevan la sangre y los fluidos de infusión a una temperatura cercana a la corporal antes de llegar al paciente.",
            "Hay tres modelos: el FT70, compacto, para infusión a flujo lento o medio y pacientes pediátricos y neonatos; el QW618, para transfusiones de gran volumen; y el FT2800, con dos canales independientes.",
        ],
        comparar: ["Temperatura", "Precisión de temperatura", "Tiempo de calentamiento", "Protección contra líquidos", "Peso neto"],
        criterios: [
            ["Flujo y volumen", "Para transfusiones durante o después de una cirugía y emergencias, el QW618 calienta hasta 6000 ml por hora. Para infusión rutinaria a flujo lento o medio, el FT70 es suficiente."],
            ["Número de vías", "El FT2800 tiene dos canales que funcionan por separado o combinados, útil cuando un mismo paciente recibe dos líneas."],
            ["Tiempo de calentamiento", "El QW618 pasa de 20 °C a 36 °C en menos de 45 segundos; el FT2800 en unos 2 minutos y el FT70 en unos 3 minutos."],
            ["Tamaño y traslado", "El FT70 mide 70 × 25 × 90 mm y pesa 0.7 kg; el QW618 pesa 1.3 kg y el FT2800, 2.3 kg."],
        ],
        faq: [
            ["¿Cuál se usa con neonatos?", "El FT70: según el fabricante, está pensado para infusión en niños y neonatos, además de nutrición enteral y parenteral."],
            ["¿Cuál conviene para quirófano o emergencias?", "El QW618, por su capacidad de hasta 6000 ml por hora, o el FT2800 si necesitas dos canales."],
            ["¿Tienen alarma de temperatura?", "Sí. Los tres modelos tienen alarma de baja temperatura, y el FT70 además protección contra sobrecalentamiento a 42 °C."],
        ],
        compromisos: true,
    },

    esterilizadores: {
        titulo: "Autoclaves de sobremesa en Perú | Sturdy",
        h1: "Autoclaves de sobremesa",
        descripcion: "Autoclaves de sobremesa Sturdy de 16 litros para consultorios, clínicas y laboratorios. Compara la serie Poleax y el SA-232X y cotiza en Perú.",
        intro: [
            "Autoclaves Sturdy de 16 litros para esterilizar instrumental en consultorios, clínicas y laboratorios.",
            "Hay dos opciones: la serie Poleax (SA-230, SA-232 y SA-232V), con controles simples para tareas básicas de esterilización, y el SA-232X, con microprocesador, tanque de agua integrado y secado opcional.",
        ],
        comparar: ["Capacidad de la cámara|Volumen de la cámara", "Temperatura", "Tiempo de esterilización", "Llenado de agua", "Consumo de agua por ciclo"],
        criterios: [
            ["Tipo de control", "El SA-230 se maneja con una perilla de tiempo; el SA-232 y el SA-232V tienen tiempos preestablecidos; el SA-232X usa microprocesador con programas a 121 °C y 134 °C."],
            ["Llenado de agua", "En la serie Poleax el agua se carga a mano en cada sesión. El SA-232X tiene un tanque de 4200 cc: solo se rellena el agua, se elige el programa y se inicia el ciclo."],
            ["Secado", "Si necesitas sacar el instrumental seco, el SA-232X ofrece secado opcional a puerta cerrada con bomba de aire, de 18 minutos."],
            ["Formato", "Todos tienen una cámara de 16 litros. El SA-232V es de formato vertical; los demás, de sobremesa."],
        ],
        faq: [
            ["¿Qué capacidad tienen?", "Todos los modelos tienen una cámara de 16 litros, de Ø 230 × 410 mm."],
            ["¿Cuánto dura un ciclo?", "Depende del modelo y del programa. En el SA-232X, a 134 °C son 4 minutos sin envolver y 15 minutos envuelto; a 121 °C, 15 y 30 minutos."],
            ["¿Funcionan a 110 V?", "El SA-232 y el SA-232X admiten 230 V y 110 V. El SA-230 y el SA-232V funcionan a 230 V."],
        ],
        compromisos: true,
    },

    "tecnologia-informacion": {
        titulo: "Software PACS y RIS para radiología en Perú | Novarad",
        h1: "Software PACS y RIS para radiología",
        descripcion: "NovaPACS y Nova RIS de Novarad para hospitales y centros de diagnóstico por imágenes en Perú: visualización, informes, citas e integración HL7.",
        intro: [
            "Soluciones Novarad para departamentos de radiología y centros de diagnóstico por imágenes.",
            "NovaPACS sirve para visualizar, interpretar, comparar y almacenar estudios. Nova RIS organiza el recorrido del paciente: citas, informes y distribución de resultados. Se pueden implementar por separado o juntos.",
        ],
        comparar: null,
        criterios: [
            ["PACS o RIS", "El PACS trabaja con las imágenes (ecografías, rayos X, TC, RM y TEP). El RIS gestiona la información del servicio: agenda, informes, resultados y productividad."],
            ["Integración", "Nova RIS ofrece HL7 bidireccional e integración con historias clínicas electrónicas, y sincroniza RIS, PACS, modalidades y sistema financiero."],
            ["Almacenamiento", "NovaPACS admite almacenamiento local, externo, híbrido, virtualizado o en la nube, según la infraestructura de tu institución."],
            ["Acceso", "NovaPACS incluye un visor HTML5 y funciones de lectura, dictado e informes desde el navegador."],
        ],
        faq: [
            ["¿Qué diferencia hay entre un PACS y un RIS?", "El PACS almacena y muestra las imágenes médicas; el RIS administra el flujo del servicio de radiología, desde la cita hasta la entrega del resultado."],
            ["¿Se integran con mi sistema actual?", "Nova RIS trabaja con HL7 bidireccional e historias clínicas electrónicas. Revisamos contigo la compatibilidad con tus equipos y sistemas antes de cotizar."],
            ["¿Cómo se implementan?", "La implementación y la capacitación se coordinan contigo. El alcance y las condiciones se definen en la cotización según tu institución."],
        ],
        compromisos: false,
    },
};
