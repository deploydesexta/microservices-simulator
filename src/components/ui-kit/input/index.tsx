import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<FormData extends FieldValues> = {
  className?: string;
  errors: FieldErrors<FormData>;
  label: string | React.ReactNode;
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  type?: string;
  onChange?: (attr: string, value: any) => void;
};

// The following component is an example of your existing Input Component
const Input = <FormData extends FieldValues>(
  { className = '', errors, label, name, onChange, register, type = 'text' }: InputProps<FormData>
) => (
  <div className="mb-3 row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-9">
      <input 
        type={type}
        className={`${className} form-control`}
        
        {...register(name, {
          onChange: (e) => onChange && onChange(name, e.target.value)
        })}
      />
      {errors[name] && <span>{errors[name]?.message?.toString()}</span>}
    </div>
  </div>
);

export default Input;
