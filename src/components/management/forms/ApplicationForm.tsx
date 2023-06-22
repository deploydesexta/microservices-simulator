import {nanoid} from 'nanoid';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../../ui-kit/input';
import Button from '../../ui-kit/button';
import { Application } from '../../../sketch/Application';
import useEvents from '../../../store/event-emitter';
import useStore from '../../../store';

const Schema = z.object({
  id: z.string(),
  label: z.string()
    .nonempty('A label is required'),
});

type FormData = z.infer<typeof Schema>

type ApplicationFormProps = {
  node?: Application;
}

const ApplicationForm = ({ node }: ApplicationFormProps) => {
  const initialValue = {
    id: node?.id || nanoid(3),
    label: node?.label() || '',
  };

  const { emit } = useEvents();
  const toggleRequestModal = useStore(state => state.toggleRequestModal);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values: initialValue,
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    emit('set_application', { ...data });
  };

  const onSendRequest = () => {
    emit('send_request', { from: initialValue.id })
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
      <div className="d-grid gap-2 col-12 py-3">
        <Button
          className="btn btn-secondary btn-sm"
          onClick={() => onSendRequest()}
          type="button"
        >
          Send request
        </Button>
        <Button
          className="btn btn-secondary btn-sm"
          onClick={() => toggleRequestModal()}
          type="button"
        >
          Send request to
        </Button>
        <Button
          className="btn btn-primary btn-sm"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;