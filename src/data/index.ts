import { Icon } from '../icons'
import photoAlonsoGil from '../assets/testimonios/alonso_gil.jpg'
import photoSuilerAltamirano from '../assets/testimonios/suiler_altamirano.jpg'
import photoJuanCarlosGutierrez from '../assets/testimonios/juancarlos_gutierrez.jpg'

/* ------------------------------------------------------------------ */
/*  Data (copy intacto)                                                */
/* ------------------------------------------------------------------ */
export const inbox = [
  { initials: 'MT', name: 'María Torres', msg: '¡Mi pago fue exitoso! 🎉', time: '12:45', unread: false },
  { initials: 'CR', name: 'Camila Ríos', msg: '¿Tienen la talla M?', time: '13:30', unread: true },
  { initials: 'JL', name: 'José Luna', msg: 'Quiero 2 docenas', time: '14:15', unread: true },
]

export const channels = [
  { icon: Icon.Whatsapp, label: 'WhatsApp' },
  { icon: Icon.Instagram, label: 'Instagram' },
  { icon: Icon.Chart, label: 'Excel' },
  { icon: Icon.Folder, label: 'Google Sheets' },
]

export const pains = [
  { icon: Icon.Whatsapp, text: 'Pedidos por WhatsApp que se pierden entre tantos chats.' },
  { icon: Icon.Store, text: 'Stock que se acaba sin aviso y te enteras tarde.' },
  { icon: Icon.Chart, text: 'Reportes que nadie tiene tiempo de hacer.' },
  { icon: Icon.Chat, text: 'Clientes que preguntan lo mismo todos los días.' },
  { icon: Icon.Cash, text: 'Caja que recién revisas a mano al cierre.' },
  { icon: Icon.Folder, text: 'Info regada en cuadernos, Excel, notas y chats.' },
]

export const solutions = [
  { tab: 'Atención', quote: 'Me preguntan todo el día precio, talla, stock o disponibilidad.', solution: 'Respuestas asistidas y un catálogo simple conectado a WhatsApp.', exampleFrom: 'Cliente · 8:47 p.m.', exampleAsk: 'Hola, ¿tienes la casaca negra en M? ¿Cuánto está y haces delivery?', exampleDone: 'Respuesta lista: stock disponible, precio, link de pago y tiempo de entrega.' },
  { tab: 'Stock', quote: 'Me doy cuenta que falta mercadería cuando el cliente ya la pidió.', solution: 'Alertas de reposición y reporte de tus productos más vendidos.', exampleFrom: 'Alerta de tienda · 6:15 p.m.', exampleAsk: 'Quedan 3 unidades de lo que más se vende el fin de semana.', exampleDone: 'Compra sugerida: reponer 24 unidades antes del viernes.' },
  { tab: 'Caja', quote: 'Cierro el día y recién trato de entender cuánto vendí.', solution: 'Resumen diario automático de ventas, pagos, pedidos y pendientes.', exampleFrom: 'Cierre de caja · 10:02 p.m.', exampleAsk: 'Hoy hubo efectivo, Yape, transferencias y dos pedidos pendientes.', exampleDone: 'Resumen listo: ventas, pagos por canal, pendientes y diferencia por revisar.' },
  { tab: 'Clientes', quote: 'Me escriben, preguntan y después se pierden.', solution: 'Recordatorios para volver a contactar a clientes interesados.', exampleFrom: 'Seguimiento · 11:30 a.m.', exampleAsk: '3 clientes preguntaron precio ayer y no respondieron después.', exampleDone: 'Mensajes preparados para retomar la conversación sin sonar insistente.' },
  { tab: 'Academia', quote: 'Se me mezclan alumnos, pagos, horarios y consultas por todos lados.', solution: 'Control simple de alumnos, pagos pendientes, clases y mensajes frecuentes.', exampleFrom: 'Academia · 7:30 p.m.', exampleAsk: 'Un papá pregunta horario, otro debe mensualidad y hay alumnos por confirmar.', exampleDone: 'Resumen listo: pagos pendientes, clases de mañana y mensajes para enviar.' },
  { tab: 'Equipo', quote: 'A mi equipo le cuesta usar herramientas nuevas.', solution: 'Capacitación con casos reales y herramientas simples, no sistemas.', exampleFrom: 'Equipo · hora punta', exampleAsk: 'Cada vendedor anota pedidos distinto y después nadie encuentra nada.', exampleDone: 'Flujo único: cómo responder, registrar pedido y marcar estado en 3 pasos.' },
]

export const process = [
  { n: '1', title: 'Diagnóstico',       body: 'Vemos cómo vendes, cobras, atiendes y anotas. Encontramos dónde se va el tiempo.' },
  { n: '2', title: 'Prototipo rápido',  body: 'Te mostramos una mejora concreta antes de implementarla. Sin compromisos.' },
  { n: '3', title: 'Implementación',    body: 'Dejamos la solución funcionando, conectada a tu operación real del día a día.' },
  { n: '4', title: 'Acompañamiento',    body: 'Capacitamos a tu equipo y seguimos ajustando cuando tu negocio cambia.' },
]

