/* Integração opcional: carregue este arquivo antes de </body>. */
(() => {
  'use strict';
  const iniciar = () => {
    document.querySelectorAll('[data-agendar-consulta]').forEach(link => {
      link.href = './agendar.html';
    });
    if (document.getElementById('agendar-consulta-online')) return;
    const link = document.createElement('a');
    link.id = 'agendar-consulta-online';
    link.href = './agendar.html';
    link.textContent = 'Agendar consulta on-line';
    Object.assign(link.style, {position:'fixed',bottom:'88px',right:'18px',zIndex:'999',background:'#176278',color:'#fff',padding:'13px 18px',borderRadius:'10px',font:'600 15px system-ui,sans-serif',textDecoration:'none',boxShadow:'0 4px 18px #0002',maxWidth:'calc(100vw - 36px)'});
    document.body.appendChild(link);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, {once:true});
  else iniciar();
})();

