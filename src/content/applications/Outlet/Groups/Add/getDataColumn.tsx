import React, { useEffect, useState } from 'react';
import groupApi from 'src/api/group';
import outletApi from 'src/api/outletApi';
import { DataColumns, PropsEdit } from 'src/models';
import Add from './Add';

export default function GetDataColumn({ editId, editMode }: PropsEdit) {
  const [columns, setColumns] = useState<DataColumns>({});

  useEffect(() => {
    if (editId === undefined) {
      outletApi.getData(99, 0).then(async (res) => {
        if (res.data.success) {
          let temp = res.data.data.map((d, index) => {
            return { OutletName: d.name, id: d.id };
          });

          setColumns({
            ...columns,
            '1': { title: 'Tagged Outlet', items: [] },
            '2': { title: 'Available Outlet', items: temp }
          });
        }
      });
    } else {
      groupApi.getDataById(editId).then((res) => {
        if (res.data.success) {
          outletApi.getData(99, 0).then(async (respon) => {
            if (respon.data.success) {
              let temp = respon.data.data.map((d, index) => {
                return { OutletName: d.name, id: d.id };
              });

              let data = res.data.data.lstOutletResponse;
              console.log(data);

              let tempData = [];
              if (data !== null)
                tempData = data.map((d, index) => {
                  return { id: d.id, OutletName: d.name };
                });
              let newTemp = temp.filter(
                (d) => !tempData.map((e) => e.id).includes(d.id)
              );

              setColumns({
                ...columns,
                '1': { title: 'Tagged Outlet', items: tempData },
                '2': { title: 'Available Outlet', items: newTemp }
              });
            }
          });
        }

        // let data = res.data.data.lstOutletResponse;
        // let tempData = data.map((d, index) => {
        //   return { id: d.id, OutletNameL: d.name };
        // });
      });
    }
  }, [editId]);
  const handleAfterDragParent = (data: DataColumns) => {
    setColumns(data);
  };
  return (
    <Add
      dataColumns={columns}
      handleAfterDragParent={handleAfterDragParent}
      editId={editId}
      editMode={editMode}
    />
  );
}
