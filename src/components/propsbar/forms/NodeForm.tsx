import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/ui-kit/input';
import useStateManager from '@/sketch/useStateManager';
import { Node } from '@/sketch/models/Node';

const Schema = z.object({
  id: z.string(),
  x: z.number().nonnegative('X must be a positive number'),
  y: z.number().nonnegative('Y must be a positive number'),
  width: z.number().nonnegative('Width must be a positive number'),
  height: z.number().nonnegative('Height must be a positive number'),
});

type FormData = z.infer<typeof Schema>

type NodeFormProps = {
  node: Node;
}

const NodeForm = ({ node }: NodeFormProps) => {
  const values = {
    id: node.id,
    x: Math.round(node.x),
    y: Math.round(node.y),
    width: Math.round(node.width),
    height: Math.round(node.height),
  };

  const { updateNode } = useStateManager();

  const { register, formState: { errors, ...rest } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values,
    mode: "onChange",
  })

  const onChange = (attr: string, value: any) => {
    updateNode({ id: node.id, [attr]: value });
  };

  return (
    <form
      className={'form'}
      data-testid="login-form"
    >
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Input
            label="X"
            name="x"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <Input
            label="Y"
            name="y"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Input
            label="W"
            name="width"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <Input
            label="H"
            name="height"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
      </div>
    </form>
  );
};

export default NodeForm;