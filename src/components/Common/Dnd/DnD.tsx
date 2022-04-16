import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { string } from 'prop-types';
import { DataColumns, OutletElement } from 'src/models';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const TaskCard = ({ item, index, columnId, column, handleSetColumn }) => {
  const handleDeleteOutlet = (id: string) => {
    let indexOfId = column.items.indexOf(
      column.items.filter((d) => d.id === id)[0]
    );
    let tempColumn = [...column.items];
    let reverseItem = tempColumn[indexOfId];
    tempColumn.splice(indexOfId, 1);
    handleSetColumn(tempColumn, reverseItem);
  };
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            borderBottom: `${
              columnId === '1' ? '1px solid #ebebeb' : undefined
            }`,
            '&:last-child': {
              borderBottom: 'none'
            },
            padding: '0px 15px'
          }}
        >
          <div>
            {columnId === '1' ? (
              <Typography
                sx={{
                  padding: ' 15px 15px 15px 0 ',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>{item.OutletName}</span>{' '}
                <CloseIcon
                  color="error"
                  onClick={() => {
                    handleDeleteOutlet(item.id);
                  }}
                />
              </Typography>
            ) : (
              <Typography sx={{ padding: ' 5px 0px' }}>
                {item.OutletName}
              </Typography>
            )}
          </div>
        </Box>
      )}
    </Draggable>
  );
};

interface PropsDragAndDrop {
  columns: DataColumns;
  setColumns: (data: DataColumns) => void;
}
const DnD = ({ columns, setColumns }: PropsDragAndDrop) => {
  const handleSetColumn = (
    columnsList: OutletElement[],
    reverseItem: OutletElement
  ) => {
    let tempCol = columns[1];
    let reverseCol = columns[2];
    tempCol.items = columnsList;
    reverseCol.items.push(reverseItem);

    setColumns({ ...columns, '1': tempCol, '2': reverseCol });
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Grid container>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Grid item xs={6} sx={{ pl: index === 1 ? 6 : 0 }} key={columnId}>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <>
                    <Typography
                      sx={{
                        padding: '15px 20px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        color: '#43505c'
                      }}
                    >
                      {column.title}
                    </Typography>
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        border: '1px solid #ebebeb',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px'
                      }}
                    >
                      <Box
                        sx={{
                          background: '#ebebeb'
                        }}
                      >
                        <Typography
                          sx={{
                            padding: '15px 20px',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            color: '#43505c',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>Outlet Name</span>
                          {index === 0 && <span>Action</span>}
                        </Typography>
                      </Box>
                      {index === 1 ? (
                        <Box
                          sx={{
                            height: '300px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            padding: '7px 25px',
                            margin: '9px 5px',
                            '&::-webkit-scrollbar': {
                              width: '0.6em',
                              borderRadius: '5px'
                            },
                            '&::-webkit-scrollbar-track': {
                              background: '#ebebeb',
                              borderRadius: '5px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: '#555',
                              border: '1px solid #ebebeb',
                              borderRadius: '5px'
                            }
                          }}
                        >
                          {column.items.map((item, index) => (
                            <TaskCard
                              key={index + 'dasdas'}
                              item={item}
                              index={index}
                              column={column}
                              columnId={columnId}
                              handleSetColumn={handleSetColumn}
                            />
                          ))}
                          {provided.placeholder}
                        </Box>
                      ) : (
                        <Box sx={{}}>
                          {column.items.map((item, index) => (
                            <TaskCard
                              key={index + 'asdas'}
                              item={item}
                              index={index}
                              column={column}
                              columnId={columnId}
                              handleSetColumn={handleSetColumn}
                            />
                          ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Droppable>
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
  );
};
export default DnD;
