import type { CSSProperties, ReactNode } from "react";

type Workspace = "Portfolio" | "Trading" | "Research" | "Reports" | "Notebook" | "Settings";

const workspaceNavigation: Array<{ label: Workspace; glyph: string }> = [
  { label: "Portfolio", glyph: "▣" },
  { label: "Trading", glyph: "⌁" },
  { label: "Research", glyph: "⌬" },
  { label: "Reports", glyph: "▥" },
  { label: "Notebook", glyph: "▤" },
  { label: "Settings", glyph: "⚙" },
];

const researchTabs = ["Data", "Strategy", "Backtest", "Pipeline", "Validate", "Results", "AI Assistant"];

function AppSurface({
  children,
  className,
  context,
  label,
  title,
  workspace,
}: {
  children: ReactNode;
  className: string;
  context: string;
  label: string;
  title: string;
  workspace: Workspace;
}) {
  return (
    <div className={`product-visual qs-app-surface ${className}`} data-workspace={workspace.toLowerCase()} role="img" aria-label={label}>
      <div className="qs-app-frame" aria-hidden="true">
        <aside className="qs-app-rail">
          <div className="qs-app-brand">
            <span className="qs-app-brand-mark"><i /><i /><i /></span>
            <strong>QuantStation</strong>
          </div>
          <nav className="qs-app-navigation">
            {workspaceNavigation.map((item) => (
              <span className={`qs-app-nav-item${item.label === workspace ? " is-active" : ""}`} key={item.label}>
                <i className="qs-app-nav-glyph">{item.glyph}</i>
                <b>{item.label}</b>
              </span>
            ))}
          </nav>
          <div className="qs-app-rail-footer"><i>‹</i><span>Collapse rail</span></div>
        </aside>

        <div className="qs-app-main">
          <header className="qs-app-topbar">
            <div>
              <strong>{title}</strong>
              <span>{context}</span>
            </div>
            <div className="qs-app-top-actions">
              <span className="qs-app-online"><i className="qs-app-live-dot" /> Desktop online</span>
              <i>↻</i><i>?</i><i>AI</i><kbd>⌘ K</kbd><b>QS</b>
            </div>
          </header>

          <div className="qs-app-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

function AppTabs({ activeTab, tabs, workspace }: { activeTab: string; tabs: string[]; workspace: Workspace }) {
  return (
    <nav className="qs-app-tabs">
      <span className="qs-app-module-chip">{workspace}</span>
      {tabs.map((tab) => <span className={tab === activeTab ? "is-active" : ""} key={tab}>{tab}</span>)}
    </nav>
  );
}

function AppMetric({ label, value, tone }: { label: string; value: string; tone?: "positive" | "warning" }) {
  return <div className={`qs-app-metric${tone ? ` is-${tone}` : ""}`}><span>{label}</span><strong>{value}</strong></div>;
}

function ResearchSummaryMetrics() {
  return (
    <div className="qs-app-metrics">
      <AppMetric label="Datasets" value="12" />
      <AppMetric label="Candles" value="8.4M" />
      <AppMetric label="Runtime" value="Python / Rust" />
      <AppMetric label="GPU" value="CUDA (1)" tone="positive" />
    </div>
  );
}

const researchCode = [
  ["01", "from ", "quantstation_quant.sdk", " import Chart, StrategyContext"],
  ["03", "class ", "QuantEmaCross", "(EMACross):"],
  ["04", "    def ", "on_bar", "(self, bar: Bar) -> None:"],
  ["05", "        self.chart.", "line", "(\"Close\", bar.close.as_double())"],
  ["06", "        ", "super", "().on_bar(bar)"],
] as const;

export function ResearchVisual() {
  return (
    <AppSurface
      className="qs-research-visual"
      context="Data, strategies, backtests, and optimization"
      label="QuantStation Research workspace interface"
      title="Research"
      workspace="Research"
    >
      <AppTabs activeTab="Strategy" tabs={researchTabs} workspace="Research" />
      <div className="qs-app-stage qs-research-stage">
        <ResearchSummaryMetrics />
        <div className="qs-research-workspace">
          <section className="qs-app-panel qs-context-panel">
            <header><strong>Run Context</strong><span>Local</span></header>
            <div className="qs-context-row"><span>Dataset</span><b>NQ / 15 seconds</b></div>
            <div className="qs-context-row"><span>Strategy</span><b>EMA Cross v1</b></div>
            <div className="qs-context-row"><span>Runtime</span><b>Python</b></div>
            <div className="qs-context-properties">
              <span><i>Fast EMA</i><b>5</b></span>
              <span><i>Slow EMA</i><b>15</b></span>
              <span><i>Quantity</i><b>1</b></span>
            </div>
          </section>
          <section className="qs-app-panel qs-source-panel">
            <header className="qs-source-header">
              <div><strong>Project Source</strong><span>EMA Cross v1 / strategy.py</span></div>
              <div><span>Revert</span><b>Save Version</b></div>
            </header>
            <div className="qs-code-block">
              {researchCode.map(([number, prefix, accent, suffix]) => (
                <div className="qs-code-line" key={number}>
                  <em>{number}</em><code>{prefix}<b>{accent}</b>{suffix}</code>
                </div>
              ))}
            </div>
            <footer className="qs-validation-bar"><span><i /> Schema valid</span><span>Local only</span></footer>
          </section>
        </div>
      </div>
    </AppSurface>
  );
}

const backtestEquityBars = [38, 34, 48, 44, 56, 52, 64, 60, 71, 66, 78, 73, 85, 80, 91, 86, 96] as const;

export function BacktestVisual() {
  return (
    <AppSurface
      className="qs-backtest-visual"
      context="Data, strategies, backtests, and optimization"
      label="QuantStation backtest workspace interface"
      title="Research"
      workspace="Research"
    >
      <AppTabs activeTab="Backtest" tabs={researchTabs} workspace="Research" />
      <div className="qs-app-stage qs-backtest-stage">
        <ResearchSummaryMetrics />
        <div className="qs-backtest-workspace">
          <div className="qs-backtest-meta">
            <section className="qs-app-panel qs-compact-panel">
              <header><strong>Run Context</strong><span>Local</span></header>
              <div className="qs-compact-row"><span>Strategy</span><b>EMA Cross v1</b></div>
              <div className="qs-compact-row"><span>Dataset</span><b>NQ · 15m</b></div>
              <div className="qs-compact-row"><span>Mode</span><b>Walk-forward</b></div>
            </section>
            <section className="qs-app-panel qs-compact-panel">
              <header><strong>Compute Backend</strong><span>Ready</span></header>
              <div className="qs-compact-row"><span>Engine</span><b>Python / Rust</b></div>
              <div className="qs-compact-row"><span>Processing</span><b>Multi CPU</b></div>
              <div className="qs-compact-row"><span>Workers</span><b>4 local</b></div>
            </section>
          </div>
          <section className="qs-app-panel qs-backtest-control">
            <header className="qs-panel-title"><div><strong>Backtest Control</strong><span>Walk-forward · NQ · 15m</span></div><span className="qs-complete"><i /> Completed</span></header>
            <div className="qs-equity-preview">
              <div className="qs-equity-heading"><span>Out-of-sample equity</span><strong data-count-prefix="+$" data-count-up="42840">+$42,840</strong></div>
              <div className="qs-equity-bars" aria-hidden="true">
                {backtestEquityBars.map((height, index) => (
                  <i
                    key={`${height}-${index}`}
                    style={{ "--equity-height": `${height}%`, "--bar-index": index } as CSSProperties}
                  />
                ))}
              </div>
              <div className="qs-equity-axis"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span></div>
            </div>
            <footer className="qs-control-footer"><span>1,284 trades · 6 / 6 folds</span><b>Completed</b></footer>
          </section>
          <section className="qs-app-panel qs-queue-panel">
            <header className="qs-panel-title"><div><strong>Backtest Queue</strong><span>1,284 trades · 3-stage pipeline</span></div><b>4 workers</b></header>
            {[
              ["01", "Optimize", "100%"],
              ["02", "Walk-forward", "100%"],
              ["03", "Final backtest", "100%"],
            ].map(([index, label, progress]) => (
              <div className="qs-job-row" key={label}>
                <span><i />{index}</span><strong>{label}</strong><b>{progress}</b><div><i /></div>
              </div>
            ))}
            <footer><span><i /> All evidence saved</span><b>18 ms</b></footer>
          </section>
        </div>
      </div>
    </AppSurface>
  );
}

const candles = [
  [44, 14, 8, 0], [58, 18, 3, 1], [49, 13, 15, 0], [66, 20, 8, 1], [61, 16, 18, 1], [74, 22, 5, 0],
  [68, 18, 12, 0], [81, 24, 4, 1], [76, 15, 14, 1], [88, 27, 3, 1], [79, 18, 12, 0], [92, 24, 2, 1],
  [84, 16, 9, 0], [96, 26, 1, 1], [89, 19, 7, 0], [100, 28, 0, 1],
] as const;

const depthRows = [
  ["20,843.25", "6", "3", 42, "ask"],
  ["20,843.00", "11", "5", 68, "ask"],
  ["20,842.75", "8", "4", 53, "ask"],
  ["20,842.25", "14", "6", 82, "bid"],
  ["20,842.00", "9", "4", 58, "bid"],
  ["20,841.75", "5", "2", 34, "bid"],
] as const;

export function TradingVisual() {
  return (
    <AppSurface
      className="qs-trading-visual"
      context="Execution, accounts, and market context"
      label="QuantStation live trading workspace interface"
      title="Trading"
      workspace="Trading"
    >
      <div className="qs-app-stage qs-trading-stage">
        <div className="qs-app-metrics">
          <AppMetric label="Balance" value="$128,420" />
          <AppMetric label="Day P&L" value="+$1,284" tone="positive" />
          <AppMetric label="Open orders" value="2" />
          <AppMetric label="Positions" value="1" />
        </div>
        <nav className="qs-trading-workflow">
          <span className="is-active">Order entry</span>
          <span>Orders &amp; fills</span>
          <span>Risk rules</span>
          <span>Smart orders</span>
          <span>Alerts</span>
          <span>Hotkeys</span>
          <span>Strategy session</span>
          <span>Recordings</span>
        </nav>
        <div className="qs-trading-workspace">
          <section className="qs-app-panel qs-market-panel">
            <header className="qs-chart-toolbar"><span>Chart 01</span><span>NQ DEC26</span><span>15 min</span><span>Candles</span><span>SIM-201</span><strong>20,842.25</strong></header>
            <div className="qs-candle-chart">
              <div className="qs-chart-grid-lines" />
              <div className="qs-live-price"><span>20,842.25</span></div>
              {candles.map(([height, body, offset, up], index) => (
                <i className={up ? "up" : "down"} key={index} style={{ "--candle-height": `${height}%`, "--candle-body": `${body}px`, "--candle-offset": `${offset}%`, "--candle-index": index } as CSSProperties} />
              ))}
              <div className="qs-chart-symbol">NQ</div>
            </div>
          </section>
          <section className="qs-app-panel qs-depth-panel">
            <header><strong>Market depth</strong><span>Spread 0.25</span></header>
            <div className="qs-depth-book">
              {depthRows.slice(0, 3).map(([price, size, orders, width, side]) => <DepthRow key={price} orders={orders} price={price} side={side} size={size} width={width} />)}
              <strong className="qs-depth-mid">20,842.50</strong>
              {depthRows.slice(3).map(([price, size, orders, width, side]) => <DepthRow key={price} orders={orders} price={price} side={side} size={size} width={width} />)}
            </div>
            <footer><span><i className="qs-app-live-dot" /> connected</span><b>Risk active</b></footer>
          </section>
        </div>
      </div>
    </AppSurface>
  );
}

function DepthRow({ orders, price, side, size, width }: { orders: string; price: string; side: string; size: string; width: number }) {
  return (
    <div className={`qs-depth-row is-${side}`} style={{ "--depth-width": `${width}%` } as CSSProperties}>
      <i /><span>{size}</span><strong>{price}</strong><b>{orders}</b>
    </div>
  );
}

const reportSpark = [28, 42, 38, 51, 47, 60, 57, 70, 66, 78, 74, 88, 83, 96];

export function ReportsVisual() {
  return (
    <AppSurface
      className="qs-reports-visual"
      context="Native QuantStation analysis and imported history"
      label="QuantStation report analysis workspace interface"
      title="Reports"
      workspace="Reports"
    >
      <AppTabs activeTab="Overview" tabs={["Overview", "Trade analysis", "Periodical analysis", "Graphs", "Trades", "Settings & diagnostics", "Raw JSON", "Monte Carlo", "Prop simulation"]} workspace="Reports" />
      <div className="qs-app-stage qs-reports-stage">
        <aside className="qs-app-panel qs-report-library">
          <header><div><strong>Report library</strong><span>3 saved locally</span></div><b>+</b></header>
          <div className="qs-report-item is-selected"><div><strong>EMA Cross v1</strong><span>Walk-forward · NQ</span></div><b>•••</b></div>
          <div className="qs-report-item"><div><strong>Opening Range</strong><span>Validation · ES</span></div><b>•••</b></div>
          <div className="qs-report-item"><div><strong>Momentum Grid</strong><span>Baseline · CL</span></div><b>•••</b></div>
          <footer><span>Import JSON</span><b>New report</b></footer>
        </aside>
        <div className="qs-report-detail">
          <header className="qs-report-heading">
            <div><strong>EMA Cross v1</strong><span>ema_cross_walk_forward.json</span></div>
            <nav><span><i /> Report loaded</span><b>Export</b><b>•••</b></nav>
          </header>
          <div className="qs-app-metrics qs-report-metrics">
            <AppMetric label="Net profit" value="+$42,840" tone="positive" />
            <AppMetric label="Max drawdown" value="-$8,420" />
            <AppMetric label="Profit factor" value="1.82" />
            <AppMetric label="Return / DD" value="5.09" />
            <AppMetric label="Quality score" value="87 / 100" tone="positive" />
          </div>
          <div className="qs-report-workspace">
            <section className="qs-app-panel qs-quality-panel">
              <header className="qs-panel-title"><div><strong>Run quality</strong><span>Evidence summary</span></div><b>87</b></header>
              <div className="qs-quality-insights">
                <span><i />Stable expectancy<b>Strong</b></span>
                <span><i />Bounded drawdown<b>Healthy</b></span>
                <span><i />Trade sample<b>1,284</b></span>
              </div>
              <div className="qs-report-spark">{reportSpark.map((height, index) => <i key={index} style={{ "--spark-height": `${height}%`, "--bar-index": index } as CSSProperties} />)}</div>
            </section>
            <section className="qs-app-panel qs-evidence-panel">
              <header><strong>Recent evidence</strong><span>Walk-forward / 6 folds</span></header>
              <div className="qs-evidence-head"><span>Period</span><span>Return</span><span>Drawdown</span></div>
              {[
                ["Jan - Mar", "+8.4%", "-2.1%"],
                ["Apr - Jun", "+6.7%", "-1.8%"],
                ["Jul - Sep", "+9.2%", "-2.6%"],
              ].map((row) => <div className="qs-evidence-row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span></div>)}
              <footer><span>Processing</span><strong>Multi CPU</strong><b>Saved locally</b></footer>
            </section>
          </div>
        </div>
      </div>
    </AppSurface>
  );
}
