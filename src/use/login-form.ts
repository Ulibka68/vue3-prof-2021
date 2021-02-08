import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { computed, watch } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export function useLoginForm() {
  const { handleSubmit, isSubmitting, submitCount } = useForm();
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
      await store.dispatch("auth/login", values);
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
