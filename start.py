import webview

if __name__ == "__main__":
    webview.create_window(
        title="Read Later",
        url="http://127.0.0.1:8001/static/index.html",
        width=1100,
        height=750,
        min_size=(800, 600)
    )
    webview.start()