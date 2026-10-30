from rag.retriver import retrieve_chunks

def get_documment_context(question:str):
    results =retrieve_chunks(question)


    context ="\n\n".join(
        doc.page_content for doc in results
    )


    return context



def answer_from_document(question: str, llm):
    context = get_documment_context(question)

    prompt = f"""
    Answer the question using the context below.

    Context:
    {context}

    Question:
    {question}

    If the answer is not in the context, say:
    "I could not find this information in the uploaded document."
    """

    response = llm.invoke(prompt)

    return response.content