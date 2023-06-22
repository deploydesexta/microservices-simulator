'use client';
import './Management.css';
import Services from './services';
import RequestModal from './requestModal';

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
        </div>
      </div>
    </div>
  );
}

export default Management;
