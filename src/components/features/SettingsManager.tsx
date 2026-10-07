'use client';

import { Send, Bell } from 'lucide-react';
import { useAppStore } from '@/lib/store/useAppStore';
import { ListGroup, ListRow } from '../ui/ListGroup';

export function SettingsManager() {
  const { alertPrefs, setAlertsEnabled } = useAppStore();

  return (
    <ListGroup title="Alert delivery">
      <ListRow
        leading={<Bell className="size-5" aria-hidden="true" />}
        label="Push Notifications"
        description="Receive alerts in your browser"
        value={
          <button
            onClick={() => setAlertsEnabled(!alertPrefs.enabled)}
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
          <span className="rounded-full border border-line-strong px-2 py-0.5 text-xs text-ink-faint">
            Not linked
          </span>
        }
      />
    </ListGroup>
  );
}
