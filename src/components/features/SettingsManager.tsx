'use client';

import { useState, useEffect } from 'react';
import { Send, Bell } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { ListGroup, ListRow } from '../ui/ListGroup';

export function SettingsManager() {
  const { alertPrefs, setAlertsEnabled, setTelegramChatId, _hasHydrated } = useAppStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  if (!mounted || !_hasHydrated) return null;

  return (
    <ListGroup title="Alert delivery">
      <ListRow
        leading={<Bell className="size-5" aria-hidden="true" />}
        label="Push Notifications"
        description="Receive alerts in your browser"
        value={
          <button
            onClick={async () => {
              if (!alertPrefs.enabled) {
                if ('Notification' in window) {
                  const permission = await Notification.requestPermission();
                  if (permission === 'granted') {
                    setAlertsEnabled(true);
                  } else {
                    alert('Please allow notifications in your browser settings to enable this feature.');
                  }
                } else {
                  alert('Your browser does not support push notifications.');
                }
              } else {
                setAlertsEnabled(false);
              }
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              alertPrefs.enabled ? 'bg-brand' : 'bg-line-strong'
            }`}
          >
            <span
              className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                alertPrefs.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        }
      />
      <ListRow
        leading={<Send className="size-5" aria-hidden="true" />}
        label="Telegram"
        description="Receive anomaly alerts in your Telegram chat"
        value={
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Chat ID (e.g. 123456789)"
              value={alertPrefs.telegramChatId || ''}
              onChange={(e) => setTelegramChatId(e.target.value)}
              className="h-8 rounded-md border border-line bg-canvas px-2 text-xs text-ink outline-none focus:border-brand w-32"
            />
            {alertPrefs.telegramChatId ? (
               <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-xs text-brand font-medium">
                 Linked
               </span>
            ) : (
               <a 
                 href="https://t.me/NusaSenseBot" 
                 target="_blank" 
                 rel="noreferrer"
                 className="text-xs text-brand hover:underline"
               >
                 Get ID
               </a>
            )}
          </div>
        }
      />
    </ListGroup>
  );
}
