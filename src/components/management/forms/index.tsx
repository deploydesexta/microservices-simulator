import { Application } from "../../../sketch/Application";
import { Database } from "../../../sketch/Database";
import { Job } from "../../../sketch/Job";
import useStore from "../../../store";
import ApplicationForm from "./ApplicationForm";
import DatabaseForm from "./DatabaseForm";
import JobForm from "./JobForm";

type FormsProps = {
  className?: string;
};

const Forms = ({ className }: FormsProps) => {
  const selectedNode = useStore(state => state.selectedNode);
  
  let form = null;
  if (selectedNode instanceof Application) {
    form = <ApplicationForm node={selectedNode as Application} />
  } else if (selectedNode instanceof Database) {
    form = <DatabaseForm node={selectedNode as Database} />
  } else if (selectedNode instanceof Job) {
    form = <JobForm node={selectedNode as Job} />
  }

  return (
    <div className={className}>
      { form }
    </div>
  )
}

export default Forms;