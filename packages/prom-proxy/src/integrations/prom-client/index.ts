import type {
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration
} from 'prom-client'
import type { ICollector, MetriceConstructorOptions } from './types'
import prom from 'prom-client'

export function createCollect(config: MetriceConstructorOptions): ICollector {
  switch (config.type) {
    case 'counter':
      return new prom.Counter(config as CounterConfiguration<string>)
    case 'gauge':
      return new prom.Gauge(config as GaugeConfiguration<string>)
    case 'histogram':
      return new prom.Histogram(config as HistogramConfiguration<string>)
    case 'summary':
      return new prom.Summary(config as SummaryConfiguration<string>)
  }
}

export * from 'prom-client'
export * from './types'
