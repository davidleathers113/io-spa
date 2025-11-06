

import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../features/io/schema';

type FileInputProps = {
  name: 'buyer_w9' | 'attachments';
  label: string;
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
  accept?: string;
  multiple?: boolean;
  helperText?: string;
  maxSizeMb?: number; // client hint only
};

const FileInput: React.FC<FileInputProps> = ({
  name,
  label,
  register,
  errors,
  accept,
  multiple,
  helperText,
  maxSizeMb = 10,
}) => {
  const fieldError = (errors as any)[name]?.message as string | undefined;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        type="file"
        accept={accept}
        multiple={multiple}
        // RHF: map FileList to value
        {...register(name as any)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        aria-describedby={`${name}-desc`}
      />
      <p id={`${name}-desc`} className="mt-1 text-xs text-gray-500">
        {helperText ?? `Max ${maxSizeMb}MB. ${multiple ? 'Multiple files allowed.' : 'Single file.'}`}
      </p>
      {fieldError && <p className="mt-1 text-sm text-red-600">{fieldError}</p>}
    </div>
  );
};

export default FileInput;
