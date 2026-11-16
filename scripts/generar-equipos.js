/* ==========================================================================
   Genera una página por equipo en /equipos/ y actualiza sitemap.xml.
   Los datos salen de js/productos-data.js (la misma fuente del catálogo).

   Uso, desde la carpeta del proyecto:
       node scripts/generar-equipos.js

   Ejecutarlo cada vez que se agregue o modifique un equipo.
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RAIZ = path.join(__dirname, "..");
const DOMINIO = "https://medicalhealthcare.com.pe";
const WHATSAPP = "51942736112";
const hoy = new Date().toISOString().slice(0, 10);

/* --- Datos -------------------------------------------------------------- */
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
    fs.readFileSync(path.join(RAIZ, "js/productos-data.js"), "utf8") +
        ";this.PRODUCTOS=PRODUCTOS;this.CATEGORIAS=CATEGORIAS;this.MOSTRAR_MARCA=MOSTRAR_MARCA;this.urlEquipo=urlEquipo;this.PAGINAS_LINEA=PAGINAS_LINEA;this.urlLinea=urlLinea;",
    ctx
);
const { PRODUCTOS, CATEGORIAS, urlEquipo, PAGINAS_LINEA, urlLinea } = ctx;
const LINEAS = require("./lineas-contenido.js");

/* --- Utilidades --------------------------------------------------------- */
const esc = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/* Valores de especificaciones: escapa todo salvo los saltos <br> de los datos. */
const escValor = (t) => esc(t).replace(/&lt;br&gt;/g, "<br>");
const recortar = (t, n) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(" ", n - 1)).replace(/[,;:.]$/, "") + "…");
const abs = (u) => (/^https?:/.test(u) ? u : DOMINIO + u);
const nombreCompleto = (p) => `${p.marca} ${p.modelo}`;

/* --- Plantilla: encabezado y pie de about.html con rutas absolutas -------- */
const base = fs.readFileSync(path.join(RAIZ, "about.html"), "utf8");
const absolutas = (html) =>
    html.replace(/(href|src)="(?!https?:|\/|#|mailto:|tel:)([^"]+)"/g, '$1="/$2"');
const cabecera = absolutas(base.slice(base.indexOf("<!-- Favicon -->"), base.indexOf("</head>")));
const encabezado = absolutas(base.slice(base.indexOf("<body>") + 6, base.indexOf("<main>")))
    .replace(/ class="active" aria-current="page"/, "");
const pie = absolutas(base.slice(base.indexOf("</main>") + 7, base.indexOf("</body>")));

function iconoWhatsApp() {
    return '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.2 2.7 3.6 6.1 6.4 6.4l1-1.3-1.8-1-1 .8a5 5 0 0 1-2.5-2.5l.8-1-1-1.8Z"/></svg>';
}
function iconoPdf() {
    return '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>';
}

/* --- Lo que incluye cada equipo (igual que la franja del inicio) --------- */
const icono = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
const COMPROMISOS = [
    [icono('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.3-.5-.5-2.3Z"/>'), "Instalación incluida en el precio"],
    [icono('<path d="M3 5h18v11H3z"/><path d="M8 20h8M12 16v4M7 9h6M7 12h4"/>'), "Capacitación a tu personal"],
    [icono('<path d="M12 3 5 6v5c0 4.4 3 8.2 7 10 4-1.8 7-5.6 7-10V6Z"/><path d="m9 12 2 2 4-4"/>'), "Garantía de 12 meses"],
    [icono('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'), "Respuesta en menos de 24 h hábiles"],
];

