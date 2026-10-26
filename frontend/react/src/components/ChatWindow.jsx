import { useState, useRef, useEffect } from "react";

function ChatWindow() {
  // 1. Input box ki value
  const [message, setMessage] = useState("");

  // 2. Chat ke saare messages
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! Upload a document and ask me a question.",
    },
  ]);

  // 3. Chat ke last element ka reference
  const messagesEndRef = useRef(null);

  // 4. Messages change hone par chat ko neeche scroll karo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // 5. User ka message handle karo
  async function handleSend(event) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    // User ka message chat list mein add karo
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        text: trimmedMessage,
      },
    ]);

    // Input box clear karo
    setMessage("");

    // Backend ko request bhejo
    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      // Backend ka response assistant message ke roop mein add karo
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat API error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text: "Backend se connect nahi ho paya. Server check karo.",
        },
      ]);
    }
  }

  // 6. UI render karo
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-slate-50 p-6">
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800">
          AI Document Assistant
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ask questions about your documents
        </p>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto py-6">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`max-w-xl whitespace-pre-wrap rounded-2xl p-4 ${
              item.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            {item.text}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form
        className="flex gap-3 border-t border-slate-200 pt-4"
        onSubmit={handleSend}
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          type="text"
          placeholder="Ask a question..."
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </section>
  );
}

export default ChatWindow;