// ReorderPages.js
import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DraggablePage({ page, index, movePage }) {
  const [, ref] = useDrag({
    type: 'PAGE',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'PAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      Page {page}
    </div>
  );
}

function ReorderPages({ selectedPages, onReorder }) {
  const movePage = (fromIndex, toIndex) => {
    const reorderedPages = [...selectedPages];
    const [movedPage] = reorderedPages.splice(fromIndex, 1);
    reorderedPages.splice(toIndex, 0, movedPage);
    onReorder(reorderedPages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {selectedPages.map((page, index) => (
          <DraggablePage
            key={page}
            page={page}
            index={index}
            movePage={movePage}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default ReorderPages;
