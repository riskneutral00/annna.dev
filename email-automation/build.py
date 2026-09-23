from pathlib import Path
from html import escape
import re
base=Path(__file__).resolve().parent
source=(base/'information.md').read_text()
def inline(text):
    return re.sub(r'https://[^\s]+', lambda m:'<a href="'+m[0]+'">'+m[0]+'</a>',escape(text))
parts=[]
for block in source.strip().split('\n\n'):
    if block.startswith('# '): parts.append('<h1>'+escape(block[2:])+'</h1>')
    elif block.startswith('## '):
        title=block[3:]; anchor={'Privacy':'privacy','Access and use':'terms'}.get(title,title.lower().replace(' ','-'))
        parts.append('<h2 id="'+anchor+'">'+escape(title)+'</h2>')
    else: parts.append('<p>'+inline(block)+'</p>')
html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gmail student reply automation — information and privacy</title><style>body{font:18px/1.65 system-ui,sans-serif;color:#282520;background:#faf8f5;margin:0}main{max-width:740px;margin:auto;padding:56px 24px}h1{font-size:2.25rem;line-height:1.15}h2{margin-top:2.5rem;font-size:1.3rem}a{color:#804621;overflow-wrap:anywhere}nav{display:flex;gap:24px}footer{margin-top:48px;font-size:13px;color:#68635b}</style><main><nav><a href="/">annnä</a><a href="#privacy">Privacy</a><a href="#terms">Access and use</a></nav>'''+''.join(parts)+'''<footer>Generated from information.md by build.py. Do not hand-edit this HTML.</footer></main></html>'''
(base/'index.html').write_text(html)
