from langchain_chroma import Chroma
from rag.embedding import get_embedding_model


vector_store=Chroma(
    collection_name="documents",
    embedding_function=get_embedding_model(),
    persist_directory="./chroma_db"
)


def add_chunks(chunks):
    if not chunks:
        return 0

    vector_store.add_texts(chunks)

    return len(chunks)