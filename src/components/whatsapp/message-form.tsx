"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { WhatsAppMessage, WhatsAppUser } from "@/types/whatsapp";

interface WhatsAppMessageFormProps {
  message?: WhatsAppMessage;
  users: WhatsAppUser[];
  isDark?: boolean;
  onSave: (message: Omit<WhatsAppMessage, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export function WhatsAppMessageForm({
  message,
  users,
  isDark,
  onSave,
  onCancel,
}: WhatsAppMessageFormProps) {
  const [selectedUserId, setSelectedUserId] = useState(
    message?.user.id || users[0]?.id || ""
  );
  const [content, setContent] = useState(message?.content || "");
  const [timestamp, setTimestamp] = useState(
    message?.timestamp
      ? new Date(
          message.timestamp.getTime() -
            message.timestamp.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [status, setStatus] = useState<"sent" | "delivered" | "read">(
    message?.status || "read"
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !content.trim()) return;

    onSave({
      id: message?.id,
      user: selectedUser,
      content: content.trim(),
      timestamp: new Date(timestamp),
      status: status,
    });
  };

  return (
    <div className={cn(
      "rounded-lg border p-4",
      isDark ? "bg-[#202c33] border-[#2a3942]" : "bg-gray-50 border-gray-200"
    )}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={cn("text-sm font-semibold", isDark ? "text-[#e9edef]" : "text-gray-700")}>
          {message ? "Editar mensaje" : "Nuevo mensaje"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className={cn("rounded p-1", isDark ? "text-[#8696a0] hover:bg-[#374045] hover:text-[#e9edef]" : "text-gray-400 hover:bg-gray-200 hover:text-gray-600")}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={cn("mb-1.5 block text-xs font-medium uppercase tracking-wide", isDark ? "text-[#8696a0]" : "text-gray-500")}>
            Remitente
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm focus:border-green-500 focus:outline-none",
              isDark ? "bg-[#2a3942] border-[#2a3942] text-[#e9edef]" : "bg-white border-gray-300 text-gray-900"
            )}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.isMe ? "Yo" : "Contacto"})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={cn("mb-1.5 block text-xs font-medium uppercase tracking-wide", isDark ? "text-[#8696a0]" : "text-gray-500")}>
            Mensaje
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe el mensaje..."
            rows={3}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm focus:border-green-500 focus:outline-none resize-none",
              isDark ? "bg-[#2a3942] border-[#2a3942] text-[#e9edef] placeholder-[#8696a0]" : "bg-white border-gray-300 text-gray-900"
            )}
            required
          />
        </div>

        <div>
          <label className={cn("mb-1.5 block text-xs font-medium uppercase tracking-wide", isDark ? "text-[#8696a0]" : "text-gray-500")}>
            Fecha y hora
          </label>
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm focus:border-green-500 focus:outline-none",
              isDark ? "bg-[#2a3942] border-[#2a3942] text-[#e9edef] [color-scheme:dark]" : "bg-white border-gray-300 text-gray-900"
            )}
          />
        </div>

        {selectedUser?.isMe && (
          <div>
            <label className={cn("mb-1.5 block text-xs font-medium uppercase tracking-wide", isDark ? "text-[#8696a0]" : "text-gray-500")}>
              Estado (Checkmarks)
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className={cn(
                "w-full rounded-md border px-3 py-2 text-sm focus:border-green-500 focus:outline-none",
                isDark ? "bg-[#2a3942] border-[#2a3942] text-[#e9edef]" : "bg-white border-gray-300 text-gray-900"
              )}
            >
              <option value="sent">Enviado (1 check gris)</option>
              <option value="delivered">Entregado (2 checks grises)</option>
              <option value="read">Leído (2 checks azules)</option>
            </select>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "flex-1 rounded-md border py-2 text-sm font-medium",
              isDark ? "border-[#2a3942] text-[#8696a0] hover:bg-[#374045] hover:text-[#e9edef]" : "border-gray-300 text-gray-600 hover:bg-gray-100"
            )}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 rounded-md bg-[#00a884] py-2 text-sm font-medium text-white hover:bg-[#008f6f]"
          >
            {message ? "Guardar" : "Agregar"}
          </button>
        </div>
      </form>
    </div>
  );
}