/* --- Página de un equipo ------------------------------------------------ */
function pagina(p) {
    const url = DOMINIO + urlEquipo(p);
    const categoria = CATEGORIAS[p.categoria];
    const titulo = `${nombreCompleto(p)}: ${p.nombre.charAt(0).toLowerCase() + p.nombre.slice(1)} en Perú | Medical Healthcare`;
    const descripcion = recortar(`${nombreCompleto(p)}. ${p.resumen}`, 158);
    const mensaje = `Hola, quisiera una cotización del equipo ${p.nombre} — ${nombreCompleto(p)}. ¿Podrían indicarme disponibilidad y condiciones?`;
    const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    const insignia = p.enPromocion
        ? '<p class="promo-stock product-badge badge-promo">En promoción</p>'
        : p.nuevo ? '<p class="product-badge badge-new">Nuevo</p>' : "";
    const relacionados = PRODUCTOS.filter((o) => o.categoria === p.categoria && o.id !== p.id);

    /* WebPage y no Product: Google exige precio, opiniones o calificación para
       los datos de tipo Product, y aquí los equipos se cotizan sin precio público. */
    const datos = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: titulo,
            description: descripcion,
            url,
            inLanguage: "es-PE",
            primaryImageOfPage: { "@type": "ImageObject", url: abs(p.imagen) },
            about: { "@type": "Thing", name: `${p.nombre} ${nombreCompleto(p)}`, description: p.resumen },
            publisher: { "@type": "Organization", name: "Medical Healthcare", url: DOMINIO + "/" },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: DOMINIO + "/" },
                { "@type": "ListItem", position: 2, name: "Productos", item: DOMINIO + "/productos.html" },
                { "@type": "ListItem", position: 3, name: categoria, item: DOMINIO + urlLinea(p.categoria) },
                { "@type": "ListItem", position: 4, name: nombreCompleto(p), item: url },
            ],
        },
    ];

    return `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light only">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Página generada por scripts/generar-equipos.js: editar los datos en js/productos-data.js -->
    <meta name="description" content="${esc(descripcion)}">
    <title>${esc(titulo)}</title>
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="product">
    <meta property="og:locale" content="es_PE">
    <meta property="og:site_name" content="Medical Healthcare">
    <meta property="og:title" content="${esc(titulo)}">
    <meta property="og:description" content="${esc(descripcion)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${abs(p.imagen)}">
    <meta property="og:image:alt" content="${esc(`${p.nombre} ${nombreCompleto(p)}`)}">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${JSON.stringify(datos)}</script>

    ${cabecera.trim()}
</head>

<body class="equipo-page">
${encabezado}
    <main>
        <section class="equipo">
            <div class="container">
                <nav class="breadcrumb" aria-label="Ruta de navegación">
                    <ol>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/productos.html">Productos</a></li>
                        <li><a href="${urlLinea(p.categoria)}">${esc(categoria)}</a></li>
                        <li aria-current="page">${esc(nombreCompleto(p))}</li>
                    </ol>
                </nav>

                <div class="equipo-layout">
                    <figure class="equipo-photo">
                        ${insignia}<button type="button" class="image-zoom" data-ampliar="${p.id}" aria-label="Ampliar foto de ${esc(p.modelo)}"><img src="${esc(p.imagen)}" alt="${esc(`${p.nombre} ${nombreCompleto(p)}`)}" fetchpriority="high"><span>Ampliar foto</span></button>
                        ${p.notaImagen ? `<figcaption class="product-image-note">${esc(p.notaImagen)}</figcaption>` : ""}
                    </figure>

                    <div class="equipo-info">
                        <h1>${esc(p.nombre)} <span>${esc(nombreCompleto(p))}</span></h1>
                        ${p.modeloDetalle ? `<p class="equipo-modelo">${esc(p.modeloDetalle)}</p>` : ""}
                        <p class="equipo-resumen">${esc(p.resumen)}</p>
                        <div class="equipo-actions">
                            <a class="btn primary" href="${whatsapp}" target="_blank" rel="noopener">${iconoWhatsApp()} Cotizar por WhatsApp</a>
                            <a class="btn equipo-secondary" href="${esc(p.ficha)}" target="_blank" rel="noopener">${iconoPdf()} ${esc(p.etiquetaFicha || "Ficha técnica (PDF)")}</a>
                            ${p.catalogo ? `<a class="btn equipo-secondary" href="${esc(p.catalogo)}" target="_blank" rel="noopener">${iconoPdf()} ${esc(p.etiquetaCatalogo || "Catálogo (PDF)")}</a>` : ""}
                        </div>
                        <button class="quote-toggle quote-toggle--link" type="button" data-cotizar="${p.id}" aria-pressed="false">Añadir a mi lista para cotizar varios equipos</button>
                        <ul class="equipo-incluye" aria-label="Incluido con el equipo">
${COMPROMISOS.map(([icono, texto]) => `                            <li>${icono}${texto}</li>`).join("\n")}
                        </ul>
                        <p class="equipo-note">Confirma con nuestro equipo la configuración, disponibilidad y condiciones de entrega antes de tu pedido.</p>
                    </div>
                </div>

                <div class="equipo-detalles">
                    <section aria-labelledby="specs-title">
                        <h2 id="specs-title">${esc(p.tituloSpecs || "Especificaciones técnicas")}</h2>
                        <table class="spec-table"><tbody>
${p.specs.map(([k, v]) => `                            <tr><th scope="row">${esc(k)}</th><td>${escValor(v)}</td></tr>`).join("\n")}
                        </tbody></table>
                    </section>
                    <section aria-labelledby="features-title">
                        <h2 id="features-title">Características</h2>
                        <ul class="feature-list">
${p.caracteristicas.filter((c) => !/^Confirmar/.test(c)).map((c) => `                            <li>${esc(c)}</li>`).join("\n")}
                        </ul>
                        ${p.caracteristicas.filter((c) => /^Confirmar/.test(c)).map((c) => `<p class="equipo-aviso">${esc(c)}.</p>`).join("")}
                    </section>
                </div>
            </div>
        </section>
${relacionados.length ? `
        <section class="equipo-relacionados">
            <div class="container">
                <div class="section-heading"><h2>Más equipos de ${esc(categoria.toLowerCase())}</h2><a class="text-link" href="${urlLinea(p.categoria)}">${PAGINAS_LINEA[p.categoria] ? "Cómo elegir y comparar →" : "Ver toda la línea →"}</a></div>
                <ul class="related-list">
