
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('lead-form');
const status = document.getElementById('form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const nome = data.get('nome') || '';
  const telefone = data.get('telefone') || '';
  const paraQuem = data.get('para_quem') || '';
  const modalidade = data.get('modalidade') || '';
  const mensagem = data.get('mensagem') || '';

  const texto =
`Olá! Gostaria de solicitar um contato para atendimento em Cuidados Paliativos.

Nome: ${nome}
Telefone: ${telefone}
Atendimento para: ${paraQuem}
Modalidade de interesse: ${modalidade}

Breve descrição:
${mensagem}

Se houver uma situação de urgência ou emergência, não aguardarei resposta por WhatsApp.`;

  const url = 'https://wa.me/5513996101806?text=' + encodeURIComponent(texto);
  status.textContent = 'Abrindo o WhatsApp para concluir a solicitação...';
  window.open(url, '_blank', 'noopener');
});
