/* ==========================================================================
   MEDICAL HEALTHCARE - Lógica del sitio
   Requiere cargar antes:  js/productos-data.js (en todas las páginas)
   ========================================================================== */

const seleccionCotizacion = new Set();
const WHATSAPP_NUMERO = "51942736112";

/* --------------------------------------------------------------------------
   Utilidades
   -------------------------------------------------------------------------- */
function enlaceWhatsApp(mensaje) {
    return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

/* Íconos SVG en línea para los botones del detalle (antes Font Awesome). */
function iconoBoton(tipo) {
    const trazos = {
        pdf: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
        externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
        whatsapp: '<path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.2 2.7 3.6 6.1 6.4 6.4l1-1.3-1.8-1-1 .8a5 5 0 0 1-2.5-2.5l.8-1-1-1.8Z"/>'
    };
    return `<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${trazos[tipo]}</svg>`;
}

function buscarProducto(id) {
    return PRODUCTOS.find((p) => p.id === id);
}

/* --------------------------------------------------------------------------
   Menú "Productos": se genera desde CATEGORIAS (js/productos-data.js),
   así una categoría nueva aparece sola en el menú de todas las páginas.
   -------------------------------------------------------------------------- */
function iconoCategoria(clave) {
    const trazos = {
        all: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        anestesia: '<rect x="4" y="3" width="12" height="10" rx="2"/><path d="M7 8h2l1-2 2 4 1-2h1M10 13v6M5 21v-2h12v2M16 7h3v9h-3"/>',
        laboratorio: '<path d="M9 3h6M10 3v7L4 19a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-9V3M7 16h10"/>',
        refrigeracion: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 9h14M8 5v1M8 12v4"/>',
        calentadores: '<path d="M12 2C10 6 5 10 5 15a7 7 0 0 0 14 0c0-5-5-9-7-13Z M9 15a3 3 0 0 0 3 3"/>',
        esterilizadores: '<rect x="2" y="5" width="20" height="14" rx="3"/><circle cx="10" cy="12" r="4"/><path d="M18 9v1M18 14v1M5 19v2M19 19v2"/>',
        'tecnologia-informacion': '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M6 10h3l2-3 3 6 2-3h2"/>'
    };
    return `<svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${trazos[clave] || trazos.all}</svg>`;
}


/* Íconos de categoría en "Nuestras líneas" (inicio), tomados del mismo set. */
document.querySelectorAll(".line-grid > a").forEach((a) => {
    const clave = a.hash.slice(1);
    if (CATEGORIAS[clave]) a.insertAdjacentHTML("afterbegin", `<i class="line-icon">${iconoCategoria(clave)}</i>`);
});
document.querySelectorAll(".dropdown-content").forEach((menu) => {
    menu.innerHTML = `<a href="/productos.html">${iconoCategoria("all")}<span>Todos los productos</span></a>` + Object.entries(CATEGORIAS)
        .map(([clave, nombre]) => `<a href="/productos.html#${clave}">${iconoCategoria(clave)}<span>${nombre}</span></a>`)
        .join("");
});

/* Menú accesible con ratón, teclado y pantalla táctil. */
document.querySelectorAll('.dropdown').forEach((dropdown) => {
    const button = dropdown.querySelector('.dropbtn');
    const menu = dropdown.querySelector('.dropdown-content');
    let closeTimer;
    const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const positionMenu = () => {
        menu.style.removeProperty('--menu-offset');
        if (window.innerWidth > 768 && !menu.hidden) {
            const bounds = menu.getBoundingClientRect();
            const overflow = Math.max(0, bounds.right - document.documentElement.clientWidth + 16);
            menu.style.setProperty('--menu-offset', `${-overflow}px`);
        }
    };
    window.addEventListener('resize', positionMenu);
    const setOpen = (open) => {
        clearTimeout(closeTimer);
        button.setAttribute('aria-expanded', String(open));
        menu.hidden = !open;
        if (open) positionMenu();
    };
    // El ratón abre el menú; el toque y el teclado conservan el clic.
    dropdown.addEventListener('pointerenter', (event) => {
        if (hoverPointer.matches && event.pointerType === 'mouse') setOpen(true);
    });
    dropdown.addEventListener('pointerleave', (event) => {
        if (hoverPointer.matches && event.pointerType === 'mouse') {
            closeTimer = setTimeout(() => {
                if (!dropdown.contains(document.activeElement)) setOpen(false);
            }, 180);
        }
    });
    button.addEventListener('click', (event) => {
        const mouseClick = hoverPointer.matches && event.pointerType === 'mouse';
        setOpen(mouseClick ? true : menu.hidden);
    });
    dropdown.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !menu.hidden) {
            setOpen(false);
            button.focus();
        }
    });
    dropdown.addEventListener('focusout', (event) => {
        if (!dropdown.contains(event.relatedTarget)) setOpen(false);
    });
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) || event.target.closest('.dropdown-content a')) setOpen(false);
    });
});

