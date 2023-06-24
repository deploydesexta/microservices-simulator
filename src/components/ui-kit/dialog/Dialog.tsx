'use client'
import React from 'react';
import * as RxDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';
import useStore from '@/store';

const Dialog = () => {
  const visible = useStore(state => state.helpModalVisible)
  const toggle = useStore(state => state.toggleHelpModal)

  return (
    <RxDialog.Root open={visible}>
      <RxDialog.Portal>
        <RxDialog.Overlay className="DialogOverlay" />
        <RxDialog.Content className="DialogContent">
          <RxDialog.Title className="DialogTitle">Help</RxDialog.Title>
          
          <RxDialog.Description className="DialogDescription">
            To connect two nodes, click on the first node, then holds the shift or control or alt click and then drag to the second node.
          </RxDialog.Description>
          
          <RxDialog.Close asChild>
            <button className="IconButton" aria-label="Close" onClick={toggle}>
              <Cross2Icon />
            </button>
          </RxDialog.Close>
        </RxDialog.Content>
      </RxDialog.Portal>
    </RxDialog.Root>
  )
}

export default Dialog;