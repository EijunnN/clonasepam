"use client";

import { useState } from "react";
import type { DiscordChatSettings } from "@/types/discord";

interface SettingsFormProps {
  settings: DiscordChatSettings;
  onUpdate: (settings: Partial<DiscordChatSettings>) => void;
}

export function SettingsForm({ settings, onUpdate }: SettingsFormProps) {
  return (
    <div className="rounded-lg bg-[#1e1f22] p-4">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Configuración del Chat
      </h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
            Nombre del canal
          </label>
          <input
            type="text"
            value={settings.channelName}
            onChange={(e) => onUpdate({ channelName: e.target.value })}
            className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white focus:border-[#5865f2] focus:outline-none"
            placeholder="general"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showInput}
              onChange={(e) => onUpdate({ showInput: e.target.checked })}
              className="h-4 w-4 rounded border-gray-600 bg-[#1e1f22] text-[#5865f2] focus:ring-[#5865f2]"
            />
            <span className="text-sm text-white">Mostrar barra de entrada</span>
          </label>
        </div>

        {settings.showInput && (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
                Texto de entrada (Placeholder)
              </label>
              <input
                type="text"
                value={settings.inputPlaceholder}
                onChange={(e) => onUpdate({ inputPlaceholder: e.target.value })}
                className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white focus:border-[#5865f2] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#b5bac1]">
                Texto actual (Value)
              </label>
              <input
                type="text"
                value={settings.inputValue}
                onChange={(e) => onUpdate({ inputValue: e.target.value })}
                className="w-full rounded-md bg-[#1e1f22] border border-[#3f4147] px-3 py-2 text-sm text-white focus:border-[#5865f2] focus:outline-none"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
