"use client";

import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import * as Icons from "lucide-react";
import { useState } from "react";
import { DiscordAvatar, DiscordBadge } from "@/components/discord";
import type { DiscordBadge as DiscordBadgeType, DiscordUser } from "@/types/discord";

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
  
  // New badge form state
  const [showBadgeForm, setShowBadgeForm] = useState(false);
  const [newBadge, setNewBadge] = useState<Partial<DiscordBadgeType>>({
    label: "NEW",
    color: "#5865f2",
    icon: "Check",
  });

  const startEdit = (user: DiscordUser) => {
    setEditingId(user.id);
    setEditForm({ ...user });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
    setShowBadgeForm(false);
  };

  const saveEdit = () => {
    if (editForm) {
      onUpdateUser(editForm);
      cancelEdit();
    }
  };

  const removeBadge = (badgeId: string) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      badges: editForm.badges.filter((b) => b.id !== badgeId),
    });
  };

  const addBadge = () => {
    if (!editForm || !newBadge.label) return;
    
    const badge: DiscordBadgeType = {
      id: crypto.randomUUID(),
      label: newBadge.label,
      color: newBadge.color || "#5865f2",
      icon: newBadge.icon,
    };

    setEditForm({
      ...editForm,
      badges: [...editForm.badges, badge],
    });
    setShowBadgeForm(false);
    setNewBadge({ label: "NEW", color: "#5865f2", icon: "Check" });
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
                
                {/* Badge Manager Section */}
                <div className="space-y-2 border-t border-[#3f4147] pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#b5bac1]">Badges</span>
                    <button
                      type="button"
                      onClick={() => setShowBadgeForm(!showBadgeForm)}
                      className="text-xs text-[#00a8fc] hover:underline"
                    >
                      {showBadgeForm ? "Cancelar" : "+ Agregar Badge"}
                    </button>
                  </div>

                  {showBadgeForm && (
                    <div className="rounded bg-[#1e1f22] p-2 space-y-2 border border-[#3f4147]">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Etiqueta"
                          value={newBadge.label}
                          onChange={(e) => setNewBadge({...newBadge, label: e.target.value})}
                          className="flex-1 rounded bg-[#2b2d31] px-2 py-1 text-xs text-white border border-[#3f4147]"
                        />
                        <input
                          type="color"
                          value={newBadge.color}
                          onChange={(e) => setNewBadge({...newBadge, color: e.target.value})}
                          className="h-6 w-8 rounded bg-transparent cursor-pointer"
                        />
                      </div>
                       <select
                        value={newBadge.icon || ""}
                        onChange={(e) => setNewBadge({...newBadge, icon: e.target.value})}
                        className="w-full rounded bg-[#2b2d31] px-2 py-1 text-xs text-white border border-[#3f4147]"
                      >
                        <option value="">Sin icono</option>
                        {Object.keys(Icons).map(iconName => (
                           // eslint-disable-next-line @typescript-eslint/no-explicit-any
                           (Icons as any)[iconName] ? (
                            <option key={iconName} value={iconName}>{iconName}</option>
                           ) : null
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={addBadge}
                        className="w-full rounded bg-[#23a559] py-1 text-xs text-white"
                      >
                        Agregar
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {editForm.badges?.map((badge) => (
                      <div key={badge.id} className="relative group">
                         <DiscordBadge badge={badge} />
                         <button
                            type="button"
                            onClick={() => removeBadge(badge.id)}
                            className="absolute -top-1 -right-1 hidden group-hover:block bg-[#ed4245] rounded-full p-0.5"
                         >
                           <X className="h-2 w-2 text-white" />
                         </button>
                      </div>
                    ))}
                    {editForm.badges.length === 0 && (
                      <span className="text-xs text-[#949ba4] italic">Sin badges</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 pt-2">
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
                      <DiscordBadge key={badge.id} badge={badge} />
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
