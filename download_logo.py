import urllib.request
import certifi
import ssl

urls = [
    'https://ayosehat.kemkes.go.id/image/logo-kemenkes.png',
    'https://satusehat.kemkes.go.id/assets/img/logo-kemenkes.png',
    'https://satusehat.kemkes.go.id/img/logo-kemenkes.png',
    'https://www.kemkes.go.id/assets/images/logo_kemenkes.png',
    'https://sehatnegeriku.kemkes.go.id/wp-content/uploads/2016/11/Logo-Kemenkes.png',
    'https://upk.kemkes.go.id/new/images/logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Logo_Kementerian_Kesehatan_Republik_Indonesia_2016.svg/512px-Logo_Kementerian_Kesehatan_Republik_Indonesia_2016.svg.png'
]

ctx = ssl.create_default_context(cafile=certifi.where())
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

for url in urls:
    print(f"Trying {url}...")
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req, context=ctx, timeout=5) as response:
            ctype = response.headers.get('Content-Type', '')
            if 'image' in ctype:
                with open('src/assets/logo-kemenkes.png', 'wb') as f:
                    f.write(response.read())
                print(f"SUCCESS: Downloaded from {url}")
                break
            else:
                print(f"Failed: Not an image ({ctype})")
    except Exception as e:
        print(f"Failed: {e}")
