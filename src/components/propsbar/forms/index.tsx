import useStateManager from "@/sketch/useStateManager";
import { Application } from "@/sketch/models/application";
import { Database } from "@/sketch/models/Database";
import { Job } from "@/sketch/models/Job";
import ApplicationForm from "./ApplicationForm";
import DatabaseForm from "./DatabaseForm";
import JobForm from "./JobForm";
import NodeForm from "./NodeForm";
import { Connection } from "@/sketch/models/Connection";
import ConnectionForm from "./ConnectionForm";
import { Node } from "@/sketch/models/Node";

type FormsProps = {
  className?: string;
};

const Forms = ({ className }: FormsProps) => {
  const { state: target } = useStateManager();

  let connection = false;
  let form = null;
  if (target instanceof Application) {
    form =   <ApplicationForm node={target} />
  } else if (target instanceof Database) {
    form = <DatabaseForm node={target} />
  } else if (target instanceof Job) {
    form = <JobForm node={target} />
  } else if (target instanceof Connection) {
    connection = true
    form = <ConnectionForm connection={target} />
  }

  return (
    <div className={className}>
      { target && !connection && <NodeForm node={target as Node} /> }
      { form }
    </div>
  )
}

export default Forms;