/* --------------------------------------------------------------------------
   Cards de producto
   -------------------------------------------------------------------------- */
function crearCard(p) {
    const etiqueta = MOSTRAR_MARCA ? `${p.marca} · ${p.modelo}` : p.modelo;
    return `
        <article class="card" data-category="${p.categoria}">
            <div class="card-photo">${p.enPromocion ? `<p class="promo-stock product-badge badge-promo">En promoción</p>` : p.nuevo ? `<p class="product-badge badge-new">Nuevo</p>` : ""}<button type="button" class="image-zoom" data-ampliar="${p.id}" aria-label="Ampliar foto de ${p.modelo}"><img src="${p.imagen}" alt="${p.nombre} ${p.marca} ${p.modelo}" loading="lazy"><span>Ampliar foto</span></button></div>
            ${p.notaImagen ? `<p class="product-image-note">${p.notaImagen}</p>` : ""}<p class="card-marca">${etiqueta}</p>
            <p class="card-category">${iconoCategoria(p.categoria)}<span>${CATEGORIAS[p.categoria]}</span></p>
            <h3><a href="${urlEquipo(p)}">${p.nombre}</a></h3>
            <div class="card-actions"><button class="btn" type="button" data-producto="${p.id}">Ver detalles</button><button class="btn quote-toggle" type="button" data-cotizar="${p.id}" aria-pressed="${seleccionCotizacion.has(p.id)}">${seleccionCotizacion.has(p.id) ? "Quitar de cotización" : "Añadir a cotización"}</button></div>
        </article>
    `;
}

function mostrarProductos(contenedor, lista) {
    contenedor.innerHTML = lista.map(crearCard).join("");
}

/* --------------------------------------------------------------------------
   Modal de detalles
   -------------------------------------------------------------------------- */
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");

