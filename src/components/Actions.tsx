type Props = {
  generate: () => void;
  zoomOut: () => void;
  zoomIn: () => void;
  zoom: number;
};

const Actions = (props: Props) => {
  const { generate, zoomOut, zoomIn, zoom } = props;
  return (
    <div className="actions-wrapper">
      <button onClick={generate}>Generate</button>
      <button onClick={zoomOut}>Zoom out</button>
      <span>Zoom: {zoom}</span>
      <button onClick={zoomIn}>Zoom in</button>
    </div>
  );
};

export default Actions;
