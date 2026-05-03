import re

# Read QuotingApp.html
with open(r'c:\Users\andre\App\QuotingApp.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Read the new logo base64
with open(r'c:\Users\andre\App\logo.txt', 'r', encoding='utf-8') as f:
    logo_b64 = f.read()

# Replace LOGO_B64 constant
content = re.sub(r'const LOGO_B64 = "data:image[^"]+";', f'const LOGO_B64 = "{logo_b64}";', content)

# Modify image styling so the logo doesn't have rounded-full if it's rectangular
content = content.replace('className="h-10 w-10 rounded-full cursor-pointer border border-gold-500 shadow-[0_0_10px_rgba(220,164,59,0.5)]"', 'className="h-12 object-contain cursor-pointer"')
content = content.replace('className="h-20 w-20 rounded-full mx-auto mb-6 border-2 border-gold-500 shadow-glow"', 'className="h-24 object-contain mx-auto mb-8"')

# Make the theme strictly black and white
content = content.replace('stone', 'zinc')
content = content.replace('bg-[#0a0a0a]', 'bg-black')
content = content.replace('bg-zinc-950', 'bg-black')
content = content.replace('bg-zinc-900', 'bg-zinc-900')
content = content.replace('border-zinc-800', 'border-zinc-800')

# Make sure all Unsplash images are high quality and explicitly match the category
images = {
    'cabinets': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    'surfaces': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    'backsplash': 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80',
    'hardware': 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80',
    'handles': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    'appliances': 'https://images.unsplash.com/photo-1584836605051-93e1ea39dcc6?w=800&q=80',
    'finishes': 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800&q=80',
    'vanities': 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80',
    'built-ins': 'https://images.unsplash.com/photo-1595514535415-89b5c21df121?w=800&q=80',
    'wine rooms': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    'home offices': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    'custom millwork': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    'laundry rooms': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    'bar & beverage stations': 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    'christmas catalogue': 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&q=80',
    'default': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80'
}

import json
images_js = "        const imageDb = {\n"
for k, v in images.items():
    if '-' in k or ' ' in k:
        images_js += f"            '{k}': '{v}',\n"
    else:
        images_js += f"            {k}: '{v}',\n"
images_js += "        };"

content = re.sub(r'const imageDb = \{[\s\S]*?\};', images_js, content)

with open(r'c:\Users\andre\App\QuotingApp.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated QuotingApp.html successfully.')
