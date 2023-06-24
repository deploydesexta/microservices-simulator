import useStateManager from "@/sketch/useStateManager";
import { Application } from "@/sketch/models/application";
import { Database } from "@/sketch/models/Database";
import { Job } from "@/sketch/models/Job";
import ApplicationForm from "./ApplicationForm";
import DatabaseForm from "./DatabaseForm";
import JobForm from "./JobForm";
import NodeForm from "./NodeForm";

type FormsProps = {
  className?: string;
};

const Forms = ({ className }: FormsProps) => {
  const { state: target } = useStateManager();

  let form = null;
  if (target instanceof Application) {
    form = <ApplicationForm node={target as Application} />
  } else if (target instanceof Database) {
    form = <DatabaseForm node={target as Database} />
  } else if (target instanceof Job) {
    form = <JobForm node={target as Job} />
  }

  return (
    <div className={className}>
      { target && <NodeForm node={target as Application} /> }
      { form }
    </div>
  )
}

export default Forms;