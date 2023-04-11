import React from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva'

function App() {
  const [circles, setCircles] = React.useState([])

  const handleStageClick = (e) => {
    let existingDot = circles.find(circle => {
      let x = e.evt.layerX
      let y = e.evt.layerY
      return (x >= circle.x - 12 && x <= circle.x + 12) && (y >= circle.y - 12 && y <= circle.y + 12)
    })
    if (!existingDot) {
      let newCircles = [...circles, { x: e.evt.layerX, y: e.evt.layerY }]
      setCircles(newCircles)
      console.log(e.evt)
    }
  }

  const handleDragEnd = (e, i) => {
    let newCircles = [...circles];
    newCircles[i] = { ...newCircles[i], x: e.target.attrs.x, y: e.target.attrs.y };
    setCircles(newCircles);
  };

  return (
    <div className="App">
      <p style={{ cursor: "default" }}>Click anywhere inside of the box to create a red dot. Also, you can move the dot.</p>
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick}>
        <Layer>
          <Rect width={window.innerWidth} height={window.innerHeight} stroke='black' strokeWidth={2} />
          {circles.map((circle, i) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
              radius={12}
              fill='red'
              draggable
              onDragEnd={(e) => handleDragEnd(e, i)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
