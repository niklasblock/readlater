import httpx
from bs4 import BeautifulSoup

async def fetch_title(url: str) -> str | None:
    """Fetch the title of a webpage from its URL.
    
    Returns:
        str: page title or None if not found
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        title = soup.find("title")
        return title.text.strip() if title else None