import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';
import './App.css';

const scenarios = [
  {
    id: 'seguimiento',
    title: 'Seguimiento de pedido',
    summary: 'Aura confirma el estado del envío, ofrece compensación y envía un resumen automático.',
    description: 'Cliente retail que necesita saber dónde está su paquete y recibir un gesto comercial.',
    tags: ['Retail', 'Español', 'NPS 9'],
    script: [
      { speaker: 'Cliente', text: 'Hola, llamo porque mi pedido 4589-TRK aún no llega y ya pasó la fecha estimada.' },
      {
        speaker: 'Aura',
        text: 'Gracias por llamar. Ya localicé tu pedido: llegará mañana antes de las 18:00. Lamento la demora.',
      },
      {
        speaker: 'Cliente',
        text: '¿Pueden asegurar que llegue mañana? Lo necesito urgente.',
      },
      {
        speaker: 'Aura',
        text: 'He priorizado tu entrega y recibirás avisos por WhatsApp. También te envío un cupón para tu próxima compra.',
      },
      { speaker: 'Cliente', text: 'Perfecto, muchas gracias.' },
      { speaker: 'Aura', text: 'Un placer ayudarte. Te llegará un resumen al correo en un minuto.' },
    ],
    insights: ['Resolución en 3:10 minutos', 'Resumen enviado a Zendesk', 'CSAT esperado: 9/10'],
  },
  {
    id: 'soporte',
    title: 'Soporte técnico IoT',
    summary: 'Diagnóstico remoto, actualización de firmware y programación de reemplazo preventivo.',
    description: 'Usuario angloparlante con router inteligente fuera de línea tras una tormenta.',
    tags: ['Tecnología', 'Inglés', 'Autonomía 85%'],
    script: [
      { speaker: 'Cliente', text: "My Aura Router lost connection after last night’s storm." },
      {
        speaker: 'Aura',
        text: 'Hi! Diagnostics show an outdated firmware. I can push the update and restart it for you right away.',
      },
      { speaker: 'Cliente', text: 'Please do. Will my current settings remain?' },
      {
        speaker: 'Aura',
        text: 'They are backed up. I will also schedule a technician visit in case the hardware was damaged.',
      },
      { speaker: 'Cliente', text: 'Great, thank you!' },
      {
        speaker: 'Aura',
        text: 'All set. Expect a recap email and the visit confirmation by SMS in less than a minute.',
      },
    ],
    insights: ['Actualización aplicada con éxito', 'Visita programada automáticamente', 'Sin escalado humano'],
  },
  {
    id: 'banca',
    title: 'Autenticación bancaria',
    summary: 'Verificación MFA, congelamiento de tarjeta y creación de caso antifraude.',
    description: 'Cliente detecta un cargo desconocido y necesita bloquear su tarjeta de forma segura.',
    tags: ['Finanzas', 'Español', 'Cumple PSD2'],
    script: [
      { speaker: 'Cliente', text: 'Buenas, acabo de ver un cargo que no reconozco en mi tarjeta.' },
      {
        speaker: 'Aura',
        text: 'Te ayudo de inmediato. Necesito validar tu identidad con un código SMS y tu PIN de voz registrado, ¿de acuerdo?',
      },
      { speaker: 'Cliente', text: 'Sí, adelante.' },
      {
        speaker: 'Aura',
        text: 'Identidad verificada. Tu tarjeta queda congelada y he generado un expediente. Recibirás confirmación en 10 minutos.',
      },
      { speaker: 'Cliente', text: 'Gracias por la rapidez.' },
      { speaker: 'Aura', text: 'Para eso estamos. Te envío consejos para reforzar tu seguridad digital.' },
    ],
    insights: ['Bloqueo inmediato registrado', 'Alertas al equipo de fraude', 'Resumen enviado al core bancario'],
  },
];

