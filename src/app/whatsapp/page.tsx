"use client";

import {
  ArrowLeft,
  Download,
  Monitor,
  Pencil,
  Plus,
  Smartphone,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { WhatsAppChat } from "@/components/whatsapp";
import { WhatsAppMessageForm } from "@/components/whatsapp/message-form";
import { useWhatsAppChat } from "@/hooks/use-whatsapp-chat";
import { cn } from "@/lib/utils";
import type { WhatsAppMessage } from "@/types/whatsapp";

export default function WhatsAppPage() {
  const {
    users,
    messages,
    settings,
    updateSettings,
    addMessage,
    updateMessage,
    deleteMessage,
  } = useWhatsAppChat();

  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const [editingMessage, setEditingMessage] = useState<WhatsAppMessage | null>(null);
  const [showForm, setShowForm] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const isDark = settings.darkMode;

  const handleSaveMessage = (
    messageData: Omit<WhatsAppMessage, "id"> & { id?: string }
  ) => {
    if (messageData.id) {
      updateMessage({
        ...messageData,
        id: messageData.id,
      } as WhatsAppMessage);
    } else {
      addMessage({
        ...messageData,
        id: crypto.randomUUID(),
      } as WhatsAppMessage);
    }
    setShowForm(false);
    setEditingMessage(null);
  };

  const handleEditMessage = (id: string) => {
    const message = messages.find((m) => m.id === id);
    if (message) {
      setEditingMessage(message);
      setShowForm(true);
    }
  };

  const handleExport = useCallback(async () => {
    if (!chatRef.current) return;

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(chatRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `whatsapp-chat-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting:", error);
    }
  }, []);

  return (
    <div className={cn("flex min-h-screen flex-col transition-colors", isDark ? "bg-[#111b21]" : "bg-gray-100")}>
      {/* Header */}
      <header className={cn(
        "flex items-center justify-between border-b px-6 py-3 transition-colors",
        isDark ? "border-[#2a3942] bg-[#202c33]" : "border-gray-200 bg-white"
      )}>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={cn("flex items-center gap-2 transition-colors", isDark ? "text-[#8696a0] hover:text-[#e9edef]" : "text-gray-500 hover:text-gray-900")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">📱</span>
            <h1 className={cn("text-lg font-semibold", isDark ? "text-[#e9edef]" : "text-gray-900")}>WhatsApp</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn("flex items-center rounded-lg p-1", isDark ? "bg-[#2a3942]" : "bg-gray-100")}>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "mobile"
                  ? "bg-[#00a884] text-white"
                  : isDark ? "text-[#8696a0] hover:text-[#e9edef]" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                viewMode === "desktop"
                  ? "bg-[#00a884] text-white"
                  : isDark ? "text-[#8696a0] hover:text-[#e9edef]" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Monitor className="h-4 w-4" />
              Desktop
            </button>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            <Download className="h-4 w-4" />
            Exportar PNG
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Editor */}
        <div className={cn("flex w-[400px] flex-col border-r transition-colors", isDark ? "border-[#2a3942] bg-[#111b21]" : "border-gray-200 bg-white")}>
           <div className="flex-1 overflow-y-auto p-4 space-y-6">
             {/* Settings Section */}
             <div className="space-y-4">
               <h2 className={cn("text-sm font-semibold uppercase tracking-wide", isDark ? "text-[#00a884]" : "text-gray-500")}>Configuración</h2>
               
               <div>
                  <label className={cn("block text-xs font-medium mb-1", isDark ? "text-[#8696a0]" : "text-gray-700")}>Nombre Contacto</label>
                  <input 
                    type="text" 
                    value={settings.contactName}
                    onChange={(e) => updateSettings({ contactName: e.target.value })}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500",
                      isDark ? "bg-[#202c33] border-[#2a3942] text-[#e9edef]" : "border-gray-300"
                    )}
                  />
               </div>
               
               <div>
                  <label className={cn("block text-xs font-medium mb-1", isDark ? "text-[#8696a0]" : "text-gray-700")}>Estado</label>
                  <input 
                    type="text" 
                    value={settings.status}
                    onChange={(e) => updateSettings({ status: e.target.value })}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500",
                      isDark ? "bg-[#202c33] border-[#2a3942] text-[#e9edef]" : "border-gray-300"
                    )}
                  />
               </div>

               <div>
                  <label className={cn("block text-xs font-medium mb-1", isDark ? "text-[#8696a0]" : "text-gray-700")}>Fondo (URL)</label>
                  <input 
                    type="text" 
                    value={settings.backgroundImage}
                    onChange={(e) => updateSettings({ backgroundImage: e.target.value })}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500",
                      isDark ? "bg-[#202c33] border-[#2a3942] text-[#e9edef]" : "border-gray-300"
                    )}
                  />
                  <p className={cn("text-[10px] mt-1", isDark ? "text-[#8696a0]" : "text-gray-500")}>Usa /wsp-bg.png para el fondo por defecto</p>
               </div>
               
               <div className="flex items-center gap-2">
                 <input
                    type="checkbox"
                    id="showInput"
                    checked={settings.showInput}
                    onChange={(e) => updateSettings({ showInput: e.target.checked })}
                    className={cn("h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500", isDark ? "bg-[#202c33] border-[#2a3942]" : "")}
                 />
                 <label htmlFor="showInput" className={cn("text-sm", isDark ? "text-[#e9edef]" : "text-gray-700")}>Mostrar barra de entrada</label>
               </div>

               <div className="flex items-center gap-2">
                 <input
                    type="checkbox"
                    id="darkMode"
                    checked={settings.darkMode}
                    onChange={(e) => updateSettings({ darkMode: e.target.checked })}
                    className={cn("h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500", isDark ? "bg-[#202c33] border-[#2a3942]" : "")}
                 />
                 <label htmlFor="darkMode" className={cn("text-sm", isDark ? "text-[#e9edef]" : "text-gray-700")}>Modo oscuro</label>
               </div>
             </div>

             <div className={cn("border-t pt-4", isDark ? "border-[#2a3942]" : "border-gray-200")}>
                <h2 className={cn("text-sm font-semibold uppercase tracking-wide mb-4", isDark ? "text-[#00a884]" : "text-gray-500")}>Mensajes</h2>
                
                {showForm ? (
                  <WhatsAppMessageForm
                    message={editingMessage || undefined}
                    users={users}
                    isDark={isDark}
                    onSave={handleSaveMessage}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingMessage(null);
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00a884] py-2 text-sm font-medium text-white transition-colors hover:bg-[#008f6f]"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar mensaje
                  </button>
                )}

                <div className="mt-4 space-y-2">
                  {messages
                    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "group flex items-center justify-between gap-3 rounded-md border p-2 transition-colors",
                          isDark 
                            ? "border-[#2a3942] bg-[#202c33] hover:bg-[#2a3942]" 
                            : "border-gray-200 bg-gray-50 hover:bg-white"
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={cn("text-xs font-semibold", isDark ? "text-[#e9edef]" : "text-gray-900")}>
                              {msg.user.isMe ? "Yo" : settings.contactName}
                            </span>
                            <span className={cn("text-[10px]", isDark ? "text-[#8696a0]" : "text-gray-500")}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className={cn("truncate text-xs", isDark ? "text-[#8696a0]" : "text-gray-600")}>
                            {msg.content}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleEditMessage(msg.id)}
                            className={cn("rounded p-1", isDark ? "text-[#8696a0] hover:bg-[#374045] hover:text-[#e9edef]" : "text-gray-400 hover:bg-gray-200 hover:text-gray-600")}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteMessage(msg.id)}
                            className={cn("rounded p-1", isDark ? "text-[#8696a0] hover:bg-[#374045] hover:text-[#f15c6d]" : "text-gray-400 hover:bg-red-50 hover:text-red-500")}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
             </div>
           </div>
        </div>

        {/* Right Panel - Preview */}
        <div className={cn("flex flex-1 items-center justify-center p-8", isDark ? "bg-[#0b141a]" : "bg-gray-100")}>
          <div
            className={`flex flex-col overflow-hidden shadow-2xl ${
              viewMode === "mobile" ? "w-[375px]" : "w-full max-w-3xl"
            }`}
            style={{
              height: viewMode === "mobile" ? "700px" : "600px",
            }}
          >
            <WhatsAppChat
              ref={chatRef}
              messages={messages}
              settings={settings}
              onEditMessage={handleEditMessage}
              onDeleteMessage={deleteMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
