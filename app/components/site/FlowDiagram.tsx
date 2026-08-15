export function FlowDiagram({ variant }: { variant: "home" | "practice" }) {
  if (variant === "practice") {
    return (
      <div className="flow-diagram flow-diagram-io" aria-hidden="true">
        <div className="flow-node">Demand</div>
        <span className="flow-edge" />
        <div className="flow-node">Surfaces</div>
        <span className="flow-edge" />
        <div className="flow-states">
          <div className="flow-node is-empty">retrieved</div>
          <div className="flow-node is-empty">cited</div>
          <div className="flow-node is-empty">chosen</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flow-diagram" aria-hidden="true">
      <div className="flow-node">Query</div>
      <span className="flow-edge" />
      <div className="flow-node">Surface</div>
      <span className="flow-edge" />
      <div className="flow-node is-empty">State</div>
    </div>
  );
}
