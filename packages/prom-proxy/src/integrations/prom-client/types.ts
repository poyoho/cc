import type {
  Counter,
  Gauge,
  Histogram,
  Summary,
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration,
  MetricConfiguration
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

export type MetriceConstructorOptions = (
  | CounterConfiguration<string>
  | GaugeConfiguration<string>
  | HistogramConfiguration<string>
  | SummaryConfiguration<string>
) & {
  type: MetriceType
}

export interface MetricMateData
  extends Omit<
    MetricConfiguration<string>,
    'collect' | 'registers' | 'type' | 'aggregator'
  > {
  type: MetriceType
}
