# Agendamento de consultas — GitHub Pages

Integração com a página de agendamento criada no Google Agenda da conta brunobelolimacp@gmail.com.

## Publicar no site existente

1. Extraia este ZIP no computador.
2. Envie `agendar.html` e `agendamento.js` para a raiz do repositório `brunobelolima/cuidadospaliativos`, junto ao `index.html` atual. Envie os arquivos extraídos, não o ZIP.
3. No `index.html`, adicione ao menu: `<a href="./agendar.html">Agendar consulta on-line</a>`.
4. Opcionalmente, adicione `<script src="./agendamento.js" defer></script>` imediatamente antes de `</body>` para mostrar um botão flutuante. O script também atualiza links marcados com `data-agendar-consulta`.
5. Faça commit e aguarde a implantação do GitHub Pages. A página ficará em `https://brunobelolima.github.io/cuidadospaliativos/agendar.html`.

O pacote não substitui o index.html nem altera os demais serviços. Não precisa de Python, npm, servidor ou credenciais. Se a incorporação for bloqueada pelo navegador ou pelo Google, o botão abre a mesma página diretamente.

## Configuração existente no Google Agenda

- Título: Consulta Médica — Bruno Belo Lima.
- Sextas-feiras, das 08h às 12h; consultas de uma hora.
- Fuso: America/Sao_Paulo.
- Nome, sobrenome, e-mail e telefone obrigatórios.
- Convite e confirmação por e-mail.
- Verificação de conflitos na agenda principal Bruno Lima. As agendas iClinic não estão incluídas nesta verificação.
- Janela configurada: até 60 dias à frente e antecedência mínima de 4 horas.

Horários ocupados na agenda principal são retirados da disponibilidade. Reservas e dados são administrados pelo Google, não pelo GitHub. A interface não cria eventos nem grava dados de pacientes no repositório. O site existente ainda precisa receber estes arquivos; este pacote não foi publicado automaticamente.

## Conferir depois da publicação

Abra a página pelo celular e computador, teste o botão e confira a disponibilidade na sexta-feira. Não faça uma reserva fictícia em nome de paciente. Confirme que o Google apresenta o formulário com os campos obrigatórios antes de divulgar o link.
