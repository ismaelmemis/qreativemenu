'use client';

import React, { RefObject, useEffect, useState } from 'react';

import Image from 'next/image';

import type { NodeModel } from '@minoru/react-dnd-treeview';
import styles from './CustomNode.module.css';

import { RxDragHandleDots2 } from 'react-icons/rx';
import { IoIosArrowDown } from 'react-icons/io';
import { ChefHat } from 'lucide-react';
import { updateMenuCategory } from '@/actions/menu';
import DeleteItem from '../menu-forms/delete-item';
import DeleteCategory from '../menu-forms/deleteCategory';
import { EditCategory } from '../menu-forms/edit-category';
import EditItem from '../menu-forms/edit-item';

type CustomNodeData = {
  image: string;
};

type Props = {
  node: NodeModel<CustomNodeData>;
  depth: number;
  isOpen: boolean;
  testIdPrefix?: string;
  handleRef: RefObject<HTMLDivElement>;
  onToggle: (id: NodeModel['id']) => void;
  setTreeData: unknown;
  menuId: string;
};

export const CustomNode: React.FC<Props> = ({ testIdPrefix = '', ...props }) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const { id, text, data } = props.node;
  const indent = props.depth * 24;

  async function updateParentCategory() {
    updateMenuCategory(id.toString(), props.node.parent.toString());
  }

  useEffect(() => {
    if (props.node.parent !== 0) {
      updateParentCategory();
    }
  }, [props.node.parent]);

  return (
    <div
      className={`${styles.root} `}
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${id}`}
    >
      <div className="flex justify-between bg-white border border-stone-200/85 shadow-sm px-2 py-2 rounded-md mb-1.5 items-center w-full">
        <div className="flex items-center">
          <div
            className={`${styles.handle} drag-handle ml-2`}
            ref={props.handleRef}
            data-testid={`drag-handle-${props.node.id}`}
          >
            <RxDragHandleDots2 className="text-zinc-500" />
          </div>
          <div className="size-11 2xl:size-12 ml-3 rounded-md bg-orange-600/20 flex items-center justify-center mr-3 relative">
            {data?.image ? (
              <Image
                src={`/api/uploads/${data?.image}`}
                alt={text}
                fill
                className="size-11 2xl:size-12 object-cover rounded-md"
              />
            ) : (
              <ChefHat className="size-5 text-orange-700" />
            )}
          </div>
          <div className="mr-3">
            <h2 className="font-medium text-stone-600">{props.node.text}</h2>
          </div>
          <div className="size-1.5 bg-green-400 rounded"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-2">
            {/* <Switch className=" h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2 data-[state=checked]:bg-green-400" /> */}
          </div>
          <div className="cursor-pointer">
            {props.node.droppable ? (
              <EditCategory menuId={props.menuId} node={props.node} />
            ) : (
              <EditItem menuId={props.menuId} node={props.node} />
            )}
          </div>
          <div className="cursor-pointer">
            {props.node.droppable ? (
              <DeleteCategory itemId={props.node.id.toString()} menuId={props.menuId} />
            ) : (
              <DeleteItem itemId={props.node.id.toString()} menuId={props.menuId} />
            )}
          </div>
          <div className={`${styles.expand} ${props.isOpen ? styles.isOpen : ''} mr-2`}>
            {props.node.droppable && (
              <div onClick={handleToggle} className="">
                <IoIosArrowDown className="text-stone-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