${relacionados.map((o) => `                    <li><a href="${urlEquipo(o)}"><img src="${esc(o.imagen)}" alt="" loading="lazy" width="96" height="96"><span><b>${esc(nombreCompleto(o))}</b>${esc(o.nombre)}</span></a></li>`).join("\n")}
                </ul>
            </div>
        </section>
` : ""}
        <section class="equipo-cierre" aria-labelledby="cierre-title">
            <div class="container equipo-cierre-grid">
                <div>
                    <h2 id="cierre-title">¿Te interesa el ${esc(nombreCompleto(p))}?</h2>
                    <p>Cuéntanos la cantidad y tu ciudad. Te respondemos en menos de 24 horas hábiles con disponibilidad y condiciones.</p>
                </div>
                <div class="equipo-cierre-acciones">
                    <a class="btn primary" href="${whatsapp}" target="_blank" rel="noopener">${iconoWhatsApp()} Cotizar por WhatsApp</a>
                    <a class="btn equipo-secondary" href="/productos.html">Ver todo el catálogo</a>
                </div>
            </div>
        </section>
    </main>
${pie}
</body>

</html>
`;
}

/* --- Página de una línea (categoría) ------------------------------------ */
const MOSTRAR_MARCA_GEN = ctx.MOSTRAR_MARCA;
const ICONO_MAS_GEN = '<svg class="qt-mas" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg>';
const ICONO_OK_GEN = '<svg class="qt-ok" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
function valorSpec(p, clave) {
    for (const k of clave.split("|")) {
        const fila = p.specs.find(([n]) => n === k);
        if (fila) return fila[1];
    }
    return "—";
}