function crearModalHTML(p) {
    const specs = p.specs
        .map(([nombre, valor]) => `<tr><th>${nombre}</th><td>${valor}</td></tr>`)
        .join("");
    const caracteristicas = p.caracteristicas.map((c) => `<li>${c}</li>`).join("");
    const mensaje = `Hola, quiero cotizar el ${p.nombre} ${p.marca} ${p.modelo}`;

    return `
        <div class="product-detail-layout"><div class="product-detail-info">
        <p class="modal-marca">${MOSTRAR_MARCA ? p.marca + " · " : ""}${CATEGORIAS[p.categoria]}</p>
        <h2 id="product-title">${p.nombre}</h2>
        <p class="modal-modelo">${p.modeloDetalle || "Modelo " + p.modelo}</p>
        <a class="modal-page-link" href="${urlEquipo(p)}">Ver la página completa del equipo →</a>

        ${p.notaImagen ? `<p class="product-image-note">${p.notaImagen}</p>` : ""}<p class="modal-resumen">${p.resumen}</p>

        <h3>${p.tituloSpecs || "Especificaciones técnicas"}</h3>
        <table class="spec-table"><tbody>${specs}</tbody></table>

        <h3>Características</h3>
        <ul class="feature-list">${caracteristicas}</ul>

        <div class="btn-center">
            <a href="${p.ficha}" target="_blank" rel="noopener" class="btn">
                ${iconoBoton(p.ficha.endsWith(".pdf") ? "pdf" : "externo")} ${p.etiquetaFicha || "Ver ficha técnica (PDF)"}
            </a>
            ${p.catalogo ? `<a href="${p.catalogo}" target="_blank" rel="noopener" class="btn">${iconoBoton("pdf")} ${p.etiquetaCatalogo || "Catálogo AX-400/AX-500 (PDF)"}</a>` : ""}
            <a href="${enlaceWhatsApp(mensaje)}" target="_blank" rel="noopener" class="btn secondary-dark">
                ${iconoBoton("whatsapp")} Cotizar por WhatsApp
            </a>
        </div>
        </div><div class="product-detail-photo">${p.enPromocion ? `<p class="promo-stock product-badge badge-promo">En promoción</p>` : p.nuevo ? `<p class="product-badge badge-new">Nuevo</p>` : ""}<button type="button" class="image-zoom" data-ampliar="${p.id}" aria-label="Ampliar foto de ${p.modelo}"><img class="modal-img" src="${p.imagen}" alt="${p.nombre} ${p.marca} ${p.modelo}"><span>Ampliar foto</span></button></div></div>
    `;
}

function abrirModal(id) {
    const producto = buscarProducto(id);
    if (!producto || !modal) return;

    modalBody.innerHTML = crearModalHTML(producto);
    modal.showModal();
    modal.querySelector(".modal-content").scrollTop = 0;
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    if (!modal || !modal.open) return;
    modal.close();
    document.body.style.overflow = "";
}

if (modal) {
    modal.addEventListener('close', () => { document.body.style.overflow = ''; });
}

/* Un solo listener para todos los botones "Ver detalles" (presentes y futuros) */
document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-producto]");
    if (boton) abrirModal(boton.dataset.producto);

    if (e.target === modal || e.target.closest(".close")) cerrarModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !document.getElementById("foto-ampliada")?.open) cerrarModal();
});

/* --------------------------------------------------------------------------
   Página de inicio: productos destacados
   -------------------------------------------------------------------------- */
const contenedorDestacados = document.getElementById("productos-destacados");

if (contenedorDestacados) {
    const destacados = DESTACADOS.map(buscarProducto).filter(Boolean);
    mostrarProductos(contenedorDestacados, destacados);
}

/* --------------------------------------------------------------------------
   Página de productos: catálogo + filtros por categoría
   -------------------------------------------------------------------------- */
const contenedorCatalogo = document.getElementById("catalogo");
const contenedorFiltros = document.getElementById("filtros");

const buscadorEquipos = document.getElementById("buscar-equipo");
let categoriaActual = "all";
const normalizarBusqueda = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
function aplicarFiltro(categoria) {
    categoriaActual = categoria;
    const palabras = normalizarBusqueda(buscadorEquipos?.value || "").split(/\s+/).filter(Boolean);
    const lista = PRODUCTOS.filter((p) => {
        const texto = normalizarBusqueda([p.nombre, p.marca, p.modelo, CATEGORIAS[p.categoria]].join(" "));
        return (categoria === "all" || p.categoria === categoria) && palabras.every((palabra) => texto.includes(palabra));
    });
    mostrarProductos(contenedorCatalogo, lista);
    const estado = document.getElementById("resultados-busqueda");
    if (estado) estado.textContent = `${lista.length} ${lista.length === 1 ? "producto encontrado" : "productos encontrados"}${categoria !== "all" ? " en " + CATEGORIAS[categoria] : ""}`;
    const vacio = document.getElementById("sin-resultados");
    if (vacio) vacio.hidden = lista.length !== 0;
    contenedorFiltros.querySelectorAll(".filtro-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === categoria);
        btn.setAttribute("aria-pressed", String(btn.dataset.filter === categoria));
    });
}

