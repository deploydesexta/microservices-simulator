import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = {
  label: string;
  value: string;
}

type SelectProps<FormData extends FieldValues> = {
  className?: string;
  errors: FieldErrors<FormData>;
  label: string;
  name: Path<FormData>;
  options: Option[];
  register: UseFormRegister<FormData>;
};

// The following component is an example of your existing Select Component
const Select = <FormData extends FieldValues>(
  { className = '', errors, label, name, options, register }: SelectProps<FormData>
) => (
  <div className="form-group">
    <label>{label}</label>

    <select
      className={['form-select', className].join(' ')}
      {...register(name)}
    >
      <option selected>Select...</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
    
    {errors[name] && <span>{errors[name]?.message?.toString()}</span>}
  </div>
);

export default Select;
