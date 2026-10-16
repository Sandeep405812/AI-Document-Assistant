function ChatWindow(){
    return(
        <section className="flex flex-1 flex-col bg-slate-50 p-6">
            <header className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-800">
                    AI Document Assistant
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Ask question from your upload Documents
                </p>
            </header>
        

        <div className="flex-1 space-y-5 py-6">
            <div className="ml-auto max-w-md rounded-2xl bg-blue-600 p-4 text-white">
                What is React?
            </div>
              <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm">
          React is a JavaScript library used to build user interfaces
          with reusable components.
             </div>
        </div>

        <div className="flex gap-3 border-t border-slate-200 pt-4">
            <input
            type="text"
            placeholder="Aska question about your document...."
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            />

            <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
                Send
            </button>
        </div>
     </section>
    )


}



export default ChatWindow