if (contenedorCatalogo && contenedorFiltros) {
    const botonBorrar = document.getElementById("limpiar-busqueda");
    const actualizarBorrar = () => { if (botonBorrar) botonBorrar.hidden = !buscadorEquipos.value; };
    buscadorEquipos?.addEventListener("input", () => { actualizarBorrar(); aplicarFiltro(categoriaActual); });
    botonBorrar?.addEventListener("click", () => {
        buscadorEquipos.value = "";
        actualizarBorrar();
        aplicarFiltro(categoriaActual);
        buscadorEquipos.focus();
    });
    document.getElementById("restablecer-catalogo")?.addEventListener("click", () => {
        buscadorEquipos.value = ""; actualizarBorrar();
        aplicarFiltro("all");
        history.replaceState(null, "", location.pathname + location.search);
        buscadorEquipos.focus();
    });
    /* Botones generados desde CATEGORIAS */
    const botones = [["all", "Todos"], ...Object.entries(CATEGORIAS)]
        .map(([clave, nombre]) => `<button class="filtro-btn" type="button" data-filter="${clave}">${iconoCategoria(clave)}<span>${nombre}</span></button>`)
        .join("");
    contenedorFiltros.innerHTML = botones;

    contenedorFiltros.addEventListener("click", (e) => {
        const btn = e.target.closest(".filtro-btn");
        if (!btn) return;

        aplicarFiltro(btn.dataset.filter);
        /* Mantiene la URL sincronizada para que el menú "Productos" siempre funcione */
        const hash = btn.dataset.filter === "all" ? "" : `#${btn.dataset.filter}`;
        history.replaceState(null, "", window.location.pathname + window.location.search + hash);
    });

    /* Filtro inicial según el menú (productos.html#calentadores); también
       reacciona si se cambia el enlace estando ya en la página. */
    const filtroDesdeURL = () => {
        const hash = window.location.hash.replace("#", "");
        aplicarFiltro(Object.hasOwn(CATEGORIAS, hash) ? hash : "all");
    };
    filtroDesdeURL();
    window.addEventListener("hashchange", filtroDesdeURL);
}

/* --------------------------------------------------------------------------
   Contadores animados (sección de estadísticas)
   -------------------------------------------------------------------------- */
function animarContador(elemento) {
    const meta = Number(elemento.dataset.target);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elemento.textContent = meta;
        return;
    }
    const duracion = 2000;
    const paso = 20;
    const incremento = meta / (duracion / paso);
    let actual = 0;

    const timer = setInterval(() => {
        actual += incremento;
        if (actual >= meta) {
            elemento.textContent = meta;
            clearInterval(timer);
        } else {
            elemento.textContent = Math.ceil(actual);
        }
    }, paso);
}

const contadores = document.querySelectorAll(".counter");

if (contadores.length) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.3 });

    contadores.forEach((c) => observador.observe(c));
}

/* Apariciones suaves sin ocultar contenido si JavaScript no está disponible. */
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !movimientoReducido.matches) {
    const apariciones = new IntersectionObserver((entradas) => {
        entradas.forEach(({isIntersecting, target}) => {
            if (!isIntersecting) return;
            if (!movimientoReducido.matches) target.animate([
                {opacity: .45, transform: 'translateY(12px)'},
                {opacity: 1, transform: 'translateY(0)'}
            ], {duration: 420, easing: 'ease-out'});
            apariciones.unobserve(target);
        });
    }, {threshold: .08});
    document.querySelectorAll('.section-heading, .line-grid, .digital-grid, .faq-layout, .vm-card').forEach(el => apariciones.observe(el));
    movimientoReducido.addEventListener('change', ({matches}) => {
        if (matches) document.getAnimations().forEach(animation => animation.cancel());
    });
}

