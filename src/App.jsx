import React, { useState } from 'react';
import PolicyModal from './PoliciyModal';
import './App.css';

const privacyText = `Responsable: Telefónica Innovación Digital, S.L.U.\n\nFinalidad: Gestión de consultas y comunicaciones relacionadas con el cierre de TU.com.\n\nLegitimación: Consentimiento del usuario.\n\nDestinatarios: No se cederán datos a terceros, salvo obligación legal.\n\nDerechos: Acceso, rectificación, supresión y demás derechos según la normativa vigente.\n\nContacto: info@tu.com`;
const cookiesText = `Esta web no utiliza cookies de seguimiento ni de terceros. Solo se emplean cookies técnicas imprescindibles para el funcionamiento y la seguridad del sitio.\n\nSi tienes dudas, puedes contactar con info@tu.com.`;

export default function App() {
  const [modal, setModal] = useState(null);
  return (
    <div className="container">
      <header className="header">
        <img src="/logo-tu.svg" alt="TU.com Logo" className="logo" />
      </header>
      <main className="main">
        <section className="closure">
          <h1>Comunicado importante</h1>
          <p>
            Lamentamos informarte de que <strong>TU.com</strong> ha cesado definitivamente su actividad. Queremos agradecer a todos nuestros usuarios y colaboradores la confianza depositada durante estos años.
          </p>
          <p>
            Si necesitas información adicional o soporte, puedes contactar con nosotros a través del correo <a href="mailto:info@tu.com">info@tu.com</a>.
          </p>
        </section>
        <section className="legal">
          <h2>Aviso Legal</h2>
          <p>
            Esta web y su contenido son propiedad de Telefónica Innovación Digital, S.L.U. Queda prohibida la reproducción total o parcial de los contenidos sin autorización expresa. Para más información sobre el tratamiento de datos personales, consulta nuestra{' '}
            <a href="#" onClick={e => { e.preventDefault(); setModal('privacidad'); }}>Política de Privacidad</a> y{' '}
            <a href="#" onClick={e => { e.preventDefault(); setModal('cookies'); }}>Política de Cookies</a>.
          </p>
        </section>
      </main>
      <footer className="footer">
        <small>© Telefónica Innovación Digital, S.L.U. Todos los derechos reservados.</small>
      </footer>
      <PolicyModal
        open={modal === 'privacidad'}
        onClose={() => setModal(null)}
        title="Política de Privacidad"
        text={privacyText}
      />
      <PolicyModal
        open={modal === 'cookies'}
        onClose={() => setModal(null)}
        title="Política de Cookies"
        text={cookiesText}
      />
    </div>
  );
} 