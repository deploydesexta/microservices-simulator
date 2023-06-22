import {nanoid} from 'nanoid';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../../ui-kit/input';
import Button from '../../ui-kit/button';
import useEvents from '../../../store/event-emitter';
import { Job } from '../../../sketch/Job';

const Schema = z.object({
  id: z.string(),
  label: z.string()
    .nonempty('A label is required'),
});

type FormData = z.infer<typeof Schema>

type JobFormProps = {
  node?: Job;
}

const JobForm = ({ node }: JobFormProps) => {
  const initialValue = {
    id: node?.id || nanoid(3),
    label: node?.label() || '',
  };
  
  const { emit } = useEvents();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values: initialValue,
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    emit('set_job', { ...data });
  };

  const onStop = async () => {
    emit('stop_job', { ...initialValue });
  };

  const onStart = async () => {
    emit('start_job', { ...initialValue });
  };

  return (
    <form
      className={'form'}
      data-testid="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="text-center">Editting {initialValue.label}</h5>
      <Input
        className="mb-3"
        label="Label"
        name="label"
        errors={errors}
        register={register}
      />
      <div className="d-grid gap-2 d-md-flex justify-content-md-center py-3">
        <Button className="btn btn-default btn-sm" type="button" onClick={onStop}>Stop</Button>
        <Button className="btn btn-default btn-sm" type="button" onClick={onStart}>Start</Button>
        <Button className="btn btn-primary btn-sm" type="submit">Save</Button>
      </div>
    </form>
  );
};

export default JobForm;