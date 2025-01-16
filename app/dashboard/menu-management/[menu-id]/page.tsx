'use client';

import { useRef, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PiForkKnife, PiGear, PiInfo, PiMonitorArrowUp, PiUploadSimple } from 'react-icons/pi';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
  DndProvider,
  TreeMethods,
} from '@minoru/react-dnd-treeview';
import styles from './page.module.css';

import { CustomDragPreview } from '@/components/dashboard/menu/dragndrop/CustomDragPreview';
import { Placeholder } from '@/components/dashboard/menu/dragndrop/Placeholder';
import { CustomNode } from '@/components/dashboard/menu/dragndrop/CustomNode';

import SampleData from '@/components/dashboard/menu/dragndrop/sample_data.json';
import { FaBatteryFull, FaSignal, FaWifi } from 'react-icons/fa';
import CreateCategory from '@/components/dashboard/menu/menu-forms/create-category';
import CreateItem from '@/components/dashboard/menu/menu-forms/create-item';
import { Input } from '@/components/ui/input';
import { Check, Minus } from 'lucide-react';
import Image from 'next/image';

const themeItems = [
  { value: '1', label: 'Light', image: '/light-theme.png' },
  { value: '2', label: 'Dark', image: '/dark-theme.png' },
];

export default function MenuEditor() {
  const ref = useRef<TreeMethods>(null);
  const [treeData, setTreeData] = useState<NodeModel[]>(SampleData);
  const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Standart Menü</h2>
          {/* <h3 className="text-lg font-medium text-stone-600 leading-tight">Standart Menü</h3> */}
        </div>
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <Tabs defaultValue="menucontent">
            <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
              <TabsTrigger
                value="menucontent"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiForkKnife className="mr-1" /> Menü İçeriği
              </TabsTrigger>
              <TabsTrigger
                value="menusettings"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiGear className="mr-1" /> Menü Ayarları
              </TabsTrigger>
            </TabsList>
            <TabsContent value="menucontent">
              <section className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                <div className="flex justify-end gap-2">
                  <CreateCategory />
                  <CreateItem />
                </div>
                <div className="mt-6">
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
                        <CustomNode setTreeData={setTreeData} node={node} {...options} />
                      )}
                      dragPreviewRender={(monitorProps) => (
                        <CustomDragPreview monitorProps={monitorProps} />
                      )}
                      placeholderRender={(node, { depth }) => (
                        <Placeholder node={node} depth={depth} />
                      )}
                      onDrop={handleDrop}
                      classes={{
                        root: styles.treeRoot,
                        draggingSource: styles.draggingSource,
                        placeholder: styles.placeholderContainer,
                      }}
                    />
                  </DndProvider>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="menusettings">
              <section className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                <form className="space-y-5 mt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="menuname" className="text-[15px]">
                      Menü Adı
                    </Label>
                    <Input
                      id={'menuname'}
                      type="text"
                      value="Daniel Gallego's"
                      placeholder="Daniel Gallego's..."
                    />
                  </div>
                  <fieldset className="space-y-4">
                    <legend className="text-[15px] font-medium leading-none text-foreground">
                      Menü Teması seçin
                    </legend>
                    <RadioGroup className="flex gap-3" defaultValue="1">
                      {themeItems.map((item) => (
                        <label key={`${item.value}`}>
                          <RadioGroupItem
                            id={`${item.value}`}
                            value={item.value}
                            className="peer sr-only after:absolute after:inset-0"
                          />
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={100}
                            height={82}
                            className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
                          />
                          <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                            <Check
                              size={16}
                              strokeWidth={2}
                              className="peer-data-[state=unchecked]:group-[]:hidden"
                              aria-hidden="true"
                            />
                            <Minus
                              size={16}
                              strokeWidth={2}
                              className="peer-data-[state=checked]:group-[]:hidden"
                              aria-hidden="true"
                            />
                            <span className="text-[15px] font-semibold">{item.label}</span>
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                  <div className="space-y-0.5">
                    <Label htmlFor="menubg" className="text-[15px]">
                      Açılış Arkaplan Resmi
                    </Label>
                    <input type="file" className="hidden" />
                    <div className="border border-dashed rounded-lg cursor-pointer px-[3px] border-stone-300 w-[140px] h-[124px] flex items-center justify-center flex-col">
                      <PiUploadSimple className="text-orange-700 size-6 mb-2" />
                      <h3 className="font-medium">Yükle</h3>
                      <span className="text-stone-400 text-xs text-center">
                        Sadece .jpg .jpeg ve .png dosya uzantıları
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                      <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB
                      ve altıdır.
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <Label htmlFor="menubg" className="text-[15px]">
                      Açılış Videosu
                    </Label>
                    <input type="file" className="hidden" />
                    <div className="border border-dashed rounded-lg cursor-pointer px-[3px] border-stone-300 w-[140px] h-[124px] flex items-center justify-center flex-col">
                      <PiMonitorArrowUp className="text-orange-700 size-6 mb-2" />
                      <h3 className="font-medium">Yükle</h3>
                      <span className="text-stone-400 text-xs text-center">
                        Sadece .mp4 dosya uzantıları
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                      <PiInfo /> 9:16 video ölçüsü önerilir. Video yüklenmediyse menü açılışında
                      arkaplan resmi gösterilir
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <Label htmlFor="menubg" className="text-[15px]">
                      Açılış Arkaplan Logosu
                    </Label>
                    <input type="file" className="hidden" />
                    <div className="border border-dashed rounded-lg cursor-pointer px-[3px] border-stone-300 w-[140px] h-[124px] flex items-center justify-center flex-col">
                      <PiMonitorArrowUp className="text-orange-700 size-6 mb-2" />
                      <h3 className="font-medium">Yükle</h3>
                      <span className="text-stone-400 text-xs text-center">
                        Sadece .jpg .jpeg ve .png dosya uzantıları
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 pt-2 flex items-center gap-1"></div>
                  </div>
                </form>
              </section>
            </TabsContent>
          </Tabs>
        </section>
        <aside>
          <div className="sticky mt-8 top-[120px] flex h-[calc(100vh-235px)] max-h-[525px] w-[265px] flex-col overflow-hidden rounded-[36px] border-[10px] border-black bg-white text-gray-900">
            <div className="flex h-[24px] w-full items-start justify-center px-2">
              <div className="flex flex-1 items-center justify-center text-xs font-semibold pt-0.5">
                21:59
              </div>
              <div className="h-[18px] w-[112px] rounded-b-[16px] bg-black relative">
                <div className="absolute rounded-lg w-10 h-0.5 bg-stone-800 top-1.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute rounded-full size-0.5 bg-blue-700 top-[5px] left-20"></div>
              </div>
              <div className="flex-1 flex items-center gap-1 pt-0.5">
                <FaSignal className="size-3 ml-1" />
                <FaWifi className="size-3" />
                <FaBatteryFull className="size-3.5" />
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="flex flex-col items-center border-t border-gray-100 bg-stone-50 px-5 pb-1 pt-4">
              <div className="h-[3px] w-[90px] rounded-lg bg-stone-900"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
