import { UserRule } from "@/lib/store/useAppStore";
import { SignalMetrics } from "@/types/signal";

/**
 * Evaluates a given rule string against a SignalMetrics object.
 * Rule string format: "metric operator value" (e.g. "currentPE < 15")
 */
export function evaluateRule(rule: UserRule, metrics: SignalMetrics): boolean {
  if (!rule.active) return false;

  const parts = rule.ruleString.split(" ");
  if (parts.length !== 3) return false;

  const [metricKey, operator, valueStr] = parts;
  const targetValue = parseFloat(valueStr);

  if (isNaN(targetValue)) return false;

  const metricValue = metrics[metricKey as keyof SignalMetrics];

  // If the metric doesn't exist or is null/undefined on this ticker, we can't evaluate it
  if (metricValue == null) return false;

  const actualValue = Number(metricValue);
  if (isNaN(actualValue)) return false;

  switch (operator) {
    case "<":
      return actualValue < targetValue;
    case ">":
      return actualValue > targetValue;
    case "=":
    case "==":
      return actualValue === targetValue;
    case "<=":
      return actualValue <= targetValue;
    case ">=":
      return actualValue >= targetValue;
    default:
      return false;
  }
}

/**
 * Evaluates an array of rules.
 * Currently defaults to 'AND' logic if multiple rules are active.
 */
export function evaluateRules(rules: UserRule[], metrics: SignalMetrics): boolean {
  const activeRules = rules.filter(r => r.active);
  
  if (activeRules.length === 0) return false; // No rules, so no match

  // Must match ALL active rules (AND logic)
  return activeRules.every(rule => evaluateRule(rule, metrics));
}
