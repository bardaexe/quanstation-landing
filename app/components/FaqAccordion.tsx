export function FaqAccordion({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className="faq-list faq-accordion">
      {items.map(([question, answer], index) => {
        const id = `faq-${String(index + 1).padStart(2, "0")}`;
        return (
          <details className="faq-item" id={id} key={id} name="quantstation-faq">
            <summary>
              <span>{question}</span>
              <i aria-hidden="true">+</i>
            </summary>
            <div className="faq-answer"><p>{answer}</p></div>
          </details>
        );
      })}
    </div>
  );
}
