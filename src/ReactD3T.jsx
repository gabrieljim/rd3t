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

const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 3 });
    }
  }, []);

  return [translate, containerRef];
};

const RenderObjectCard = (props) => {
  const { foreignObjectProps, nodeDatum } = props;
  // const [translate, containerRef] = useCenteredTree();
  // console.log(translate);
  const miRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const nodo = miRef.current;
    if (nodo) {
      const rect = nodo.getBoundingClientRect();
      console.log(rect);
      // const translateX = -350;
      // const translateY = 420;
      // const translateX = 490;
      // const translateY = 280;
      // Tamaño del nodo
      // const nodoAncho = 150;
      // const nodoAltura = 100;

      // Calcula las coordenadas x e y para centrar el nodo en el contenedor
      // const x = window.innerWidth / 2;
      // const y = window.innerHeight / 2;

      // console.log("Coordenada X para centrar:", x);
      // console.log("Coordenada Y para centrar:", y);

      // console.log("Posición X:", rect.x);
      // console.log("Posición Y:", rect.y);
      // console.log("ancho", rect.width);
      // console.log("alto", rect.height);
    }
  }, [miRef]);
  return (
    <>
      <foreignObject
        ref={miRef}
        {...foreignObjectProps}
        style={{ overflow: "visible" }}
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
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 100, y: 100 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -50,
    y: -40,
  };
  // console.log(foreignObjectProps);

  return (
    <div className="tree-container" style={containerStyles}>
      <Tree
        data={data}
        orientation="vertical"
        // translate={{ x: 657.5, y: 459.5 }}
        // translate={{ x: 490, y: 280 }}
        zoom={2}
        scaleExtent={{ min: 0.1, max: 2 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
        collapsible={false}
        pathClassFunc={() => "link-quests"}
        pathFunc="step"
        renderCustomNodeElement={(props) =>
          renderForeignObjectNode({ ...props, foreignObjectProps })
        }
      />
    </div>
  );
};

export default ReactD3T;
