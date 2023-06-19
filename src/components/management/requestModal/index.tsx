import { useState } from "react";
import useStore from "../../../store";
import Select from "../../ui-kit/select/simple";
import useEvents from "../../../store/event-emitter";

const RequestModal = () => {
  const { emit } = useEvents();
  const [target, setTarget] = useState<string>('');

  const { selectedNode, requestModalVisible, toggleRequestModal } = useStore(state => ({
    selectedNode: state.selectedNode,
    requestModalVisible: state.requestModalVisible,
    toggleRequestModal: state.toggleRequestModal,
  }));

  if (!requestModalVisible || !selectedNode) {
    console.log(requestModalVisible, selectedNode)
    return null;
  }

  const opstions = 
    selectedNode.incoming.map(({ id }) => ({ value: id, label: id }))

  const onSend = () => {
    console.log('send', target);
    emit('send_request', { from: selectedNode.id, to: target })
  };

  const onClose = () => toggleRequestModal();

  return (
    <div className="modal" style={{display: 'block'}} role="dialog">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <h5>Request</h5>
            
            <p>Target</p>
            <Select
              options={opstions}
              label="Target"
              onChange={setTarget}
              value={target}
              name="target"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onSend}>Send</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
