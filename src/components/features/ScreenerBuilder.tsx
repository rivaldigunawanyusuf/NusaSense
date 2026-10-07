"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ListFilter } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { EmptyState } from "@/components/ui/EmptyState";

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
  const { userRules, addUserRule, removeUserRule, toggleUserRule, _hasHydrated } = useAppStore();
  
  const [metric, setMetric] = useState(AVAILABLE_METRICS[0].id);
  const [operator, setOperator] = useState(OPERATORS[0].id);
  const [value, setValue] = useState("15");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !_hasHydrated) return null;

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!value || value.trim() === "") {
        throw new Error("Invalid formula syntax");
      }
      const parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        throw new Error("Invalid formula syntax");
      }
      
      const ruleString = `${metric} ${operator} ${parsedValue}`;
      addUserRule({ ruleString, active: true });
      
      // Reset form value and error
      setValue("");
      setErrorMsg("");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      }
    }
  };

  const isInvalid = !value || value.trim() === "" || isNaN(Number(value));

  return (
    <div className="mt-6 flex flex-col gap-8">
      {/* Rule Builder Form */}
      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-ink">Add New Rule</h2>
        <form onSubmit={handleAddRule} className="flex flex-col gap-4 sm:flex-row sm:items-start">
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
              onChange={(e) => {
                setValue(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="e.g. 15"
              className={`h-10 rounded-lg border bg-canvas px-3 text-sm text-ink outline-none focus:border-brand ${
                errorMsg ? "border-down focus:border-down" : "border-line"
              }`}
            />
            {errorMsg && <span className="text-xs text-down mt-1">{errorMsg}</span>}
          </div>

          <button
            type="submit"
            disabled={isInvalid}
            className="flex h-10 mt-6 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-strong disabled:opacity-50 sm:w-auto w-full"
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
          <EmptyState
            icon={ListFilter}
            title="No rules defined yet"
            description="Add a rule above to start screening."
          />
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
                    className="rounded-lg p-2 text-ink-faint hover:bg-down/10 hover:text-down transition-colors"
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
