import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspace';

export function Board() {
  const { lists, moveCard, addList, addCard } = useWorkspaceStore();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    moveCard(result.source, result.destination);
  };

  return (
    <div className="h-full overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 p-4 h-full">
          {lists.map((list) => (
            <div
              key={list.id}
              className="w-72 flex-shrink-0 bg-gray-800 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-100">{list.name}</h3>
                <button
                  onClick={() => addCard(list.id)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Plus size={20} className="text-gray-400" />
                </button>
              </div>

              <Droppable droppableId={list.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2"
                  >
                    {list.cards.map((card, index) => (
                      <Draggable
                        key={card.id}
                        draggableId={card.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-700 p-3 rounded shadow-sm"
                          >
                            <p className="text-gray-100">{card.title}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}

          <button
            onClick={addList}
            className="w-72 flex-shrink-0 bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <Plus size={20} />
              <span>Adicionar lista</span>
            </div>
          </button>
        </div>
      </DragDropContext>
    </div>
  );
}