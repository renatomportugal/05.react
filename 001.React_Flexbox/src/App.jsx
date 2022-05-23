import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

const UploadGallery = () => {
  const [items, setItems] = useState([
    "https://source.unsplash.com/WLUHO9A_xik/900x900",
    "https://source.unsplash.com/R4K8S77qtwI/900x900",
    "https://source.unsplash.com/jJGc21mEh8Q/900x900",
    "https://source.unsplash.com/omNxg6JP6Fo/900x900",
    "https://source.unsplash.com/-M1gkucIqkQ/900x900",
    "https://source.unsplash.com/czOuPVsfHDw/900x900",
    "https://source.unsplash.com/-vr0gMUM6Fk/900x900",
    "https://source.unsplash.com/TsMuMM_qVec/900x900"
  ]);
  const [activeId, setActiveId] = useState(null);
  const activeItemIndex = items.findIndex((id) => id === activeId);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "10px"
          }}
        >
          {items.map((url, index) => (
            <SortableItem
              key={url}
              url={url}
              activeId={activeId}
              index={index}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay adjustScale={true} dropAnimation={null}>
        {activeId ? (
          <div
            style={{
              height: activeItemIndex === 0 ? 410 : 200,
              backgroundImage: `url("${activeId}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "grey"
            }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
};

export default UploadGallery;
