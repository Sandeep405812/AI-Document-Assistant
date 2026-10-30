from main import split_text

text = """
An operating system manages computer hardware and software.
Process scheduling determines which process gets CPU time.
Memory management controls how memory is allocated.
""" * 30

chunks = split_text(text)

print("Total chunks:", len(chunks))

for i, chunk in enumerate(chunks, start=1):
    print(f"\nChunk {i}:")
    print(chunk[:100])