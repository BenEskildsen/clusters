const React = require('react');
const {useEffect, useState, useMemo, Component} = React;

function Canvas(props: Props) {
  let {
    useFullScreen,
    // only necessary if not useFullScreen
    windowWidth, windowHeight,

    // needed for focusing an entity
    focus, // Entity
    cellSize, // size in pixels of grid space
    dispatch,
  } = props;

  // calculate max canvas width (allows canvas sizing DOWN)
  let maxHeight = Math.min(2000, windowHeight, windowWidth * 1.33);
  let maxWidth = maxHeight * 0.75;

  let canvasWidth = maxWidth;
  let canvasHeight = maxHeight;

  if (useFullScreen && !windowWidth) {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  if (useFullScreen) {
    maxWidth = windowWidth;
    maxHeight = windowHeight;
    let sizeMult = 0.9;
    if (maxWidth < 600 || maxHeight < 800) {
      sizeMult = 0.75;
    }
    if (maxWidth > 1000 || maxHeight > 1000) {
      sizeMult = 1.25;
    }
    if (maxWidth > 1200 || maxHeight > 1200) {
      sizeMult = 1.3;
    }
    useEffect(() => {
      if (focus != null) {
        let viewPos = {x:0, y: 0};
        const viewWidth = maxWidth / (cellSize * sizeMult);
        const viewHeight = maxHeight / (cellHeight * sizeMult);
          viewPos = {
            x: focus.position.x - viewWidth / 2,
            y: focus.position.y - viewHeight /2,
          };
        dispatch({type: 'SET_VIEW_POS',
          viewPos, viewWidth, viewHeight,
        });
      }
    }, [maxWidth, maxHeight]);

    if (maxWidth != canvasWidth) {
      canvasWidth = maxWidth;
    }
    if (maxHeight != canvasHeight) {
      canvasHeight = maxHeight;
    }
  } else {
    // HACK: for when opening up the editor UI in game mode
    canvasWidth = Math.min(canvasWidth, 1200);
  }

  const fullScreenStyle = {
    height: '100%',
    width: '100%',
    maxWidth,
    maxHeight,
    margin: 'auto',
    position: 'relative',
  };
  const nonFullScreenStyle = {
    height: config.canvasHeight,
    width: config.canvasWidth,
    maxWidth: config.canvasWidth,
    maxHeight: config.canvasHeight,
    position: 'absolute',
    top: 0,
    left: 0,
  };

  return (
    <div id="canvasWrapper"
      style={useFullScreen ? nonFullScreenStyle : fullScreenStyle}
    >
      <canvas
        id="canvas" style={{
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
        width={config.canvasWidth} height={config.canvasHeight}
      />
    </div>
  );
}

function withPropsChecker(WrappedComponent) {
  return class PropsChecker extends Component {
    componentWillReceiveProps(nextProps) {
      Object.keys(nextProps)
        .filter(key => {
          return nextProps[key] !== this.props[key];
        })
        .map(key => {
          console.log(
            'changed property:',
            key,
            'from',
            this.props[key],
            'to',
            nextProps[key]
          );
        });
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

module.exports = React.memo(Canvas);