/* Visor de fotos y selección para cotización; nunca envía automáticamente. */
const visorFoto = document.createElement('dialog');
visorFoto.id = 'foto-ampliada';
visorFoto.setAttribute('aria-label', 'Foto ampliada del equipo');
visorFoto.innerHTML = '<button type="button" class="btn" data-cerrar-foto>Cerrar foto</button><img alt=""><p></p>';
document.body.append(visorFoto);
let focoFoto;
visorFoto.addEventListener('close', () => {
    document.body.style.overflow = modal?.open ? 'hidden' : '';
    focoFoto?.focus();
});
const resumenCotizacion = document.createElement('section');
resumenCotizacion.className = 'quote-summary';
resumenCotizacion.id = 'tu-cotizacion';
const accesoCotizacion = document.createElement('a');
accesoCotizacion.className = 'quote-access btn';
accesoCotizacion.href = '#tu-cotizacion';
accesoCotizacion.addEventListener('click', e => { e.preventDefault(); resumenCotizacion.scrollIntoView({behavior:'auto'}); resumenCotizacion.querySelector('a').focus({preventScroll:true}); });
accesoCotizacion.hidden = true;
document.body.append(accesoCotizacion);
resumenCotizacion.setAttribute('aria-label', 'Tu cotización');
resumenCotizacion.hidden = true;
resumenCotizacion.innerHTML = '<div class="container"><h2>Tu cotización</h2><p role="status" aria-live="polite" class="quote-count"></p><ul></ul><div class="quote-actions"><a class="btn" target="_blank" rel="noopener">Consultar por WhatsApp</a><button type="button" class="btn" data-vaciar>Vaciar selección</button></div><p>Se abrirá WhatsApp con tu lista. Revisa el mensaje antes de enviarlo.</p></div>';
(document.querySelector('main') || document.body).append(resumenCotizacion);
function actualizarCotizacion() {
    const productos = [...seleccionCotizacion].map(buscarProducto).filter(Boolean);
    resumenCotizacion.hidden = productos.length === 0;
    accesoCotizacion.hidden = productos.length === 0;
    accesoCotizacion.textContent = `Ver cotización (${productos.length})`;
    resumenCotizacion.querySelector('.quote-count').textContent = `${productos.length} equipo(s) seleccionado(s)`;
    resumenCotizacion.querySelector('ul').innerHTML = productos.map(p => `<li><span>${p.nombre} · ${p.marca} ${p.modelo}</span><button type="button" data-cotizar="${p.id}" aria-label="Quitar ${p.modelo}">Quitar</button></li>`).join('');
    resumenCotizacion.querySelector('a').href = enlaceWhatsApp('Hola, quisiera una cotización de estos equipos:\n' + productos.map((p,i) => `${i+1}. ${p.nombre} — ${p.marca} ${p.modelo}`).join('\n') + '\nPor favor, indíquenme disponibilidad y condiciones de entrega.');
    document.querySelectorAll('.quote-toggle').forEach(b => {
        const elegido = seleccionCotizacion.has(b.dataset.cotizar);
        b.setAttribute('aria-pressed', String(elegido));
        b.textContent = elegido ? 'Quitar de cotización' : 'Añadir a cotización';
    });
}
document.addEventListener('click', e => {
    const ampliar = e.target.closest('[data-ampliar]');
    if (ampliar) {
        const p = buscarProducto(ampliar.dataset.ampliar);
        focoFoto = ampliar;
        visorFoto.querySelector('img').src = p.imagen;
        visorFoto.querySelector('img').alt = `${p.nombre} ${p.marca} ${p.modelo}`;
        visorFoto.querySelector('p').textContent = `${p.nombre} · ${p.marca} ${p.modelo}${p.notaImagen ? " — " + p.notaImagen : ""}`;
        visorFoto.showModal();
        document.body.style.overflow = 'hidden';
    }
    if (e.target === visorFoto || e.target.closest('[data-cerrar-foto]')) visorFoto.close();
    const elegir = e.target.closest('[data-cotizar]');
    if (elegir) {
        const id = elegir.dataset.cotizar;
        if (!buscarProducto(id)) return;
        seleccionCotizacion.has(id) ? seleccionCotizacion.delete(id) : seleccionCotizacion.add(id);
        actualizarCotizacion();
    }
    if (e.target.closest('[data-vaciar]')) { seleccionCotizacion.clear(); actualizarCotizacion(); }
});
/* --------------------------------------------------------------------------
   Botón flotante de WhatsApp: en móvil se oculta al bajar y vuelve al subir,
   para que no tape botones ni fotos mientras se lee.
   -------------------------------------------------------------------------- */
