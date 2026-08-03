import type { CSSProperties } from "react";

const codeLines = [
  ["class", " MomentumBreakout", "(Strategy):"],
  ["    self", ".fast = ", "EMA(21)"],
  ["    self", ".slow = ", "EMA(55)"],
  ["    if", " cross_above(fast, slow):", ""],
  ["        submit", "_bracket_order()", ""],
] as const;

export function ResearchVisual() {
  return (
    <div className="product-visual research-visual" aria-label="QuantStation research workspace illustration">
      <div className="window-bar"><span className="window-title"><i /> Strategy workspace</span><span>Python&nbsp;&nbsp; Rust</span></div>
      <div className="research-layout">
        <aside className="file-tree">
          <span className="mini-label">PROJECT</span>
          <strong>Momentum Lab</strong>
          <span className="tree-active">strategy.py</span>
          <span>strategy.rs</span>
          <span>asset.json</span>
          <div className="tree-status"><i /> Validated</div>
        </aside>
        <div className="editor-pane">
          <div className="editor-tabs"><span>strategy.py</span><span>Properties</span></div>
          <div className="code-block">
            {codeLines.map((line, index) => (
              <div className="code-line" key={index}><em>{String(index + 12).padStart(2, "0")}</em><code><b>{line[0]}</b>{line[1]}<mark>{line[2]}</mark></code></div>
            ))}
          </div>
          <div className="validation-bar"><span><i /> Schema valid</span><span>18 ms</span></div>
        </div>
        <aside className="data-panel">
          <span className="mini-label">DATASET</span>
          <strong>NQ · 15s</strong>
          <span>8.4M bars</span>
          <div className="data-meter"><i /></div>
          <span className="mini-label">RUNTIME</span>
          <div className="runtime-choice"><span>CPU</span><span className="selected">Rust</span><span>GPU</span></div>
        </aside>
      </div>
    </div>
  );
}

const bars = [62, 48, 71, 80, 65, 90, 76, 102, 94, 118, 104, 128, 119, 142, 131, 154, 148, 170];

export function BacktestVisual() {
  return (
    <div className="product-visual backtest-visual" aria-label="QuantStation backtest and optimization illustration">
      <div className="window-bar"><span className="window-title"><i /> Optimization run #042</span><span className="run-state">● Completed</span></div>
      <div className="metric-strip">
        <Metric label="Net P&L" value="+$42,840" note="example" />
        <Metric label="Max drawdown" value="−8.4%" />
        <Metric label="Profit factor" value="1.82" />
        <Metric label="Walk-forward" value="6 / 6" />
      </div>
      <div className="equity-panel">
        <div className="panel-heading"><div><span className="mini-label">EQUITY CURVE</span><strong>Out-of-sample evidence</strong></div><div className="legend"><i /> Equity <i /> Drawdown</div></div>
        <div className="chart-grid">
          <div className="equity-bars">
            {bars.map((height, index) => <i key={index} style={{ "--bar-height": `${height}px` } as CSSProperties} />)}
          </div>
          <div className="chart-glow" />
          <div className="chart-axis"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span></div>
        </div>
      </div>
      <div className="queue-row"><span><i /> Regular backtest</span><span><i /> Walk-forward</span><span><i /> Multi-objective</span><strong>All evidence saved</strong></div>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong>{note && <em>{note}</em>}</div>;
}

const candles = [
  [44, 18, 48, 0], [62, 26, 25, 1], [55, 20, 66, 0], [74, 32, 43, 1], [68, 22, 32, 1], [90, 38, 29, 0],
  [78, 30, 55, 0], [101, 40, 20, 1], [94, 24, 35, 1], [116, 44, 18, 1], [108, 30, 45, 0], [126, 36, 27, 1],
  [120, 26, 38, 0], [142, 42, 24, 1], [134, 35, 44, 0], [153, 48, 18, 1], [146, 30, 34, 1], [164, 42, 20, 1],
] as const;

export function TradingVisual() {
  return (
    <div className="product-visual trading-visual" aria-label="QuantStation live trading workspace illustration">
      <div className="window-bar"><span className="window-title"><i className="live-dot" /> NQ · 15 seconds</span><span>Layout 02&nbsp;&nbsp; LIVE</span></div>
      <div className="trading-layout">
        <div className="chart-pane">
          <div className="chart-toolbar"><span>NQZ6</span><span>15s</span><span>Indicators</span><span>Replay</span><strong>20,842.25</strong></div>
          <div className="candle-chart">
            <div className="price-line"><span>20,842.25</span></div>
            {candles.map(([height, body, offset, up], index) => (
              <i className={up ? "up" : "down"} key={index} style={{ "--candle-height": `${height}px`, "--candle-body": `${body}px`, "--candle-offset": `${offset}px` } as CSSProperties} />
            ))}
            <div className="chart-watermark">NQ</div>
          </div>
        </div>
        <aside className="order-ticket">
          <span className="mini-label">ORDER TICKET</span>
          <strong>NQZ6</strong>
          <div className="ticket-row"><span>Quantity</span><b>2</b></div>
          <div className="ticket-row"><span>Order</span><b>Market</b></div>
          <button type="button">Buy market</button>
          <button type="button" className="sell">Sell market</button>
          <div className="risk-check"><i /> Risk rules active</div>
        </aside>
      </div>
    </div>
  );
}

export function ReportsVisual() {
  const rows = [
    ["Momentum NQ", "+18.4%", "7.2%"],
    ["Dual Thrust", "+12.1%", "5.9%"],
    ["Opening Range", "+8.7%", "4.3%"],
  ];
  return (
    <div className="product-visual reports-visual" aria-label="QuantStation Report Lab illustration">
      <div className="window-bar"><span className="window-title"><i /> Report Lab</span><span>24 reports loaded</span></div>
      <div className="report-grid">
        <div className="report-score">
          <span className="mini-label">PORTFOLIO QUALITY</span>
          <strong>87</strong>
          <div className="score-ring"><i /></div>
          <p>Balanced return, drawdown, and concentration.</p>
        </div>
        <div className="report-table">
          <div className="table-head"><span>Strategy</span><span>Return</span><span>Drawdown</span></div>
          {rows.map((row) => <div className="table-row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span></div>)}
          <div className="correlation-map"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
        </div>
      </div>
    </div>
  );
}

export function SignalCore() {
  return (
    <div className="signal-core" aria-hidden="true">
      <div className="core-rings"><i /><i /><i /></div>
      <div className="core-bars"><i /><i /><i /><i /></div>
      <div className="core-base" />
      <div className="core-scan" />
    </div>
  );
}

