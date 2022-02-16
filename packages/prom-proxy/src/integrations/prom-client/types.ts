import type {
  Counter,
  Gauge,
  Histogram,
  Summary,
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration
} from 'prom-client'

export type MetriceType = 'counter' | 'gauge' | 'histogram' | 'summary'

export type ICollector =
  | Counter<string>
  | Gauge<string>
  | Histogram<string>
  | Summary<string>

export type TypedCollector = ICollector & {
  type: MetriceType
}

type TypedCounter = Counter<string> & { type: MetriceType }
type TypedGauge = Gauge<string> & { type: MetriceType }
type TypedHistogram = Histogram<string> & { type: MetriceType }
type TypedSummary = Summary<string> & { type: MetriceType }

export type MetriceConstructorOptions = (
  | CounterConfiguration<string>
  | GaugeConfiguration<string>
  | HistogramConfiguration<string>
  | SummaryConfiguration<string>
) & {
  type: MetriceType
}

export function isCounter(node: TypedCollector): node is TypedCounter {
  return node !== undefined && node.type === 'counter'
}

export function isGauge(node: TypedCollector): node is TypedGauge {
  return node !== undefined && node.type === 'gauge'
}

export function isHistogram(node: TypedCollector): node is TypedHistogram {
  return node !== undefined && node.type === 'histogram'
}

export function isSummary(node: TypedCollector): node is TypedSummary {
  return node !== undefined && node.type === 'summary'
}
