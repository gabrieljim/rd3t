import React, { useCallback, useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import "./ReactD3T.css";

export const treeData = {
  name: "Traders",
  attributes: {
    level: 0,
  },
  children: [
    {
      name: "Prapor",
      attributes: {
        level: 1,
      },
      children: [
        {
          id: 1,
          name: "Debut",
          attributes: {
            level: 2,
          },
        },
        {
          id: 2,
          name: "Mole",
          attributes: {
            level: 3,
          },
          children: [
            {
              id: 3,
              name: "saving the salewa",
              attributes: {
                level: 3,
              },
            },
          ],
        },
      ],
    },
    {
      name: "Therapist",
      attributes: {
        level: 1,
      },
      children: [
        {
          name: "Shortage",
          attributes: {
            level: 2,
          },
        },
        {
          name: "Propital",
          attributes: {
            level: 3,
          },
        },
      ],
    },
    {
      name: "Skier",
      attributes: {
        level: 1,
      },
      children: [
        {
          name: "Find the flash drive",
          attributes: {
            level: 2,
          },
        },
        {
          name: "Give me money",
          attributes: {
            level: 3,
          },
        },
      ],
    },
  ],
};

const containerStyles = {
  width: "100%",
  height: "100vh",
  backgroundColor: "gray",
};

const RenderObjectCard = (props) => {
  const { foreignObjectProps, nodeDatum } = props;

  return (
    <>
      <foreignObject
        {...foreignObjectProps}
        style={{ overflow: "visible" }}
        data-node-name={nodeDatum.name} // keep track of each node using the name
      >
        {nodeDatum.attributes.level >= 1 && (
          <>
            <div
              style={{
                border: "1px solid black",
                backgroundColor: "#CCC9A1",
                minWidth: "100%",
                minHeight: "100%",
              }}
            >
              <p style={{ textAlign: "center" }}>{nodeDatum.name}</p>
            </div>
            <button style={{ width: "100%" }}>complete</button>
          </>
        )}
      </foreignObject>
    </>
  );
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => {
  return (
    <RenderObjectCard
      nodeDatum={nodeDatum}
      toggleNode={toggleNode}
      foreignObjectProps={foreignObjectProps}
    />
  );
};
const ReactD3T = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [translate, setTranslate] = useState();
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef();
  const nodeSize = { x: 100, y: 100 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -50,
    y: -40,
  };

  const searchAndZoomToNode = (nodeName) => {
    // each node has this data-node-name attribute set on creation with the name of the quest
    // TODO: match regex for name instead of needing to type it exactly
    const nodeElement = document.querySelector(
      `[data-node-name="${nodeName}"]`
    );

    if (!nodeElement) return;

    // get the coordinates for the node
    const nodeRect = nodeElement.getBoundingClientRect();

    const translateX = -nodeRect.left; // how much it moves from the left
    const translateY = -nodeRect.top; // how much it moves from the top
    console.log("node coordinates", nodeRect.left, nodeRect.top);
    console.log("setting translate to ", translateX, translateY);

    // we cant just set the new coordinates because they are relative to the current position
    // so we need to add the new coordinates to the current ones
    // TODO: get this centered instead of top left
    setTranslate((prevState) => ({
      x: prevState.x + translateX,
      y: prevState.y + translateY,
    }));

    // TODO: figure out how to zoom in (maybe simply using setZoom works after the container is centered)
  };

  const resetTranslate = () => {
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className="tree-container" style={containerStyles}>
      <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={() => searchAndZoomToNode(searchValue)}>Search</button>
      <button onClick={() => resetTranslate()}>Reset</button>
      <Tree
        data={data}
        orientation="vertical"
        zoom={zoom}
        zoomable

        // bindZoomListener: this shit isnt documented, had to look in the library's code (ctrl+click <Tree)
        // node_modules/react-d3-tree/lib/types/Tree/index.d.ts 
        bindZoomListener 
        scaleExtent={{ min: 0.1, max: 2 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
        onUpdate={(upd) => {
          setTranslate(upd.translate);
          setZoom(upd.zoom);
        }}
        collapsible={false}
        pathClassFunc={() => "link-quests"}
        pathFunc="step"
        translate={translate}
        data-name="tree"
        renderCustomNodeElement={(props) =>
          renderForeignObjectNode({ ...props, foreignObjectProps })
        }
      />
    </div>
  );
};

export default ReactD3T;
