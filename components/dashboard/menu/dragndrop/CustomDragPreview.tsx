import React from 'react';
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import styles from './CustomDragPreview.module.css';
import { RxDragHandleDots2 } from 'react-icons/rx';

type Props = {
  monitorProps: DragLayerMonitorProps<unknown>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div
      className={`bg-white/70 block flex border shadow-sm pl-2 py-3 rounded-md mb-1 items-center w-[600px]`}
    >
      <div className={` drag-handle ml-2 `}>
        <RxDragHandleDots2 className="text-zinc-500" />
      </div>
      <div className={styles.label}>
        <h1 className="font-medium text-sm">{item.text}</h1>
      </div>
    </div>
  );
};
