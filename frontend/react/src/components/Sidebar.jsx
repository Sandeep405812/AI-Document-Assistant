
function Sidebar({onMenuClick,activeMenu}) {
    const menuItems = [
        "Chat",
        "Upload Documents",
        "My Documents",
        "Chat History",
        "Setting"
    ];

    return (
        <aside className="flex min-h-screen w-64 flex-col bg-indigo-950 p-5 text-white">
            <h1 className="mb-8 text-xl font-bold">
                AI WorkSpace
            </h1>

            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <button
    key={item}
    onClick={() => onMenuClick(item)}
    className={`w-full rounded-lg px-4 py-3 text-left ${
        activeMenu === item
            ? "bg-slate-800"
            : "hover:bg-slate-800"
    }`}
>
    {item}
</button>
                ))}
            </nav>

             <div className="mt-auto border-t border-slate-700 pt-4 text-sm text-slate-400">
        AI-powered PDF Chat
      </div>


        </aside>
    );
}

export default Sidebar;
