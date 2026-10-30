from pypdf import PdfReader
import io


def load_pdf(content:bytes):
    reader =PdfReader(io.BytesIO(content))

    text =""

    for page in reader.pages:
        text+=page.extract_text() or ""

    return text


def load_txt(content: bytes):
    return content.decode("utf-8-sig")