import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  '& li': {
    border: '1px solid #ebebeb'
  },

  '& li:first-of-type': {
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    border: '1px solid #ebebeb',
    overflow: 'hidden'
  },
  '& li:last-child': {
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    border: '1px solid #ebebeb',
    overflow: 'hidden'
  },
  '& button': {
    background: '#fff',
    border: '0',
    color: '#3e8ac1',
    height: '35px',
    padding: '0px 15px',
    '&:disabled': {
      color: '#6e777f'
    }
  }
});

export default function UsePagination() {
  const { items } = usePagination({
    count: 10
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = (
              <button
                type="button"
                style={{
                  background: selected ? '#c9c9c9' : ' #fff',
                  color: selected ? '#fff' : '#3e8ac1'
                }}
              >
                ...
              </button>
            );
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                style={{
                  background: selected ? '#c9c9c9' : ' #fff',
                  color: selected ? '#fff' : '#3e8ac1'
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}
