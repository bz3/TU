import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';
import './App.css';

const features = [
  {
    title: 'Recepción inteligente de llamadas',
    description:
      'Detecta automáticamente el motivo de la llamada entrante y despliega guiones contextuales generados con GPT-4 para acelerar la resolución.',
    icon: '📞',
  },
  {
    title: 'Asistente multicanal',
    description:
      'Transcribe en tiempo real, genera respuestas de voz naturales y envía resúmenes automáticos al CRM o a tu bandeja de correo.',
    icon: '🗣️',
  },
  {
    title: 'Control y cumplimiento',
    description:
      'Configura límites de tono, manejo de objeciones sensibles y consentimiento explícito según las políticas de tu organización.',
    icon: '🛡️',
  },
  {
    title: 'Entrenamiento continuo',
    description:
      'Comparte grabaciones reales con el asistente para que proponga mejoras y genere nuevos flujos de conversación automáticamente.',
    icon: '🧠',
  },
];

const rolloutSteps = [
  {
    label: '1. Definición',
    detail:
      'Conecta tu cuenta ChatGPT Plus o Enterprise e importa FAQs, argumentarios y políticas corporativas. El modelo aprende el tono de tu marca en minutos.',
  },
  {
    label: '2. Integración',
    detail:
      'Sincroniza tu centralita o proveedor VoIP (Twilio, Aircall, Zoom Phone) y configura saludos, horarios y transferencias calientes.',
  },
  {
    label: '3. Supervisión',
    detail:
      'Activa el modo copiloto para que el asistente sugiera respuestas en vivo y monitoriza su precisión antes de darle autonomía total.',
  },
  {
    label: '4. Mejora continua',
    detail:
      'Recibe resúmenes ejecutivos diarios, métricas de satisfacción y propuestas de optimización generadas con GPT para tu equipo de calidad.',
  },
];

const addOns = [
  {
    title: 'Memoria de contexto extendido',
    description:
      'Almacena el histórico de conversaciones hasta 30 días para que el asistente recuerde pedidos previos y preferencias.',
  },
  {
    title: 'Traducción simultánea',
    description:
      'Responde en el idioma del cliente aunque llame en otro, manteniendo el tono profesional y cercano.',
  },
  {
    title: 'Análisis de sentimiento',
    description:
      'Detecta señales de frustración y propone escalados automáticos a un agente humano o a un supervisor en tiempo real.',
  },
];