(function () {
    const flotante = document.querySelector('.whatsapp-float');
    if (!flotante) return;
    const movil = window.matchMedia('(max-width: 768px)');
    let ultimoY = window.scrollY;
    let pendiente = false;
    function revisar() {
        pendiente = false;
        const y = window.scrollY;
        const finDePagina = window.innerHeight + y >= document.documentElement.scrollHeight - 8;
        const bajando = y > ultimoY + 4;
        const subiendo = y < ultimoY - 4;
        if (!movil.matches || y < 120 || subiendo) flotante.classList.remove('is-hidden');
        else if (bajando || finDePagina) flotante.classList.add('is-hidden');
        if (bajando || subiendo) ultimoY = y;
    }
    window.addEventListener('scroll', () => {
        if (!pendiente) { pendiente = true; requestAnimationFrame(revisar); }
    }, { passive: true });
    movil.addEventListener('change', revisar);
})();

/* --------------------------------------------------------------------------
   Formulario de contacto: se envía sin salir de la página y muestra un
   mensaje de confirmación. Sin JavaScript sigue funcionando como antes.
   -------------------------------------------------------------------------- */
(function () {
    const form = document.querySelector('form[action*="formspree.io"]');
    if (!form || !window.fetch) return;
    const boton = form.querySelector('[type="submit"]');
    const estado = document.createElement("p");
    estado.className = "form-status";
    estado.setAttribute("role", "status");
    estado.setAttribute("aria-live", "polite");
    form.append(estado);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const textoBoton = boton.textContent;
        boton.disabled = true;
        boton.textContent = "Enviando…";
        estado.textContent = "";
        estado.className = "form-status";
        try {
            const r = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            if (!r.ok) throw new Error(String(r.status));
            const nombre = (form.querySelector("#nombre")?.value || "").trim().split(/\s+/)[0];
            const gracias = document.createElement("div");
            gracias.className = "form-thanks";
            gracias.setAttribute("role", "status");
            gracias.tabIndex = -1;
            gracias.innerHTML = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="22"/><path d="m15 25 6 6 12-13"/></svg><h2></h2><p>Recibimos tu mensaje. Nuestro equipo te responderá a tu correo lo antes posible.</p><button type="button" class="btn">Enviar otro mensaje</button>`;
            gracias.querySelector("h2").textContent = nombre ? `¡Gracias, ${nombre}!` : "¡Gracias!";
            gracias.querySelector("button").addEventListener("click", () => {
                form.reset();
                gracias.replaceWith(form);
                form.querySelector("input")?.focus();
            });
            form.replaceWith(gracias);
            gracias.focus();
        } catch {
            estado.className = "form-status is-error";
            estado.textContent = "No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos a ventas2@medicalhealthcare.com.pe.";
        } finally {
            boton.disabled = false;
            boton.textContent = textoBoton;
        }
    });
})();

/* Línea de pulso del inicio: se dibuja cuando entra en pantalla. */
document.documentElement.classList.add("js");
(function () {
    const linea = document.querySelector(".pulse-line");
    if (!linea) return;
    if (!("IntersectionObserver" in window)) { linea.classList.add("is-visible"); return; }
    const io = new IntersectionObserver((entradas) => {
        if (entradas.some((e) => e.isIntersecting)) { linea.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(linea);
})();