function paginaLinea(clave) {
    const t = LINEAS[clave];
    const url = DOMINIO + PAGINAS_LINEA[clave];
    const categoria = CATEGORIAS[clave];
    const modelos = PRODUCTOS.filter((p) => p.categoria === clave);
    const titulo = `${t.titulo} | Medical Healthcare`;
    const mensaje = `Hola, quisiera asesoría y una cotización de ${t.h1.toLowerCase()}. ¿Podrían ayudarme a elegir el modelo adecuado?`;
    const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    const marca = MOSTRAR_MARCA_GEN;

    const datos = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: titulo,
            description: t.descripcion,
            url,
            inLanguage: "es-PE",
            publisher: { "@type": "Organization", name: "Medical Healthcare", url: DOMINIO + "/" },
            mainEntity: {
                "@type": "ItemList",
                itemListElement: modelos.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: nombreCompleto(p), url: DOMINIO + urlEquipo(p) })),
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: DOMINIO + "/" },
                { "@type": "ListItem", position: 2, name: "Productos", item: DOMINIO + "/productos.html" },
                { "@type": "ListItem", position: 3, name: categoria, item: url },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        },
    ];

    const tarjetas = modelos.map((p) => `
                    <article class="equipo-card">
                        <div class="equipo-card-media">${p.nuevo ? '<p class="product-badge badge-new">Nuevo</p>' : ""}<img src="${esc(p.imagen)}" alt="${esc(`${p.nombre} ${nombreCompleto(p)}`)}" loading="lazy"></div>
                        <div class="equipo-card-body">
                            <h3><a class="equipo-card-link" href="${urlEquipo(p)}">${esc(p.nombre)}</a></h3>
                            <p class="equipo-card-marca">${esc(marca ? nombreCompleto(p) : p.modelo)}</p>
                            ${p.datoClave ? `<p class="card-dato">${esc(p.datoClave)}</p>` : ""}
                        </div>
                        <div class="equipo-card-acciones">
                            <a class="btn equipo-card-detalles" href="${urlEquipo(p)}">Ver ficha</a>
                            <button class="quote-toggle quote-toggle--card" type="button" data-cotizar="${p.id}" aria-pressed="false" aria-label="Añadir a la cotización: ${esc(p.modelo)}" title="Añadir a la cotización">${ICONO_MAS_GEN}${ICONO_OK_GEN}<span>Cotizar</span></button>
                        </div>
                    </article>`).join("");

    const tabla = t.comparar ? `
        <section class="linea-seccion" aria-labelledby="comparar-title">
            <div class="container">
                <h2 id="comparar-title">Comparación de modelos</h2>
                <div class="linea-tabla-scroll" tabindex="0" role="region" aria-labelledby="comparar-title">
                    <table class="linea-tabla">
                        <thead><tr><th scope="col">Modelo</th>${t.comparar.map((c) => `<th scope="col">${esc(c.split("|")[0])}</th>`).join("")}</tr></thead>
                        <tbody>
${modelos.map((p) => `                            <tr><th scope="row"><a href="${urlEquipo(p)}">${esc(nombreCompleto(p))}</a></th>${t.comparar.map((c) => `<td>${escValor(valorSpec(p, c))}</td>`).join("")}</tr>`).join("\n")}
                        </tbody>
                    </table>
                </div>
                <p class="linea-nota">Datos de las fichas técnicas del fabricante. Confirma la configuración y disponibilidad con nuestro equipo.</p>
            </div>
        </section>
` : "";

    return `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light only">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Página generada por scripts/generar-equipos.js: editar los textos en scripts/lineas-contenido.js -->
    <meta name="description" content="${esc(t.descripcion)}">
    <title>${esc(titulo)}</title>
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_PE">
    <meta property="og:site_name" content="Medical Healthcare">
    <meta property="og:title" content="${esc(titulo)}">
    <meta property="og:description" content="${esc(t.descripcion)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${abs(modelos[0].imagen)}">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${JSON.stringify(datos)}</script>

    ${cabecera.trim()}
</head>

<body class="linea-page">
${encabezado}
    <main>
        <section class="linea-intro">
            <div class="container">
                <nav class="breadcrumb" aria-label="Ruta de navegación">
                    <ol>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/productos.html">Productos</a></li>
                        <li aria-current="page">${esc(categoria)}</li>
                    </ol>
                </nav>
                <h1>${esc(t.h1)} <span>en Perú</span></h1>
${t.intro.map((p) => `                <p>${esc(p)}</p>`).join("\n")}
                <div class="linea-acciones">
                    <a class="btn primary" href="${whatsapp}" target="_blank" rel="noopener">${iconoWhatsApp()} Pedir asesoría por WhatsApp</a>
                    <a class="btn equipo-secondary" href="#modelos-title">Ver los ${modelos.length} modelos</a>
                </div>
            </div>
        </section>

        <section class="linea-seccion" aria-labelledby="modelos-title">
            <div class="container">
                <h2 id="modelos-title">Modelos disponibles</h2>
                <div class="products linea-grid">${tarjetas}
                </div>
            </div>
        </section>
${tabla}
        <section class="linea-seccion linea-elegir" aria-labelledby="elegir-title">
            <div class="container">
                <h2 id="elegir-title">Cómo elegir</h2>
                <dl class="linea-criterios">
${t.criterios.map(([k, v]) => `                    <div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n")}
                </dl>