const scenarios = [
  {
    id: 'postventa',
    title: 'Seguimiento de pedido',
    tags: ['Retail', 'Posventa', 'Español'],
    description:
      'Un cliente llama para saber dónde está su paquete. El asistente consulta el CRM y ofrece soluciones proactivas.',
    summary:
      'El asistente identifica el pedido, notifica un retraso de 24h y ofrece un cupón de cortesía. Cierra la llamada con NPS 9.',
    script: [
      { speaker: 'Cliente', text: 'Hola, llamo porque mi pedido 4589-TRK aún no llega y ya pasó la fecha estimada.' },
      {
        speaker: 'Asistente',
        text: 'Hola, soy Aura de tu.com. Déjame revisar tu pedido 4589-TRK... Veo que salió del almacén ayer y llegará mañana antes de las 18:00. Siento la espera.',
      },
      {
        speaker: 'Cliente',
        text: '¿Hay alguna forma de asegurarme de que llegue mañana? Lo necesito para un evento.',
      },
      {
        speaker: 'Asistente',
        text: 'Ya prioricé la entrega con nuestro operador y recibirás actualizaciones por WhatsApp. Además, te ofrezco un cupón de envío express gratis para tu próxima compra.',
      },
      { speaker: 'Cliente', text: 'Perfecto, muchas gracias por la ayuda.' },
      { speaker: 'Asistente', text: 'Gracias a ti. Te enviaré un resumen por correo. ¡Que tengas un gran día!' },
    ],
    insights: [
      '97% de precisión en identificación de pedidos.',
      'Reducción de 2 minutos en la duración media de llamada.',
    ],
  },
  {
    id: 'soporte-tecnico',
    title: 'Soporte técnico IoT',
    tags: ['Tecnología', 'Dispositivos', 'Inglés'],
    description:
      'Un usuario con un router inteligente necesita ayuda para restablecer la conexión y validar la garantía.',
    summary:
      'El asistente guía el reinicio, detecta un firmware obsoleto y agenda un reemplazo automatizado con confirmación por SMS.',
    script: [
      { speaker: 'Cliente', text: 'My Aura Router lost connection after last night’s storm.' },
      {
        speaker: 'Asistente',
        text: 'Hi! Let me run a quick diagnostic. I can see the firmware is outdated. I will push the latest update and reboot it with your permission.',
      },
      {
        speaker: 'Cliente',
        text: 'Go ahead, please. Will I lose my current configuration?',
      },
      {
        speaker: 'Asistente',
        text: 'No worries. Your configuration is backed up. I will also schedule a technician visit just in case the hardware was damaged.',
      },
      { speaker: 'Cliente', text: 'Thank you, that’s perfect.' },
      {
        speaker: 'Asistente',
        text: 'You’re welcome! You will receive a text with the appointment window and a call recap in less than a minute.',
      },
    ],
    insights: ['85% de resolución sin derivar a agentes humanos.', 'Tiempo medio de gestión inferior a 4 minutos.'],
  },
  {
    id: 'banca',
    title: 'Autenticación bancaria',
    tags: ['Finanzas', 'Seguridad', 'Español'],
    description:
      'Un cliente reporta un cargo no reconocido y necesita congelar temporalmente su tarjeta.',
    summary:
      'El asistente verifica identidad con autenticación multifactor, congela la tarjeta y genera un caso de investigación en el core bancario.',
    script: [
      { speaker: 'Cliente', text: 'Buenas, acabo de ver un cargo que no reconozco en mi tarjeta de crédito.' },
      {
        speaker: 'Asistente',
        text: 'Hola, soy Aura. Para proteger tu cuenta necesito validar tu identidad con un código SMS y tu PIN de voz registrado. ¿Listo?',
      },
      { speaker: 'Cliente', text: 'Sí, adelante.' },
      {
        speaker: 'Asistente',
        text: 'Código verificado. Acabo de congelar la tarjeta y he abierto un expediente. En 10 minutos recibirás la confirmación y una tarjeta digital temporal en tu app.',
      },
      { speaker: 'Cliente', text: 'Muchas gracias por la rapidez.' },
      { speaker: 'Asistente', text: 'Para eso estamos. Te enviaré también recomendaciones para reforzar tu seguridad.' },
    ],
    insights: ['Cumplimiento PSD2 y SOC2.', 'Detección temprana de fraude y bloqueo inmediato.'],
  },
];

const integrations = [
  'Twilio Voice',
  'Genesys Cloud',
  'Aircall',
  'Zendesk',
  'Salesforce Service Cloud',
  'HubSpot',
  'Freshdesk',
  'Microsoft Teams Phone',
];

