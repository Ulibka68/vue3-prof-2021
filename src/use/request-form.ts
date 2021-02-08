import { SubmissionHandler, useField, useForm } from "vee-validate";
import * as yup from "yup";

export interface tRequsetFormValues {
  amount: number;
  fio: string;
  phone: string;
  status: string;
}

export function useRequestForm(fn: SubmissionHandler<tRequsetFormValues>) {
  const { isSubmitting, handleSubmit } = useForm<tRequsetFormValues>({
    initialValues: { status: "active", amount: 0, fio: "", phone: "" },
  });
  const { value: fio, errorMessage: fError, handleBlur: fBlur } = useField(
    "fio",
    yup.string().trim().required()
  );
  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    "phone",
    yup.string().trim().required()
  );
  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    "amount",
    yup.number().required("Введите сумму").min(0, "Сумма не может быть 0")
  );
  const { value: status } = useField("status");

  /*
    const onSubmit = () => {
        console.log("onSubmit - handleSubmit(fn)");
        // fn(); - вот так функция вызывается
        if (typeof fn === "function") console.log("typeof fn === 'function' -> true");
        handleSubmit(fn);
    };

     */
  const onSubmit = handleSubmit(fn);

  return {
    status,
    isSubmitting,
    onSubmit,
    fio,
    phone,
    amount,
    fBlur,
    fError,
    pError,
    pBlur,
    aError,
    aBlur,
  };
}
