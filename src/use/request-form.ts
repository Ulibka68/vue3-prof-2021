import { SubmissionHandler, useField, useForm } from "vee-validate";
import * as yup from "yup";
import { ComputedRef, Ref, WritableComputedRef } from "vue";

export type tRequsetFormValues = {
  amount: number;
  fio: string;
  phone: string;
  status: string;
};

type SubmitEvent = Event & {
  target: HTMLFormElement;
};

type WritableRef<TValue> = Ref<TValue> | WritableComputedRef<TValue>;

export function useRequestForm(
  fn: SubmissionHandler<tRequsetFormValues>
): {
  status: WritableRef<unknown>;
  isSubmitting: Ref<boolean>;
  onSubmit: (e?: SubmitEvent) => Promise<void>;
  fio: WritableRef<unknown>;
  phone: WritableRef<unknown>;
  amount: WritableRef<unknown>;
  fBlur: (e?: Event) => void;
  fError: ComputedRef<string | undefined>;
  pError: ComputedRef<string | undefined>;
  pBlur: (e?: Event) => void;
  aError: ComputedRef<string | undefined>;
  aBlur: (e?: Event) => void;
} {
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
