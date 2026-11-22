#!/usr/bin/env python3
from pathlib import Path
import re
root=Path(__file__).resolve().parent
social='''<div class="social-links" aria-label="Redes sociais de Bruno Belo Lima"><a href="https://www.linkedin.com/in/bruno-belo-lima-41617793/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.instagram.com/brunobelolimacp/" target="_blank" rel="noopener noreferrer">Instagram · @brunobelolimacp</a></div>'''
for path in root.glob('*.html'):
    original=path.read_text(encoding='utf-8')
    html=original.replace('https://brunobelolima.github.io/cuidadospaliativos/','https://cuidadospaliativosguaruja.com/').replace('https://brunobelolima.github.io/cuidadospaliativosguaruja/','https://cuidadospaliativosguaruja.com/').replace('assets/logo.png','assets/logo-infinito.png')
    if 'modernizacao.css' not in html:
        html=re.sub(r'(<link[^>]+href=["\']styles\.css["\'][^>]*>)',r'\1\n<link rel="stylesheet" href="modernizacao.css">',html,count=1,flags=re.I)
    if '<footer' in html.lower() and 'social-links' not in html:
        html=re.sub(r'</footer\s*>',social+'\n</footer>',html,count=1,flags=re.I)
    if html!=original:
        path.write_text(html,encoding='utf-8')
        print('Atualizado:',path.name)
print('Revise as páginas antes de publicar.')
