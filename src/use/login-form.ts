import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { computed, ComputedRef, Ref, watch, WritableComputedRef } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

type SubmitEvent = Event & {
  target: HTMLFormElement;
};

type WritableRef<TValue> = Ref<TValue> | WritableComputedRef<TValue>;

export function useLoginForm(): {
  email: WritableRef<unknown>;
  password: WritableRef<unknown>;
  eErorr: ComputedRef<string | undefined>;
  eBlur: (e?: Event) => void;
  pError: ComputedRef<string | undefined>;
  pBlur: (e?: Event) => void;
  onSubmit: (e?: SubmitEvent) => Promise<void>;
  isSubmitting: Ref<boolean>;
  isTooManyAttempts: ComputedRef<boolean>;
} {
  const { handleSubmit, isSubmitting, submitCount } = useForm<{
    email: string;
  }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = useStore();
  const router = useRouter();

  const { value: email, errorMessage: eErorr, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Пожалуйста введите email")
      .email("Введите корректный адрес электронной почты")
  );
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required()
      .min(2, "Пароль не может быть менее 2 символов")
  );

  const isTooManyAttempts = computed(() => submitCount.value >= 3);

  watch(isTooManyAttempts, (val: boolean) => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0;
      }, 1500);
    }
  });

  // eslint-disable-next-line no-unused-vars
  const onSubmit = handleSubmit(async (values) => {
    try {
      // await store.dispatch("auth/login", values);
      console.log(values);
      // await loginUserByEmail()
      router.push("/");
      // eslint-disable-next-line no-empty
    } catch (e) {}
  });

  return {
    email,
    password,
    eErorr,
    eBlur,
    pError,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  };
}
