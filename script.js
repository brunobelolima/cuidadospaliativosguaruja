
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


/* FIRST_ASSESSMENT_FLOW_START */
(() => {
  const root = document.getElementById('first-care-step');
  if (!root || root.dataset.ready === '1') return;
  root.dataset.ready = '1';

  const answers = {};
  let current = 1;

  const progress = root.querySelector('#fs-progress');
  const progressText = root.querySelector('#fs-progress-text');
  const back = root.querySelector('#fs-back');
  const backWrap = root.querySelector('#fs-back-wrap');
  const result = root.querySelector('#fs-result');
  const urgent = root.querySelector('#fs-urgent');

  function hidePanels() {
    root.querySelectorAll('.decision-step, #fs-result, #fs-urgent').forEach(el => {
      el.hidden = true;
    });
  }

  function updateProgress(step, label) {
    const value = Math.max(1, Math.min(5, step));
    progress.style.width = `${value * 20}%`;
    progressText.textContent = label || `${value} de 5`;
  }

  function showStep(step) {
    hidePanels();
    current = step;
    const panel = root.querySelector(`#fs-q${step}`);
    if (panel) panel.hidden = false;
    updateProgress(step);
    backWrap.hidden = step === 1;
  }

  function restart() {
    Object.keys(answers).forEach(key => delete answers[key]);
    result.hidden = true;
    urgent.hidden = true;
    showStep(1);
  }

  function finish() {
    hidePanels();
    backWrap.hidden = true;
    updateProgress(5, 'Concluído');

    const mobility = answers[2];
    const homeNeed = answers[3];
    const teleReason = answers[4];
    const teleReady = answers[5];

    let mode = 'office';
    const why = [];

    if (mobility === 'hard' || mobility === 'unsafe' || homeNeed === 'yes') {
      mode = 'home';
      if (mobility === 'hard' || mobility === 'unsafe') {
        why.push('o deslocamento até o consultório pode gerar esforço, sofrimento ou risco desproporcional');
      }
      if (homeNeed === 'yes') {
        why.push('conhecer diretamente o ambiente da casa pode melhorar a avaliação e o plano de cuidados');
      }
    } else if (
      (teleReason === 'distance' || teleReason === 'discussion') &&
      teleReady === 'yes' &&
      homeNeed !== 'yes'
    ) {
      mode = 'tele';
      why.push('há uma razão relevante para iniciar remotamente');
      why.push('existem boas condições para realizar a avaliação por telemedicina');
    } else if (teleReason !== 'no' && teleReady !== 'yes') {
      mode = 'team';
      why.push('há interesse ou necessidade de atendimento remoto, mas as condições atuais podem tornar a primeira avaliação por telemedicina insuficiente');
    } else {
      mode = 'office';
      why.push('o deslocamento até o consultório parece viável');
      why.push('na primeira avaliação, o contato presencial e o exame físico podem fornecer informações adicionais importantes');
    }

    if (mobility === 'help' && mode === 'office') {
      why.push('o consultório parece adequado desde que transporte e transferência ocorram com apoio seguro');
    }

    if (homeNeed === 'unsure' && mode === 'office') {
      why.push('se a equipe identificar necessidade de conhecer o ambiente, poderá recomendar avaliação domiciliar');
    }

    const info = {
      office: {
        title: 'Avaliação em consultório',
        text: 'O consultório tende a ser a melhor porta de entrada para esta primeira avaliação.',
        price: 'R$ 600 — avaliação presencial + 1 reavaliação em até 30 dias.'
      },
      home: {
        title: 'Avaliação domiciliar',
        text: 'O domicílio tende a oferecer melhor relação entre segurança, conforto e qualidade da primeira avaliação.',
        price: 'R$ 700 — visita médica domiciliar + 1 reavaliação por telemedicina em até 30 dias.'
      },
      tele: {
        title: 'Teleconsulta inicial',
        text: 'A teleconsulta pode ser uma alternativa adequada para começar, desde que a equipe confirme que a modalidade remota é suficiente para o caso.',
        price: 'R$ 500 — teleconsulta + 1 reavaliação por telemedicina em até 30 dias.'
      },
      team: {
        title: 'Fale com a equipe antes de agendar',
        text: 'Vale definir a modalidade com a equipe, porque a avaliação remota pode ser insuficiente e ainda é necessário escolher o melhor formato presencial.',
        price: 'A equipe pode orientar a escolha entre consultório, domicílio e teleconsulta antes do agendamento.'
      }
    }[mode];

    root.querySelector('#fs-title').textContent = info.title;
    root.querySelector('#fs-text').textContent = info.text;
    root.querySelector('#fs-why').innerHTML = `<strong>Por quê?</strong> ${why.join('; ')}.`;
    root.querySelector('#fs-price').textContent = info.price;
    const bookingLink = result.querySelector('.decision-result-actions a');
    if (bookingLink) {
      const messages = {
        home: 'Olá! Gostaria de agendar um atendimento domiciliar.',
        tele: 'Olá! Gostaria de informações sobre teleconsultoria ou teleconsulta.',
        team: 'Olá! Gostaria de orientação para escolher a modalidade de atendimento.'
      };
      bookingLink.href = mode === 'office' ? './agendar.html' : 'https://wa.me/5513996101806?text=' + encodeURIComponent(messages[mode]);
      bookingLink.textContent = mode === 'office' ? 'Agendar consulta presencial' : 'Falar pelo WhatsApp';
      if (mode === 'office') {
        bookingLink.removeAttribute('target');
        bookingLink.removeAttribute('rel');
      } else {
        bookingLink.target = '_blank';
        bookingLink.rel = 'noopener noreferrer';
      }
    }
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  root.querySelectorAll('[data-q]').forEach(button => {
    button.addEventListener('click', () => {
      const q = Number(button.dataset.q);
      const value = button.dataset.v;
      answers[q] = value;

      if (q === 1 && value === 'yes') {
        hidePanels();
        backWrap.hidden = true;
        updateProgress(1, 'Segurança');
        urgent.hidden = false;
        return;
      }

      if (q < 5) {
        showStep(q + 1);
      } else {
        finish();
      }
    });
  });

  back.addEventListener('click', () => {
    if (current > 1) {
      delete answers[current];
      showStep(current - 1);
    }
  });

  root.querySelectorAll('[data-restart]').forEach(button => {
    button.addEventListener('click', restart);
  });

  showStep(1);
})();
/* FIRST_ASSESSMENT_FLOW_END */


