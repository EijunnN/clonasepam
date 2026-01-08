"use client";

import { ChevronDown, Download, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Platform = {
  id: string;
  name: string;
  icon: string;
  color: string;
  available: boolean;
};

const PLATFORMS: Platform[] = [
  { id: "discord", name: "Discord", icon: "🎮", color: "#5865f2", available: true },
  
  { id: "instagram", name: "Instagram", icon: "📷", color: "#e1306c", available: false },
  
  { id: "messenger", name: "Messenger", icon: "💬", color: "#0084ff", available: false },
  

  { id: "slack", name: "Slack", icon: "💼", color: "#4a154b", available: false },
  { id: "telegram", name: "Telegram", icon: "✈️", color: "#0088cc", available: false },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "#000000", available: false },
  { id: "tinder", name: "Tinder", icon: "🔥", color: "#fe3c72", available: false },
  { id: "whatsapp", name: "WhatsApp", icon: "📱", color: "#25d366", available: true },
  { id: "x", name: "X", icon: "𝕏", color: "#000000", available: false },
];

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("discord");
  const [expandedSections, setExpandedSections] = useState({
    apps: true,
    type: true,
    people: true,
    messages: true,
    about: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const currentPlatform = PLATFORMS.find((p) => p.id === selectedPlatform);

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">mockly</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Unlock all features
          </button>
          <button
            type="button"
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign In
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Platform Selector */}
        <div className="flex w-[320px] flex-col border-r border-gray-200 bg-white">
          <div className="flex-1 overflow-y-auto p-4">
            {/* Apps Section */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection("apps")}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>App</span>
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                    {PLATFORMS.filter((p) => p.available).length}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform",
                    expandedSections.apps && "rotate-180"
                  )}
                />
              </button>

              {expandedSections.apps && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => platform.available && setSelectedPlatform(platform.id)}
                      disabled={!platform.available}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                        selectedPlatform === platform.id
                          ? "border-transparent text-white"
                          : platform.available
                            ? "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      )}
                      style={
                        selectedPlatform === platform.id
                          ? { backgroundColor: platform.color }
                          : undefined
                      }
                    >
                      <span>{platform.icon}</span>
                      <span>{platform.name}</span>
                      {!platform.available && (
                        <span className="ml-1 text-xs text-amber-500">🔒</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type Section */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection("type")}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <span>📝</span>
                  <span>Type</span>
                  <span className="text-xs text-gray-500">Direct Message</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform",
                    expandedSections.type && "rotate-180"
                  )}
                />
              </button>
            </div>

            {/* People Section */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection("people")}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>People</span>
                  <span className="text-xs text-gray-500">2</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform",
                    expandedSections.people && "rotate-180"
                  )}
                />
              </button>
            </div>

            {/* Messages Section */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection("messages")}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <span>💬</span>
                  <span>Messages</span>
                  <span className="text-xs text-gray-500">7</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform",
                    expandedSections.messages && "rotate-180"
                  )}
                />
              </button>
            </div>

            {/* About Section */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection("about")}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>About</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform",
                    expandedSections.about && "rotate-180"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 text-center text-xs text-gray-500">
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="hover:text-gray-700">Terms</a>
              <a href="#" className="hover:text-gray-700">Privacy</a>
              <a href="#" className="hover:text-gray-700">API</a>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex flex-1 flex-col bg-gray-100">
          <div className="flex flex-1 items-center justify-center p-8">
            {currentPlatform?.available ? (
              <Link
                href={`/${currentPlatform.id}`}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105"
              >
                <span className="text-6xl">{currentPlatform.icon}</span>
                <span className="text-xl font-semibold text-gray-900">
                  {currentPlatform.name}
                </span>
                <span className="text-sm text-gray-500">
                  Click to open editor
                </span>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-lg">
                <span className="text-6xl opacity-50">{currentPlatform?.icon}</span>
                <span className="text-xl font-semibold text-gray-400">
                  {currentPlatform?.name}
                </span>
                <span className="text-sm text-gray-400">Coming soon...</span>
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-center gap-4 border-t border-gray-200 bg-white p-4">
            <button type="button" className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50">
              📱
            </button>
            <button type="button" className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50">
              🖥️
            </button>
            <button type="button" className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50">
              ⚙️
            </button>
            <button type="button" className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50">
              ▶️
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
