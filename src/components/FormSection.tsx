import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default FormSection;
