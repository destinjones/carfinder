"""Serve the repository root on a local port for the browser checks (so self-hosted fonts and relative links load
exactly as on the website)."""
import http.server, pathlib, socketserver, threading

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = pathlib.Path(__file__).resolve().parent / '_out'
OUT.mkdir(exist_ok=True)


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass


def serve(port=8790):
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(('127.0.0.1', port), lambda *a, **k: Quiet(*a, directory=str(ROOT), **k))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, f'http://127.0.0.1:{port}/carfinder.html'
