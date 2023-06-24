import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/ui-kit/input';
import Button from '@/components/ui-kit/button';
import { Job } from '@/sketch/models/Job';
import useStateManager from '@/sketch/useStateManager';
import { AlarmClock, Tag } from 'lucide-react';

const Schema = z.object({
  id: z.string(),
  label: z.string().nonempty('A label is required'),
  delay: z.number().nonnegative('A positive delay is required'),
});

type FormData = z.infer<typeof Schema>

type JobFormProps = {
  node: Job;
}

const JobForm = ({ node }: JobFormProps) => {
  const initialValue = {
    id: node.id,
    label: node.label,
    delay: node.delay,
  };
  
  const { updateNode, startJob, stopJob } = useStateManager();

  const { register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values: initialValue,
  })

  const onChange = (attr: string, value: any) => 
    updateNode({ id: node.id, [attr]: value });

  const onStop = () => stopJob({ id: node.id })
  const onStart = () => startJob({ id: node.id })

  return (
    <form
      className={'form'}
      data-testid="login-form"
    >
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <Input
            label={<AlarmClock size={16} />}
            name="delay"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-12">
          <Input
            className="mb-3"
            label={<Tag size={16} />}
            name="label"
            errors={errors}
            register={register}
          />
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <Button className="btn btn-primary btn-sm" type="button" onClick={onStop}>Stop</Button>
        <Button className="btn btn-primary btn-sm" type="button" onClick={onStart}>Start</Button>
      </div>
    </form>
  );
};

export default JobForm;