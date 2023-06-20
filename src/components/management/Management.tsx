import './Management.css';
import Services from './services';
import RequestModal from './requestModal';
import Forms from './forms';

type ManagementProps = {
  className?: string;
};

function Management({ className }: ManagementProps) {
  return (
    <div className={['Management', className].join(' ')}>
      <div className="row">
        <div className="col-12">
          <RequestModal />
          <Services />
          <Forms className="mt-5" />
        </div>
      </div>
    </div>
  );
}

export default Management;
