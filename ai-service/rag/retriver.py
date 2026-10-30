from rag.vector_store import vector_store

def retrieve_chunks(question:str):
    results =vector_store.similarity_search(
        question,
        k=3
    )
    return results