${t.compromisos ? `                <ul class="equipo-incluye linea-incluye" aria-label="Incluido con cada equipo">
${COMPROMISOS.map(([icono, texto]) => `                    <li>${icono}${texto}</li>`).join("\n")}
                </ul>` : ""}
            </div>
        </section>

        <section class="linea-seccion faq-section" aria-labelledby="faq-title">
            <div class="container">
                <h2 id="faq-title">Preguntas frecuentes</h2>
                <div class="faq-list">
${t.faq.map(([q, a]) => `                    <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}
                </div>
            </div>
        </section>

        <section class="equipo-cierre" aria-labelledby="cierre-title">
            <div class="container equipo-cierre-grid">
                <div>
                    <h2 id="cierre-title">¿No sabes cuál elegir?</h2>
                    <p>Cuéntanos qué necesitas, la cantidad y tu ciudad. Te respondemos en menos de 24 horas hábiles con una recomendación y condiciones.</p>
                </div>
                <div class="equipo-cierre-acciones">
                    <a class="btn primary" href="${whatsapp}" target="_blank" rel="noopener">${iconoWhatsApp()} Pedir asesoría por WhatsApp</a>
                    <a class="btn equipo-secondary" href="/productos.html">Ver todo el catálogo</a>
                </div>
            </div>
        </section>
    </main>
${pie}
</body>

</html>
`;
}

/* --- Escribir páginas y sitemap ------------------------------------------ */
const carpeta = path.join(RAIZ, "equipos");
fs.mkdirSync(carpeta, { recursive: true });
for (const f of fs.readdirSync(carpeta)) if (f.endsWith(".html")) fs.unlinkSync(path.join(carpeta, f));
for (const p of PRODUCTOS) fs.writeFileSync(path.join(RAIZ, urlEquipo(p)), pagina(p));

const carpetaLineas = path.join(RAIZ, "lineas");
fs.mkdirSync(carpetaLineas, { recursive: true });
for (const f of fs.readdirSync(carpetaLineas)) if (f.endsWith(".html")) fs.unlinkSync(path.join(carpetaLineas, f));
for (const clave of Object.keys(PAGINAS_LINEA)) {
    if (!LINEAS[clave]) throw new Error(`Falta el texto de la línea "${clave}" en scripts/lineas-contenido.js`);
    fs.writeFileSync(path.join(RAIZ, PAGINAS_LINEA[clave]), paginaLinea(clave));
}

const paginasFijas = ["/", "/productos.html", "/about.html", "/contacto.html", "/privacidad.html"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...paginasFijas, ...Object.values(PAGINAS_LINEA), ...PRODUCTOS.map(urlEquipo)].map((u) => `  <url><loc>${DOMINIO}${u}</loc><lastmod>${hoy}</lastmod></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(RAIZ, "sitemap.xml"), sitemap);
console.log(`${PRODUCTOS.length} páginas en /equipos, ${Object.keys(PAGINAS_LINEA).length} en /lineas y sitemap.xml actualizado.`);
