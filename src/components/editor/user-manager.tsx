"use client";

import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { DiscordAvatar, DiscordBadge } from "@/components/discord";
import type { BadgeType, DiscordUser } from "@/types/discord";

const BADGE_OPTIONS: BadgeType[] = [
  "AUTH",
  "CODE",
  "NITRO",
  "BOOST",
  "BOT",
  "ADMIN",
  "MOD",
];

interface UserManagerProps {
  users: DiscordUser[];
  onUpdateUser: (user: DiscordUser) => void;
  onDeleteUser: (id: string) => void;
}

export function UserManager({
  users,
  onUpdateUser,
  onDeleteUser,
}: UserManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<DiscordUser | null>(null);

  const startEdit = (user: DiscordUser) => {
    setEditingId(user.id);
    setEditForm({ ...user });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm) {
      onUpdateUser(editForm);
      cancelEdit();
    }
  };

  const toggleBadge = (badge: BadgeType) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      badges: editForm.badges?.includes(badge)
        ? editForm.badges.filter((b) => b !== badge)
        : [...(editForm.badges || []), badge],
    });
  };

  return (
    <div className="rounded-lg bg-[#1e1f22] p-3">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#b5bac1]">
        Usuarios ({users.length})
      </h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="rounded-md bg-[#2b2d31] p-2">
            {editingId === user.id && editForm ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                  className="w-full rounded bg-[#1e1f22] border border-[#3f4147] px-2 py-1.5 text-sm text-white focus:border-[#5865f2] focus:outline-none"
                  placeholder="Nombre de usuario"
                />
                <input
                  type="url"
                  value={editForm.avatar}
                  onChange={(e) =>
                    setEditForm({ ...editForm, avatar: e.target.value })
                  }
                  className="w-full rounded bg-[#1e1f22] border border-[#3f4147] px-2 py-1.5 text-sm text-white focus:border-[#5865f2] focus:outline-none"
                  placeholder="URL del avatar"
                />
                <div className="flex flex-wrap gap-1">
                  {BADGE_OPTIONS.map((badge) => (
                    <button
                      key={badge}
                      type="button"
                      onClick={() => toggleBadge(badge)}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        editForm.badges?.includes(badge)
                          ? "bg-[#5865f2] text-white"
                          : "bg-[#1e1f22] text-[#b5bac1]"
                      }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 rounded bg-[#1e1f22] py-1.5 text-sm text-[#b5bac1] hover:text-white"
                  >
                    <X className="mx-auto h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="flex-1 rounded bg-[#23a559] py-1.5 text-sm text-white hover:bg-[#1a7f42]"
                  >
                    <Check className="mx-auto h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <DiscordAvatar
                  src={user.avatar}
                  alt={user.username}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-sm font-medium text-white truncate">
                      {user.username}
                    </span>
                    {user.badges?.map((badge) => (
                      <DiscordBadge key={badge} type={badge} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => startEdit(user)}
                    className="rounded p-1.5 text-[#b5bac1] hover:bg-[#1e1f22] hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteUser(user.id)}
                    className="rounded p-1.5 text-[#b5bac1] hover:bg-[#1e1f22] hover:text-[#ed4245]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
