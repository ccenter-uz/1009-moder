import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

export type MODEL_FORM_INCOME = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}
