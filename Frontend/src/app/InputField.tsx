import React, { ChangeEvent } from 'react';
import Input from "@/shared/Input/Input"; // Pastikan impor ini sesuai dengan lokasi komponen Input Anda

// Definisikan interface untuk properti yang diharapkan oleh InputField
interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Tipe untuk fungsi onChange
}

// Gunakan interface di atas sebagai tipe untuk props dalam fungsi komponen Anda
function InputField({ label, type, name, value, onChange }: InputFieldProps) {
  return (
    <label className="block">
      <span className="text-neutral-800 dark:text-neutral-200">{label}</span>
      <Input
        required
        type={type}
        name={name}
        placeholder={`Enter your ${label}*`}
        className="mt-1"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default InputField;