export const sectors = [
  { icon: Icon.Store,       title: 'Bodegas y markets',        quote: 'IA que predice qué vas a necesitar antes de que se acabe.' },
  { icon: Icon.Shirt,       title: 'Tiendas de ropa',          quote: 'Automatiza respuestas de tallas, precios y disponibilidad.' },
  { icon: Icon.Utensils,    title: 'Restaurantes',             quote: 'Digitaliza tu carta y recibe pedidos sin llamadas ni papel.' },
  { icon: Icon.Wrench,      title: 'Ferreterías',              quote: 'Cotizaciones automáticas listas en segundos, sin calculadora.' },
  { icon: Icon.Stethoscope, title: 'Consultorios',             quote: 'IA que agenda citas, manda recordatorios y filtra urgencias.' },
  { icon: Icon.Cap,         title: 'Academias y talleres',     quote: 'Automatiza matrículas, pagos y comunicación con alumnos.' },
  { icon: Icon.Chat,        title: 'Atención al cliente',      quote: 'Un agente de IA que responde el 80% de consultas sin humano.' },
  { icon: Icon.Chart,       title: 'Análisis de ventas',       quote: 'Transforma tu Excel en un dashboard que se actualiza solo.' },
  { icon: Icon.Cash,        title: 'Gestión de cobranza',      quote: 'Recordatorios de pago automáticos por WhatsApp o correo.' },
  { icon: Icon.Folder,      title: 'Gestión documental',       quote: 'IA que clasifica, resume y encuentra cualquier archivo al instante.' },
  { icon: Icon.Whatsapp,    title: 'Ventas por WhatsApp',      quote: 'Automatiza tu proceso de venta sin salir de WhatsApp.' },
  { icon: Icon.Instagram,   title: 'Redes sociales',           quote: 'IA que genera contenido adaptado a tu negocio y calendario.' },
  { icon: Icon.Store,       title: 'Farmacias',                quote: 'Control de stock automatizado y alertas de reposición.' },
  { icon: Icon.Wrench,      title: 'Talleres mecánicos',       quote: 'Digitaliza órdenes de trabajo y automatiza el seguimiento.' },
  { icon: Icon.Stethoscope, title: 'Clínicas veterinarias',    quote: 'Historial de pacientes digital y recordatorios automáticos.' },
  { icon: Icon.Utensils,    title: 'Panaderías y pastelerías', quote: 'Planifica tu producción según pedidos anticipados del día.' },
  { icon: Icon.Cap,         title: 'Inmobiliarias',            quote: 'IA que califica leads y agenda visitas sin intervención manual.' },
  { icon: Icon.Chart,       title: 'Contadores y estudios',    quote: 'Automatiza reportes y deja que la IA detecte las anomalías.' },
  { icon: Icon.Folder,      title: 'Estudios jurídicos',       quote: 'IA que revisa contratos y genera borradores en minutos.' },
  { icon: Icon.Cash,        title: 'Gimnasios y centros fit',  quote: 'Transforma tu gestión: pagos, asistencia y seguimiento digital.' },
]

export const transformation = [
  { today: 'Pedidos perdidos entre mil chats de WhatsApp.', after: 'Pedidos ordenados, con estado y seguimiento.' },
  { today: 'Stock que revisas a ojo o cuando ya es tarde.', after: 'Alertas cuando un producto está por acabarse.' },
  { today: 'Cierras el día sin saber bien cuánto vendiste.', after: 'Resumen diario automático de ventas y caja.' },
  { today: 'Respondes lo mismo una y otra vez.', after: 'Respuestas listas para tus preguntas frecuentes.' },
]

export const trainingOrbit = [
  { icon: Icon.Whatsapp, label: 'WhatsApp', phrase: 'Responde clientes sin copiar y pegar', x: '14%', y: '60%', color: 'text-[#25D366]', delay: 0 },
  { icon: Icon.Instagram, label: 'Instagram', phrase: 'Convierte mensajes en ventas', x: '65%', y: '54%', color: 'text-brio-plum', delay: 0.18 },
  { icon: Icon.Chart, label: 'Excel', phrase: 'Reportes claros al cierre del día', x: '20%', y: '18%', color: 'text-brio-gold-dark', delay: 0.32 },
  { icon: Icon.Folder, label: 'Sheets', phrase: 'Stock y pedidos siempre ordenados', x: '70%', y: '14%', color: 'text-brio-plum', delay: 0.48 },
]

