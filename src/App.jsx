import React, { useState } from 'react';
import './App.css';
import './index.css';
import { Helmet } from 'react-helmet';

const emerald = '#10b981';
const blue = '#2563eb';

const faqs = [
  {
    q: '¿Qué pasa con mis pedidos pendientes?',
    a: 'Todos los pedidos realizados hasta la fecha de cierre serán gestionados y recibirás información por email. Si tienes dudas, contacta con nuestro soporte.'
  },
  {
    q: '¿Qué ocurre con mis datos personales?',
    a: 'Tus datos serán tratados conforme a la normativa vigente y eliminados según la política de privacidad. Puedes consultar los detalles en el enlace al final de la página.'
  },
  {
    q: '¿Cómo puedo contactar con soporte tras el cierre?',
    a: 'Puedes escribirnos a soporte@tu.com para cualquier consulta relacionada con el cierre o tus pedidos.'
  },
  {
    q: '¿Habrá vuelta de tu.com en el futuro?',
    a: 'Por el momento, tu.com finaliza su actividad. Si hubiera novedades, las comunicaríamos en nuestros canales oficiales.'
  },
  {
    q: '¿Dónde puedo consultar el aviso legal y la política de privacidad?',
    a: 'Tienes los enlaces al aviso legal, política de privacidad y cookies al final de esta página.'
  }
];

// Datos de ejemplo para las tarjetas de producto/servicio
const products = [
  {
    title: 'SEAL',
    desc: 'Solución de identidad digital segura y fácil de usar.',
    tag: 'Identidad',
    img: '/img/seal.jpg',
    cta: 'Ver más',
  },
  {
    title: 'FAME',
    desc: 'Gestión de la reputación digital y verificación de usuarios.',
    tag: 'Reputación',
    img: '/img/fame.jpg',
    cta: 'Ver más',
  },
  {
    title: 'Wallet',
    desc: 'Tu cartera digital para pagos y gestión de activos.',
    tag: 'Pagos',
    img: '/img/wallet.jpg',
    cta: 'Ver más',
  },
  {
    title: 'PT',
    desc: 'Plataforma de tokenización y activos digitales.',
    tag: 'Tokenización',
    img: '/img/pt.jpg',
    cta: 'Ver más',
  },
  {
    title: 'Ocean',
    desc: 'Soluciones de datos y privacidad avanzada.',
    tag: 'Datos',
    img: '/img/ocean.jpg',
    cta: 'Ver más',
  },
  {
    title: 'Golden',
    desc: 'Innovación en trazabilidad y blockchain.',
    tag: 'Blockchain',
    img: '/img/golden.jpg',
    cta: 'Ver más',
  },
];

function ProductCard({ title, desc, tag, img, cta }) {
  return (
    <div className="product-card">
      <img src={img} alt={title} className="product-img" />
      <div className="product-content">
        <span className="product-tag">{tag}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <button className="product-btn">{cta}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState(null);
  const [open, setOpen] = useState(null);

  return (
    <div className="tu-cierre-root">
      {/* SEO metadatos */}
      <Helmet>
        <title>TU.com - Aviso de Cierre y Agradecimiento</title>
        <meta name="description" content="Información oficial sobre el cierre de TU.com. Consulta FAQs, contacto y agradecimiento a nuestros clientes." />
      </Helmet>
      {/* Hero de cierre */}
      <header className="tu-hero">
        <img src="/logo-tu.svg" alt="tu.com logo" className="tu-logo" />
        <h1>Gracias por acompañarnos.<br />tu.com cierra su actividad.</h1>
        <p className="tu-hero-sub">Tras años de innovación y servicio, ponemos fin a nuestra etapa como e-commerce.</p>
      </header>

      {/* Mensaje de agradecimiento */}
      <section className="tu-gracias">
        <h2>¡Gracias por tu confianza!</h2>
        <p>Queremos agradecer a todos nuestros clientes, partners y equipo por haber formado parte de esta aventura. Ha sido un honor acompañarte en tu día a día digital.</p>
      </section>

      {/* Explicación del cierre */}
      <section className="tu-cierre-explicacion">
        <h3>¿Por qué cerramos?</h3>
        <p>El sector evoluciona y, tras una profunda reflexión, hemos decidido cerrar tu.com para centrarnos en nuevos retos. Seguiremos trabajando para ofrecer innovación y valor en el futuro, desde otros proyectos.</p>
        {/* Si tienes un PDF de comunicado oficial, descomenta la línea siguiente y pon la URL */}
        {/* <a href="/comunicado-cierre.pdf" className="tu-btn" download>Descargar comunicado oficial</a> */}
      </section>

      {/* FAQ */}
      <section className="tu-faq">
        <h3>Preguntas frecuentes</h3>
        <ul>
          {faqs.map((faq, i) => (
            <li key={i} className={open === i ? "open" : ""}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {faq.q}
                <span className="tu-faq-arrow">{open === i ? "▲" : "▼"}</span>
              </button>
              {open === i && <div className="tu-faq-a">{faq.a}</div>}
            </li>
          ))}
        </ul>
      </section>

      {/* Contacto */}
      <section className="tu-contacto">
        <h3>¿Necesitas ayuda?</h3>
        <p>Escríbenos a <a href="mailto:soporte@tu.com">soporte@tu.com</a> y te ayudaremos lo antes posible.</p>
      </section>

      {/* Footer */}
      <footer className="tu-footer">
        <img src="/logo-tu.svg" alt="tu.com logo pequeño" className="tu-logo-footer" />
        <nav>
          <a href="/privacidad.html" rel="noopener noreferrer">Privacidad</a>
          <a href="/cookies.html" rel="noopener noreferrer">Cookies</a>
          <a href="/aviso-legal.html" rel="noopener noreferrer">Aviso legal</a>
        </nav>
        <div className="tu-copy">© {new Date().getFullYear()} tu.com. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
} 