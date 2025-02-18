'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
  DndProvider,
  TreeMethods,
} from '@minoru/react-dnd-treeview';
import styles from './menu-tree.module.css';

import { CustomDragPreview } from '@/components/dashboard/menu/dragndrop/CustomDragPreview';
import { Placeholder } from '@/components/dashboard/menu/dragndrop/Placeholder';
import { CustomNode } from '@/components/dashboard/menu/dragndrop/CustomNode';
import { updateMenuView } from '@/actions/menu';

// import SampleData from '@/components/dashboard/menu/dragndrop/sample_data.json';

export default function MenuTree({ data, menuId }: { data: NodeModel[]; menuId: string }) {
  const ref = useRef<TreeMethods>(null);
  const [treeData, setTreeData] = useState<NodeModel[]>(data);
  const [isUpdating, setIsUpdating] = useState(false);
  const handleDrop = useCallback((newTree: NodeModel[]) => {
    setTreeData(newTree);
    setIsUpdating(true);
  }, []);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  useEffect(() => {
    if (isUpdating) {
      const updateTree = async () => {
        await updateMenuView(treeData, menuId);
        setIsUpdating(false);
      };
      updateTree();
    }
  }, [treeData, isUpdating]);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        ref={ref}
        tree={treeData}
        rootId={0}
        sort={false}
        insertDroppableFirst={true}
        dropTargetOffset={10}
        canDrop={(tree, { dragSource, dropTargetId }) => {
          if (dragSource?.parent === dropTargetId) {
            return true;
          }
        }}
        initialOpen={true}
        render={(node, options) => (
          <CustomNode setTreeData={setTreeData} menuId={menuId} node={node} {...options} />
        )}
        dragPreviewRender={(monitorProps) => <CustomDragPreview monitorProps={monitorProps} />}
        placeholderRender={(node, { depth }) => <Placeholder node={node} depth={depth} />}
        onDrop={handleDrop}
        classes={{
          root: styles.treeRoot,
          draggingSource: styles.draggingSource,
          placeholder: styles.placeholderContainer,
        }}
      />
    </DndProvider>
  );
}
