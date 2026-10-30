from langchain_huggingface import HuggingFaceEmbeddings

def get_embedding_model():
    model=HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    return model


def create_embedding(text:str):
    model=get_embedding_model()
    vector=model.embed_query(text)

    return vector

vector = create_embedding("Python is easy to learn")
print(len(vector))
    