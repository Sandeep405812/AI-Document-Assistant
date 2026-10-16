import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <ChatWindow/>

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome to AI Document Assistant
        </h2>
        <p className="mt-2 text-slate-600">
          Upload your documents and ask questions.
        </p>
      </main>
    </div>
  );
}

export default App;