const setupChecklist = [
  'Cuenta ChatGPT Plus o Enterprise con acceso a GPT-4 Turbo.',
  'Proveedor de telefonía o centralita (Twilio, Aircall, Zoom Phone).',
  'Webhook HTTPS para transcripciones y eventos de llamada.',
  'Base de conocimiento exportable (FAQ, macros, guiones).',
  'Supervisores que aprueban respuestas sensibles en modo copiloto.',
];

const rolloutSteps = [
  {
    title: '1 · Conecta tus fuentes',
    detail: 'Importa FAQs, historiales de chat y políticas de cumplimiento en menos de 30 minutos.',
  },
  {
    title: '2 · Configura la centralita',
    detail: 'Sincroniza saludos, horarios y transferencia a agentes humanos con un asistente guiado.',
  },
  {
    title: '3 · Activa el modo piloto',
    detail: 'Aura escucha y sugiere respuestas en vivo. Tus agentes aprueban o editan antes de enviarlas.',
  },
  {
    title: '4 · Automatiza y mide',
    detail: 'Desbloquea autonomía total, recibe resúmenes automáticos y métricas de satisfacción diarias.',
  },
];

const initialSettings = {
  voice: true,
  crm: true,
  sentiment: false,
  compliance: true,
};

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [step, setStep] = useState(-1);
  const [settings, setSettings] = useState(initialSettings);

  const transcript = useMemo(() => {
    if (step < 0) return [];
    return selectedScenario.script.slice(0, step + 1);
  }, [step, selectedScenario]);

  const isComplete = step >= selectedScenario.script.length - 1 && step !== -1;

  const handleScenario = (scenario) => {
    setSelectedScenario(scenario);
    setStep(-1);
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStart = () => setStep(0);
  const handleNext = () => setStep((prev) => Math.min(prev + 1, selectedScenario.script.length - 1));
  const handleReset = () => setStep(-1);

  return (
    <div className="app-shell">
      <Helmet>
        <title>Aura Calls · Demo asistente virtual</title>
        <meta
          name="description"
          content="Demo web para simular cómo Aura, un asistente virtual con ChatGPT Plus, gestiona llamadas entrantes paso a paso."
        />
      </Helmet>

      <header className="top-bar">
        <div className="brand">Aura Calls</div>
        <nav>
          <a href="#demo">Demo</a>
          <a href="#requisitos">Requisitos</a>
          <a href="#implementacion">Implementación</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="primary" href="#contacto">
          Solicitar demo guiada
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div>
            <h1>Simulador listo para mostrar Aura con tu cuenta ChatGPT Plus.</h1>
            <p>
              Presenta en minutos cómo un asistente virtual atiende llamadas reales: selección de escenarios, guion paso a paso,
              insights y checklist técnico.
            </p>
            <div className="hero-stats">
              <article>
                <strong>70%</strong>
                <span>Automatización de llamadas</span>
              </article>
              <article>
                <strong>45s</strong>
                <span>Resumen enviado al CRM</span>
              </article>
              <article>
                <strong>24/7</strong>
                <span>Disponibilidad asistente</span>
              </article>
            </div>
          </div>
          <div className="hero-card">
            <h2>Cómo usar la demo</h2>
            <ol>
              <li>Elige un escenario y pulsa «Iniciar llamada».</li>
              <li>Avanza turno a turno para ver la conversación generada.</li>
              <li>Activa o desactiva capacidades del asistente.</li>
              <li>Comparte insights, requisitos y siguientes pasos con tu equipo.</li>
            </ol>
          </div>
        </section>

        <section className="demo" id="demo">
          <header>
            <h2>Demo en vivo</h2>
            <p>Selecciona un escenario y recorre la conversación como si estuvieras atendiendo la llamada ahora mismo.</p>
          </header>
          <div className="demo-layout">
            <aside className="scenario-panel">
              <h3>Escenarios disponibles</h3>
              <ul>
                {scenarios.map((scenario) => (
                  <li key={scenario.id}>
                    <button
                      type="button"
                      className={scenario.id === selectedScenario.id ? 'scenario active' : 'scenario'}
                      onClick={() => handleScenario(scenario)}
                    >
                      <div className="scenario-head">
                        <span>{scenario.title}</span>
                        <small>{scenario.description}</small>
                      </div>
                      <div className="scenario-tags">
                        {scenario.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="call-panel">
              <div className="call-header">
                <div>
                  <h3>{selectedScenario.title}</h3>
                  <p>{selectedScenario.summary}</p>
                </div>
                <div className="call-controls">
                  <button type="button" onClick={handleReset} disabled={step < 0}>
                    Reiniciar
                  </button>
                  {step < 0 ? (
                    <button type="button" className="primary" onClick={handleStart}>
                      Iniciar llamada
                    </button>
                  ) : (
                    <button type="button" className="primary" onClick={handleNext} disabled={isComplete}>
                      {isComplete ? 'Guion completo' : 'Siguiente turno'}
                    </button>
                  )}
                </div>
              </div>

              <div className="transcript">
                {transcript.length === 0 ? (
                  <div className="placeholder">Pulsa «Iniciar llamada» para ver la transcripción generada.</div>
                ) : (
                  transcript.map((line, index) => (
                    <article key={`${line.speaker}-${index}`} className={line.speaker === 'Aura' ? 'bubble ai' : 'bubble'}>
                      <header>{line.speaker}</header>
                      <p>{line.text}</p>
                    </article>
                  ))
                )}
              </div>

              <div className="insights">
                <h4>Insights del asistente</h4>
                <ul>
                  {selectedScenario.insights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="settings-panel">
              <h3>Capacidades activas</h3>
              <ul>
                {Object.entries(settings).map(([key, value]) => (
                  <li key={key}>
                    <label>
                      <input type="checkbox" checked={value} onChange={() => toggleSetting(key)} />
                      <span className="setting-label">
                        {key === 'voice' && 'Voz neural con tono configurable'}
                        {key === 'crm' && 'Sincronizar resumen a CRM'}
                        {key === 'sentiment' && 'Análisis de sentimiento en vivo'}
                        {key === 'compliance' && 'Registro y auditoría de consentimiento'}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="note">
                <strong>Modo copiloto</strong>
                <p>
                  Aura sugiere respuestas en tiempo real y tus agentes deciden si las envían o las editan antes de responder.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="requirements" id="requisitos">
          <h2>Checklist para lanzar la demo</h2>
          <ul>
            {setupChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="implementation" id="implementacion">
          <h2>Implementación guiada</h2>
          <div className="steps">
            {rolloutSteps.map((stepItem) => (
              <article key={stepItem.title}>
                <h3>{stepItem.title}</h3>
                <p>{stepItem.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contacto">
          <div>
            <h2>Agenda una sesión</h2>
            <p>
              Te ayudamos a conectar tu cuenta ChatGPT Plus, importar datos y lanzar el piloto con métricas claras desde el
              primer día.
            </p>
          </div>
          <form>
            <label>
              Nombre y empresa
              <input type="text" placeholder="María López · Operaciones" />
            </label>
            <label>
              Email profesional
              <input type="email" placeholder="maria@tuempresa.com" />
            </label>
            <label>
              Objetivo principal
              <select defaultValue="">
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option>Reducir tiempos de espera</option>
                <option>Ampliar cobertura 24/7</option>
                <option>Mejorar experiencia de cliente</option>
                <option>Integrar con CRM</option>
              </select>
            </label>
            <button type="button" className="primary">
              Reservar demo virtual
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Aura Calls · Demo alimentada por GPT-4 Turbo.</span>
        <div className="footer-links">
          <a href="mailto:hola@auracalls.ai">hola@auracalls.ai</a>
          <a href="/politica-privacidad.txt" target="_blank" rel="noreferrer">
            Privacidad
          </a>
          <a href="/politica-cookies.txt" target="_blank" rel="noreferrer">
            Cookies
          </a>
        </div>
      </footer>
    </div>
  );
}
