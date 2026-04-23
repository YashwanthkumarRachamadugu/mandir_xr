import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Trash2, RotateCcw, Plus, Send, History as HistoryIcon, ArchiveRestore, Eraser, RefreshCw } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"chat" | "deleted">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Namaste 🙏 I am MandirAI, your Digital Historian. How can I assist your journey today?",
    },
  ]);

  const [history, setHistory] = useState<Message[][]>(() => {
    const saved = localStorage.getItem("mandir_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [deletedChats, setDeletedChats] = useState<Message[][]>(() => {
    const saved = localStorage.getItem("mandir_deleted_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("mandir_history", JSON.stringify(history));
    localStorage.setItem("mandir_deleted_history", JSON.stringify(deletedChats));
  }, [history, deletedChats]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Ensure this matches your backend port (e.g., 5000 or 8080)
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Server offline. Check your connection." }]);
    }
    setLoading(false);
  };

  const startNewChat = () => {
    // Save to history ONLY if the user actually sent a message
    const hasUserMessages = messages.some(m => m.sender === "user");

    if (hasUserMessages) {
      const isDuplicate = history.length > 0 && JSON.stringify(history[0]) === JSON.stringify(messages);
      
      if (!isDuplicate) {
        const updatedHistory = [messages, ...history];
        setHistory(updatedHistory);
      }
    }
    resetToDefault();
  };

  const resetToDefault = () => {
    setMessages([{ sender: "bot", text: "Namaste 🙏 A new journey begins. How can I help?" }]);
    setView("chat");
  };

  const handleClose = () => {
    setIsOpen(false);
    setView("chat");
  };

  const refreshChat = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const moveToTrash = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const chatToMove = history[index];
    
    // If deleting the currently viewed chat, clear the screen
    if (JSON.stringify(messages) === JSON.stringify(chatToMove)) {
        resetToDefault();
    }

    setDeletedChats([chatToMove, ...deletedChats]);
    setHistory(history.filter((_, i) => i !== index));
  };

  const restoreChat = (index: number) => {
    const chatToRestore = deletedChats[index];
    setHistory([chatToRestore, ...history]);
    setDeletedChats(deletedChats.filter((_, i) => i !== index));
  };

  const permanentlyDelete = (index: number) => {
    setDeletedChats(deletedChats.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white p-4 rounded-2xl shadow-xl z-50 hover:shadow-purple-500/20 active:scale-95 transition-all"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[560px] h-[520px] bg-zinc-950/95 backdrop-blur-2xl text-white rounded-3xl shadow-2xl z-50 flex border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          
          {/* Sidebar Navigation */}
          <div className="w-48 bg-black/40 border-r border-white/5 p-4 flex flex-col">
            <button
              onClick={startNewChat}
              className="flex items-center justify-center gap-2 w-full py-2.5 mb-5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20"
            >
              <Plus size={14} /> New Chat
            </button>

            <nav className="space-y-1 mb-4">
              <div className="flex items-center justify-between px-2 mb-2">
                 <button 
                  onClick={() => setView("chat")}
                  className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${view === 'chat' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <HistoryIcon size={14} /> History
                </button>
                <button 
                  onClick={refreshChat}
                  className="text-zinc-500 hover:text-purple-400 transition-all active:rotate-180 duration-500"
                >
                  <RefreshCw size={12} />
                </button>
              </div>

              <button 
                onClick={() => setView("deleted")}
                className={`flex items-center gap-2 w-full p-2.5 rounded-xl text-[11px] font-medium transition-colors ${view === 'deleted' ? 'bg-red-500/10 text-red-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Trash2 size={14} /> Recycle Bin
              </button>
            </nav>

            {/* List Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
              {view === "chat" ? (
                history.map((chat, index) => (
                  <div 
                    key={index} 
                    onClick={() => { setMessages(chat); setView("chat"); }} 
                    className="group relative bg-zinc-900/50 p-3 rounded-xl border border-white/5 cursor-pointer hover:bg-zinc-800 hover:border-purple-500/30 transition-all"
                  >
                    <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {chat.find(m => m.sender === 'user')?.text || "Untitled Discussion"}
                    </p>
                    <button 
                        onClick={(e) => moveToTrash(e, index)} 
                        className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 p-1.5 bg-zinc-800 text-zinc-500 hover:text-red-500 rounded-full shadow-xl"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))
              ) : (
                deletedChats.map((chat, index) => (
                  <div key={index} className="group bg-zinc-900/30 p-3 rounded-xl border border-red-500/10 relative">
                    <p className="text-[10px] text-zinc-500 line-clamp-1 italic">
                        {chat.find(m => m.sender === 'user')?.text || "Deleted item"}
                    </p>
                    <div className="flex gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => restoreChat(index)} className="text-emerald-500 hover:text-emerald-400"><ArchiveRestore size={14} /></button>
                      <button onClick={() => permanentlyDelete(index)} className="text-red-500 hover:text-red-400"><Eraser size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main Chat Window */}
          <div className="flex-1 flex flex-col p-6">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                {view === "chat" ? "MandirAI" : "Trash"}
              </h2>
              <button onClick={handleClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </header>

            {view === "chat" ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-5 mb-4 pr-2 custom-scrollbar">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-zinc-900 text-zinc-200 rounded-tl-none border border-white/5"}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-1 p-2">
                        <span className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce" />
                        <span className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="relative">
                  <input
                    type="text"
                    className="w-full py-4 pl-6 pr-16 bg-zinc-900 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-600"
                    placeholder="Seek knowledge..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button onClick={handleSend} className="absolute right-2.5 top-2 p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg transition-all">
                    <Send size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Trash2 size={56} className="text-zinc-800 mb-4" />
                <h3 className="text-sm font-bold text-zinc-400 mb-1">Items in Trash</h3>
                <p className="text-xs text-zinc-600 max-w-[200px]">Restore them to the history sidebar to view the full conversation again.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}