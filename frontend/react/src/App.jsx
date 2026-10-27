
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import UploadDocuments from "./components/UploadDocuments";

function App() {
    const [activeMenu, setActiveMenu] = useState("Chat");

    function handleMenuClick(menu) {
        setActiveMenu(menu);
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar
                onMenuClick={handleMenuClick}
                activeMenu={activeMenu}
            />

            <main className="flex-1 p-8">

                {activeMenu === "Chat" && (
                    <>
                        <h2 className="mb-4 text-2xl font-bold text-slate-800">
                            Welcome to AI Document Assistant
                        </h2>

                        <ChatWindow />
                    </>
                )}

                {activeMenu === "Upload Documents" && (
                    <UploadDocuments />
                )}

                {activeMenu === "My Documents" && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            My Documents
                        </h2>

                        <p className="mt-2 text-slate-600">
                            Your uploaded documents will appear here.
                        </p>
                    </div>
                )}

                {activeMenu === "Chat History" && (
                    <h2 className="text-2xl font-bold text-slate-800">
                        Chat History
                    </h2>
                )}

                {activeMenu === "Setting" && (
                    <h2 className="text-2xl font-bold text-slate-800">
                        Settings
                    </h2>
                )}

            </main>
        </div>
    );
}

export default App;