const initialSettings = {
  voice: true,
  crm: true,
  sentiment: true,
  compliance: false,
};

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [simulationStep, setSimulationStep] = useState(-1);
  const [settings, setSettings] = useState(initialSettings);

  const displayedMessages = useMemo(() => {
    if (simulationStep < 0) return [];
    return selectedScenario.script.slice(0, simulationStep + 1);
  }, [selectedScenario, simulationStep]);

  const isFinished = simulationStep >= selectedScenario.script.length - 1 && simulationStep !== -1;

  const handleScenarioChange = (scenario) => {
    setSelectedScenario(scenario);
    setSimulationStep(-1);
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStart = () => {
    setSimulationStep(0);
  };

  const handleAdvance = () => {
    setSimulationStep((prev) => Math.min(prev + 1, selectedScenario.script.length - 1));
  };

  const handleReset = () => {
    setSimulationStep(-1);
  };

  return (
    <div className="assistant-app">
      <Helmet>
        <title>Aura Calls · Asistente virtual con ChatGPT Plus</title>
        <meta
          name="description"
          content="Simula cómo un asistente virtual impulsado con ChatGPT Plus gestiona llamadas entrantes, automatiza respuestas y genera resúmenes en segundos."
        />
      </Helmet>

      <header className="app-header">
        <div className="brand">Aura Calls</div>
        <nav className="main-nav">
          <a href="#simulador">Simulador</a>
          <a href="#implementacion">Implementación</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <button className="primary-btn">Solicitar demo</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="hero-badge">Potenciado con ChatGPT Plus</p>
            <h1>Convierte cada llamada en una experiencia memorable con un asistente virtual listo en días.</h1>
            <p className="hero-sub">
              Diseñado para equipos de soporte, ventas y operaciones que buscan automatizar hasta el 70% de las llamadas entrantes
              manteniendo el toque humano.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">Iniciar simulación</button>
              <button className="ghost-btn">Ver documentación</button>
            </div>
            <div className="hero-metrics">
              <div>
                <span className="metric-number">24/7</span>
                <span className="metric-label">Disponibilidad</span>
              </div>
              <div>
                <span className="metric-number">-65%</span>
                <span className="metric-label">Tiempo medio de gestión</span>
              </div>
              <div>
                <span className="metric-number">+32%</span>
                <span className="metric-label">Satisfacción (CSAT)</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card">
              <h3>Panel en vivo</h3>
              <ul>
                <li><strong>05</strong> llamadas en espera</li>
                <li><strong>12</strong> sugerencias generadas</li>
                <li><strong>98%</strong> cumplimiento de guion</li>
              </ul>
              <p className="visual-footnote">Datos generados automáticamente con GPT-4.</p>
            </div>
            <div className="visual-card secondary">
              <h3>Resumen automático</h3>
              <p>
                «Cliente solicita reenvío. Pedido reprogramado para el 12/06, se ofrece cupón de cortesía. Sin incidencias abiertas.»
              </p>
              <span className="visual-badge">Listo para CRM</span>
            </div>
          </div>
        </section>

        <section className="features" id="beneficios">
          <h2>Lo que tu equipo consigue</h2>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <span className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="implementation" id="implementacion">
          <div className="implementation-header">
            <h2>De idea a asistente operativo en menos de dos semanas</h2>
            <p>
              Sigue este plan de despliegue guiado con plantillas, playbooks y automatizaciones preconfiguradas para cuentas ChatGPT
              Plus o Enterprise.
            </p>
          </div>
          <div className="rollout">
            {rolloutSteps.map((step) => (
              <div key={step.label} className="rollout-step">
                <div className="rollout-label">{step.label}</div>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="add-ons">
            {addOns.map((addOn) => (
              <div key={addOn.title} className="add-on-card">
                <h3>{addOn.title}</h3>
                <p>{addOn.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="simulation" id="simulador">
          <div className="section-heading">
            <div>
              <h2>Simulador de llamada en vivo</h2>
              <p>Elige un escenario y avanza para observar cómo responde el asistente Aura con sugerencias generadas por GPT-4.</p>
            </div>
            <div className="integrations">
              <h3>Integraciones instantáneas</h3>
              <div className="integration-tags">
                {integrations.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="simulation-grid">
            <aside className="scenario-column">
              <h3>Casos disponibles</h3>
              <ul>
                {scenarios.map((scenario) => (
                  <li key={scenario.id}>
                    <button
                      className={scenario.id === selectedScenario.id ? 'scenario-btn active' : 'scenario-btn'}
                      onClick={() => handleScenarioChange(scenario)}
                    >
                      <span className="scenario-title">{scenario.title}</span>
                      <span className="scenario-desc">{scenario.description}</span>
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

            <div className="simulation-panel">
              <header className="panel-header">
                <div>
                  <h3>{selectedScenario.title}</h3>
                  <p>{selectedScenario.summary}</p>
                </div>
                <div className="panel-controls">
                  <button className="ghost-btn" onClick={handleReset} disabled={simulationStep < 0}>
                    Reiniciar
                  </button>
                  {simulationStep < 0 ? (
                    <button className="primary-btn" onClick={handleStart}>
                      Iniciar
                    </button>
                  ) : (
                    <button className="primary-btn" onClick={handleAdvance} disabled={isFinished}>
                      {isFinished ? 'Completo' : 'Siguiente turno'}
                    </button>
                  )}
                </div>
              </header>

              <div className="transcript">
                {displayedMessages.length === 0 && (
                  <div className="transcript-placeholder">
                    Pulsa «Iniciar» para reproducir la conversación generada por el asistente.
                  </div>
                )}
                {displayedMessages.map((message, index) => (
                  <div key={`${message.speaker}-${index}`} className={`bubble ${message.speaker === 'Asistente' ? 'ai' : 'client'}`}>
                    <div className="bubble-speaker">{message.speaker}</div>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>

              <div className="insights">
                <h4>Insights automáticos</h4>
                <ul>
                  {selectedScenario.insights.map((insight) => (
                    <li key={insight}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="config-panel">
              <h3>Controles del asistente</h3>
              <div className="toggle-list">
                <label className={settings.voice ? 'toggle active' : 'toggle'}>
                  <input type="checkbox" checked={settings.voice} onChange={() => toggleSetting('voice')} />
                  <span className="toggle-indicator" />
                  Voz neural femenina
                </label>
                <label className={settings.crm ? 'toggle active' : 'toggle'}>
                  <input type="checkbox" checked={settings.crm} onChange={() => toggleSetting('crm')} />
                  <span className="toggle-indicator" />
                  Sincronizar resumen a CRM
                </label>
                <label className={settings.sentiment ? 'toggle active' : 'toggle'}>
                  <input type="checkbox" checked={settings.sentiment} onChange={() => toggleSetting('sentiment')} />
                  <span className="toggle-indicator" />
                  Analítica de sentimiento en vivo
                </label>
                <label className={settings.compliance ? 'toggle active' : 'toggle'}>
                  <input type="checkbox" checked={settings.compliance} onChange={() => toggleSetting('compliance')} />
                  <span className="toggle-indicator" />
                  Registro y auditoría de consentimiento
                </label>
              </div>
              <div className="config-note">
                <h4>Modo copiloto</h4>
                <p>
                  El asistente escucha la llamada en tiempo real y propone respuestas que tu agente puede enviar o editar antes de
                  leerlas. Perfecto para adopción gradual.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="call-metrics">
          <div className="metrics-card">
            <h2>Resultados que puedes esperar</h2>
            <ul>
              <li>
                <strong>92%</strong> de las llamadas de nivel 1 se resuelven sin intervención humana.
              </li>
              <li>
                <strong>45 segundos</strong> para generar un resumen estructurado con tareas pendientes y sentimientos detectados.
              </li>
              <li>
                <strong>Compatibilidad</strong> con políticas ISO 27001, SOC2 y RGPD gracias a redacción controlada.
              </li>
            </ul>
          </div>
          <div className="metrics-card secondary">
            <h3>Checklist técnico</h3>
            <ol>
              <li>Cuenta ChatGPT Plus o Enterprise con acceso a GPT-4 Turbo.</li>
              <li>Webhook seguro para recibir transcripciones de tu centralita.</li>
              <li>Base de conocimiento exportable (CSV, Notion, Zendesk) para entrenamiento.</li>
              <li>Usuarios supervisores para aprobar respuestas sensibles.</li>
            </ol>
          </div>
        </section>

        <section className="cta" id="contacto">
          <div>
            <h2>¿Listo para tu asistente virtual?</h2>
            <p>
              Agenda una sesión con nuestro equipo para conectar tu cuenta ChatGPT Plus, importar tus conversaciones históricas y
              activar el modo piloto en cuestión de días.
            </p>
          </div>
          <form className="cta-form">
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
              <select>
                <option>Reducir tiempos de espera</option>
                <option>Ampliar soporte 24/7</option>
                <option>Mejorar experiencia de cliente</option>
                <option>Integrar con CRM</option>
              </select>
            </label>
            <button type="button" className="primary-btn">
              Reservar una demo guiada
            </button>
          </form>
        </section>
      </main>

      <footer className="app-footer">
        <div>Aura Calls © {new Date().getFullYear()} · Construido con GPT-4 para equipos que atienden llamadas.</div>
        <div className="footer-links">
          <a href="/politica-privacidad.txt" target="_blank" rel="noreferrer">
            Privacidad
          </a>
          <a href="/politica-cookies.txt" target="_blank" rel="noreferrer">
            Cookies
          </a>
          <a href="mailto:hola@auracalls.ai">Contacto</a>
        </div>
      </footer>
    </div>
  );
}
