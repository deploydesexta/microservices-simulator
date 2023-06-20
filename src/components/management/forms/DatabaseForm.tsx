import {nanoid} from 'nanoid';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../../ui-kit/input';
import Button from '../../ui-kit/button';
import { Application } from '../../../sketch/Application';
import useEvents from '../../../store/event-emitter';

const Schema = z.object({
  id: z.string(),
  label: z.string()
    .nonempty('A label is required'),
});

type FormData = z.infer<typeof Schema>

type DatabaseFormProps = {
  node?: Application;
}

const DatabaseForm = ({ node }: DatabaseFormProps) => {
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
    emit('set_database', { ...data });
  };

  return (
    <form
      className={'form'}
      data-testid="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5>Editting {initialValue.label}</h5>
      <Input
        className="mb-3"
        label="Label"
        name="label"
        errors={errors}
        register={register}
      />
      <div className="d-grid gap-2 d-md-flex justify-content-md-center py-3">
        <Button className="btn btn-primary btn-sm" type="submit">Save</Button>
      </div>
    </form>
  );
};

export default DatabaseForm;