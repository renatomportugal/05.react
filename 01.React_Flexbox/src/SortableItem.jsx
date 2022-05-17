import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ url, activeId, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: url });

  const style = {
    opacity: activeId === url ? "0.2" : "1",
    transformOrigin: "0 0",
    height: index === 0 ? "410px" : "200px",
    gridRowStart: index === 0 ? "span 2" : null,
    gridColumnStart: index === 0 ? "span 2" : null,
    backgroundImage: `url("${url}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "grey",
    transform: CSS.Transform.toString(transform),
    transition
  };

  return <div ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

export default SortableItem;
