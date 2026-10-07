"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { SignalMetrics } from "@/types/signal";

const AVAILABLE_METRICS = [
  { id: "currentPE", label: "P/E Ratio" },
  { id: "currentPBV", label: "PBV Ratio" },
  { id: "dividendYield", label: "Dividend Yield (%)" },
  { id: "revenueGrowthYoY", label: "Revenue Growth (%)" },
  { id: "netProfitGrowthYoY", label: "Net Profit Growth (%)" },
  { id: "bandarmologi_score", label: "Bandarmologi Score" },
  { id: "technical_rsi", label: "Technical RSI" },
];

const OPERATORS = [
  { id: "<", label: "Less than (<)" },
  { id: ">", label: "Greater than (>)" },
  { id: "=", label: "Equals (=)" },
];

export function ScreenerBuilder() {
  const { userRules, addUserRule, removeUserRule, toggleUserRule } = useAppStore();
  
  const [metric, setMetric] = useState(AVAILABLE_METRICS[0].id);
  const [operator, setOperator] = useState(OPERATORS[0].id);
  const [value, setValue] = useState("15");

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || isNaN(Number(value))) return;
    
    const ruleString = `${metric} ${operator} ${value}`;
    addUserRule({ ruleString, active: true });
    
    // Reset form value
    setValue("");
  };

  return (
    <div className="mt-6 flex flex-col gap-8">
      {/* Rule Builder Form */}
      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-ink">Add New Rule</h2>
        <form onSubmit={handleAddRule} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-medium text-ink-faint">Metric</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="h-10 rounded-lg border border-line bg-canvas px-3 text-sm text-ink outline-none focus:border-brand"
            >
              {AVAILABLE_METRICS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full sm:w-32">
            <label className="text-xs font-medium text-ink-faint">Operator</label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="h-10 rounded-lg border border-line bg-canvas px-3 text-sm text-ink outline-none focus:border-brand"
            >
              {OPERATORS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-medium text-ink-faint">Value</label>
            <input
              type="number"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 15"
              className="h-10 rounded-lg border border-line bg-canvas px-3 text-sm text-ink outline-none focus:border-brand"
            />
          </div>

          <button
            type="submit"
            disabled={!value}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-strong disabled:opacity-50 sm:w-auto w-full"
          >
            <Plus className="size-4" />
            Add
          </button>
        </form>
      </section>

      {/* Active Rules List */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-ink">Your Strategies</h2>
        
        {userRules.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-ink-muted text-center rounded-2xl border border-dashed border-line bg-surface/50">
            <p className="text-sm">No rules defined yet.</p>
            <p className="text-xs text-ink-faint mt-1">Add a rule above to start screening.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {userRules.map((rule) => {
              // Parse for display
              const parts = rule.ruleString.split(" ");
              const metricLabel = AVAILABLE_METRICS.find((m) => m.id === parts[0])?.label || parts[0];
              const displayString = `${metricLabel} ${parts[1]} ${parts[2]}`;

              return (
                <div
                  key={rule.id}
                  className={`flex items-center justify-between rounded-xl border border-line p-4 transition-colors ${
                    rule.active ? "bg-canvas" : "bg-surface opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleUserRule(rule.id)}
                      className="text-brand transition-transform active:scale-90"
                      aria-label={rule.active ? "Deactivate rule" : "Activate rule"}
                    >
                      {rule.active ? (
                        <CheckCircle2 className="size-6 fill-brand/20 text-brand" />
                      ) : (
                        <Circle className="size-6 text-ink-faint" />
                      )}
                    </button>
                    <div className="flex flex-col">
                      <span className="font-semibold text-ink text-sm font-mono">{displayString}</span>
                      <span className="text-xs text-ink-muted">
                        {rule.active ? "Active" : "Paused"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUserRule(rule.id)}
                    className="rounded-lg p-2 text-ink-faint hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    aria-label="Delete rule"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
