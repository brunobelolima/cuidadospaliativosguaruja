from pathlib import Path
import sys
p=Path(__file__).resolve().parent/'index.html'
if not p.exists():
    sys.exit('Coloque este script na mesma pasta do index.html do site.')
s=p.read_text(encoding='utf-8')
marker='<!-- ENDERECO-AGENDAMENTO-INICIO -->'
if marker in s:
    sys.exit('Endereço já inserido. Nenhuma alteração realizada.')
block='''<!-- ENDERECO-AGENDAMENTO-INICIO -->
<div class="endereco-agendamento" aria-label="Local da consulta presencial">
  <h3>Local da consulta presencial</h3>
  <p><strong>Consultório — Bruno Belo Lima</strong></p>
  <address>Rua Arthur Costa Filho, 159<br>Guarujá — SP</address>
  <p>Atendimento presencial mediante agendamento.</p>
  <a href="https://www.google.com/maps/search/?api=1&amp;query=Rua%20Arthur%20Costa%20Filho%20159%20Guaruja%20SP" target="_blank" rel="noopener noreferrer">Ver endereço no Google Maps ↗</a>
</div>
<!-- ENDERECO-AGENDAMENTO-FIM -->'''
# Insere junto ao título da seção de agendamento, sem duplicar o endereço já exibido nos contatos.
needle='<h2>Comece por uma avaliação.</h2>'
if needle not in s:
    sys.exit('Seção de agendamento não encontrada; nenhum arquivo foi modificado.')
s=s.replace(needle,needle+'\n'+block,1)
p.write_text(s,encoding='utf-8')
print('index.html atualizado. Revise e publique no GitHub.')
