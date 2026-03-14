import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="main-content" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <section className="glass-panel" style={{ padding: '2rem' }}>
        <h1>Política de Privacidad</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Última actualización: 14 de marzo de 2026</p>

        <p>En <strong>MHUR Tunning</strong>, accesible desde mhur-frontend.vercel.app, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento contiene los tipos de información que recopilamos y cómo la utilizamos.</p>

        <h2 style={{ marginTop: '2rem' }}>1. Archivos de Registro</h2>
        <p>MHUR Tunning sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. La información recopilada incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), fecha y hora, páginas de referencia/salida y, posiblemente, el número de clics.</p>

        <h2 style={{ marginTop: '2rem' }}>2. Cookies y Web Beacons</h2>
        <p>Al igual que cualquier otro sitio web, MHUR Tunning utiliza "cookies". Estas cookies se utilizan para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web a las que el visitante ha accedido o visitado.</p>

        <h2 style={{ marginTop: '2rem' }}>3. Google DoubleClick DART Cookie</h2>
        <p>Google es uno de los proveedores externos de nuestro sitio. También utiliza cookies, conocidas como cookies de DART, para servir anuncios a los visitantes de nuestro sitio basados en su visita a otros sitios en Internet.</p>

        <h2 style={{ marginTop: '2rem' }}>4. Nuestras Políticas de Publicidad</h2>
        <p>Los servidores de anuncios de terceros o redes publicitarias utilizan tecnologías como cookies, JavaScript o Web Beacons que se utilizan en sus respectivos anuncios y enlaces que aparecen en MHUR Tunning. Reciben automáticamente su dirección IP cuando esto ocurre.</p>

        <h2 style={{ marginTop: '2rem' }}>5. Consentimiento</h2>
        <p>Al utilizar nuestro sitio web, usted acepta nuestra Política de Privacidad y está de acuerdo con sus términos.</p>
      </section>
    </main>
  );
}