export const testimonials = [
  { initials: 'JG', name: 'Juan Carlos Gutiérrez', business: 'Gerente de Operaciones · Yawi', quote: 'Antes los pedidos de WhatsApp se me perdían. Ahora llegan ordenados y con seguimiento. Dejé de perder ventas.', photo: photoJuanCarlosGutierrez },
  { initials: 'SA', name: 'Suiler Altarimano', business: 'CEO · Control + S.A.C.', quote: 'La IA responde tallas, precios y stock al toque. Yo solo entro a cerrar la venta.', photo: photoSuilerAltamirano },
  { initials: 'AG', name: 'Alonso Gil', business: 'CEO · CorAll', quote: 'Cierro caja en minutos y sé qué se vendió sin sacar la calculadora. Mucho menos estrés en hora punta.', photo: photoAlonsoGil },
]

export const founders = [
  { photo: '/team/founder-1.png', initials: 'YR', name: 'Yumi Reyes', role: 'Negocio', bio: 'Entra a tu operación y la ordena contigo. Años ayudando a negocios a vender mejor sin complicarse.', ring: 'ring-brio-terra/30 bg-brio-terra' },
  { photo: '/team/founder-2.jpg', initials: 'MF', name: 'Miguel Fernández', role: 'Tecnología', bio: 'Hace que la tecnología sea simple. Herramientas que tu equipo sí usa, sin tecnicismos.', ring: 'ring-brio-plum/30 bg-brio-plum' },
]

/* Perfiles ampliados para la página Nosotros (basados en CV real) */
export const team = [
  {
    photo: '/team/founder-1.png',
    name: 'Yumi Reyes',
    role: 'Negocio & Producto de IA',
    bio: 'Lidera productos de IA generativa y agentes inteligentes para grandes corporaciones. CEO y fundador de Telodigo y Tripcito. Trae la visión de negocio y la obsesión por que la IA mueva plata, no solo que suene moderna.',
  },
  {
    photo: '/team/founder-2.jpg',
    name: 'Miguel Fernández',
    role: 'Tecnología & Arquitectura',
    bio: 'Trabaja en proyectos para Delosi, la cadena detrás de KFC y Starbucks en Perú, y viene del sector financiero de EE.UU. donde construyó plataformas que mueven pagos a escala. Arquitecto multi-cloud y full stack. Hace que la tecnología más compleja termine siendo simple de usar.',
  },
]

export const faqs = [
  { q: '¿Tengo que saber de IA para trabajar con ustedes?', a: 'No. Nuestro trabajo es traducir la tecnología a soluciones simples. Tú nos explicas cómo trabajas; nosotros vemos cómo simplificarlo.' },
  { q: '¿Me van a cambiar todo mi sistema?', a: 'No. Primero revisamos lo que ya usas. Si WhatsApp, Excel o Google Sheets resuelven bien con mejoras, empezamos por ahí.' },
  { q: '¿Esto es solo para empresas grandes?', a: 'No. Está pensado para negocios que venden, atienden y compran todos los días, aunque trabajen con cuadernos, hojas de cálculo o chats.' },
  { q: '¿Cuánto tiempo toma ver una mejora?', a: 'Depende del problema, pero la idea es empezar con una mejora pequeña y visible en semanas, no con un proyecto eterno.' },
  { q: '¿Qué pasa si mi equipo no se adapta?', a: 'Capacitamos con sus propios casos: responder clientes, ordenar pedidos, revisar stock o hacer reportes con sus herramientas reales.' },
  { q: '¿La IA va a reemplazar a mi gente?', a: 'No. La usamos para quitar tareas repetitivas y que tu equipo se enfoque en atender mejor, vender más y cometer menos errores.' },
]

export const principles = [
  { n: '01', icon: Icon.Store, title: 'Empezamos por el negocio', body: 'Antes de tocar tecnología entendemos cómo vendes, cobras y atiendes. La herramienta viene después, no al revés.' },
  { n: '02', icon: Icon.Sparkles, title: 'Lo simple gana', body: 'Si una hoja de cálculo o WhatsApp resuelve, lo mejoramos. No construimos sistemas gigantes que nadie en tu equipo va a usar.' },
  { n: '03', icon: Icon.Cash, title: 'Cobramos por resolver', body: 'No por complicarte. Si no movemos una métrica real de tu negocio, no hicimos nuestro trabajo. Así de claro.' },
  { n: '04', icon: Icon.Chat, title: 'Tu equipo en el centro', body: 'La mejor IA es la que tu gente usa todos los días. Capacitamos con tus casos reales, no con teoría de manual.' },
]

export const contrastRows = [
  { no: 'Una agencia que te vende humo con la palabra "IA".', si: 'Un socio operativo que se mete a resolver contigo.' },
  { no: 'Un sistema enorme que nadie en tu equipo va a usar.', si: 'Herramientas simples conectadas a tu día a día.' },
  { no: 'Tecnicismos, reuniones eternas y proyectos sin fin.', si: 'Una mejora concreta y visible en semanas.' },
]
