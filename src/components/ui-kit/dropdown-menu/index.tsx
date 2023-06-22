'use client';
import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ChevronRight, Library } from 'lucide-react';
import { Dictionary, capitalize, groupBy } from 'lodash';
import './styles.css';

export type DropdownItem = {
  id: string;
  name: string;
  group: string;
};

export type DropdownProps = {
  onClick: (service: DropdownItem) => void;
  items: Dictionary<DropdownItem[]>;
};

type DropdownGroupProps = {
  name: string;
  onClick: (service: DropdownItem) => void;
  items: DropdownItem[];
};

function Dropdown({ items, onClick }: DropdownProps) {
  const [mousePointer, setMousePointer] = React.useState('');

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <span 
          onMouseEnter={() => setMousePointer('puzzle')}
          onMouseLeave={() => setMousePointer('')}
        >
          <Library width={24} strokeWidth={1} />
          <ChevronDown width={15} className={[mousePointer === 'puzzle' ? 'mt-2' : 'mt-1'].join(' ')} />
        </span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropdownMenuContent" 
          sideOffset={5}
          style={{zIndex: 10}}
        > 
          {Object.keys(items).map((group) => (
            <DrowpdownSubMenu 
              key={group}
              name={group}
              items={items[group]}
              onClick={onClick}
            />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

function DrowpdownSubMenu({name, onClick, items}: DropdownGroupProps) {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
        {capitalize(name)}
        <div className="RightSlot">
          <ChevronRight width={20} />
        </div>
      </DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          className="DropdownMenuSubContent"
          sideOffset={2}
          alignOffset={-5}
          style={{zIndex: 9}}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              className="DropdownMenuItem"
              key={item.id}
              onClick={() => onClick(item)}
            >
              {item.name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  )
};


export default Dropdown;