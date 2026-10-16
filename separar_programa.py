#!/usr/bin/env python3
"""Executar na raiz do repositório cuidadospaliativos (ao lado de index.html)."""
from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parent
index = root / 'index.html'
if not index.exists() or not (root / 'styles.css').exists():
    sys.exit('Coloque este script ao lado de index.html e styles.css.')
html = index.read_text(encoding='utf-8')
start = html.find('<section class="section section-deep" id="programa">')
if start == -1:
    sys.exit('Seção #programa não encontrada. Nenhuma alteração realizada.')
match = re.search(r'\s*<section class="section" id="sobre">', html[start:])
if not match:
    sys.exit('Fim da seção não encontrado. Nenhuma alteração realizada.')
end = start + match.start()
section = html[start:end].strip()
old_nav = '<a href="#programa">Acompanhamento</a>'
if old_nav not in html:
    sys.exit('Link do menu não encontrado. Nenhuma alteração realizada.')
updated = (html[:start] + html[end:]).replace(old_nav, '<a href="programa.html">Programa de Acompanhamento</a>', 1)
footer_match = re.search(r'(<footer class="footer">.*?</footer>)', html, re.S)
if not footer_match:
    sys.exit('Rodapé não encontrado. Nenhuma alteração realizada.')
footer = footer_match.group(1)
page = '''<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#073F4A">
  <meta name="description" content="Programa de Acompanhamento Paliativo no Guarujá. Conheça os níveis de cuidado continuado.">
  <title>Programa de Acompanhamento Paliativo | Bruno Belo Lima</title>
  <link rel="canonical" href="https://brunobelolima.github.io/cuidadospaliativos/programa.html">
  <link rel="stylesheet" href="styles.css">
  <style>
    .program-intro { padding: 3.5rem 0 1.5rem; }
    .program-intro p { max-width: 760px; }
    .program-actions { padding: 2.5rem 0 4rem; }
    .program-actions .container { display:flex; flex-wrap:wrap; gap:1.25rem; align-items:center; }
    .program-nav { display:flex; flex-wrap:wrap; align-items:center; gap:1rem; }
    .program-nav a[aria-current="page"] { font-weight:700; text-decoration:underline; }
    @media(max-width:700px) { .program-intro {padding-top:2rem;} }
  </style>
</head>
<body id="topo">
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header"><div class="container nav-wrap">
    <a class="brand" href="./" aria-label="Página inicial">
      <img src="assets/logo.png" alt="" class="brand-mark">
      <span class="brand-copy"><strong>Bruno Belo Lima</strong><small>Clínica Médica e Cuidados Paliativos</small></span>
    </a>
    <nav class="program-nav" aria-label="Menu">
      <a href="./">Início</a>
      <a href="./#servicos">Atendimentos</a>
      <a href="programa.html" aria-current="page">Programa de Acompanhamento</a>
      <a class="btn btn-small" href="https://wa.me/5513996101806?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Programa%20de%20Acompanhamento%20Paliativo." target="_blank" rel="noopener">Solicitar informações</a>
    </nav>
  </div></header>
  <main id="conteudo">
    <section class="program-intro"><div class="container">
      <p class="eyebrow">Cuidado continuado</p>
      <h1>Programa de Acompanhamento Paliativo</h1>
      <p>Conheça as modalidades de acompanhamento médico e de enfermagem, com intensidade ajustada às necessidades clínicas.</p>
    </div></section>
    __PROGRAM_SECTION__
    <section class="program-actions"><div class="container">
      <a class="btn" href="https://wa.me/5513996101806?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Programa%20de%20Acompanhamento%20Paliativo." target="_blank" rel="noopener">Conversar pelo WhatsApp</a>
      <a href="./">← Voltar à página inicial</a>
    </div></section>
  </main>
  __FOOTER__
</body>
</html>
'''.replace('__PROGRAM_SECTION__', section).replace('__FOOTER__', footer)
backup = root / 'index.antes-programa.html'
if backup.exists() or (root / 'programa.html').exists():
    sys.exit('Backup ou programa.html já existe. Revise antes de executar novamente.')
backup.write_text(html, encoding='utf-8')
(root / 'programa.html').write_text(page, encoding='utf-8')
index.write_text(updated, encoding='utf-8')
print('Pronto: index.html atualizado e programa.html criado.')
print('Não envie index.antes-programa.html ao GitHub; é apenas backup local.')
