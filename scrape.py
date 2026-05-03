import urllib.request, re

req = urllib.request.Request('https://www.instagram.com/rocpal_/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        m = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if m:
            print('Found Image:', m.group(1))
        else:
            print('Not found')
except Exception as e:
    print('Failed:', e)
