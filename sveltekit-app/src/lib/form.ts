export function enhance(
  form: HTMLFormElement,
  {
    pending,
    error,
    result,
  }: {
    pending?: (data: FormData, form: HTMLFormElement) => void;
    error?: (
      res: Response | null,
      error: Error | null,
      form: HTMLFormElement
    ) => void;
    result: (res: Response, form: HTMLFormElement) => void;
  }
): { destroy: () => void } {
  let currentToken;

  const handleSubmit = async (e: Event) => {
    const token = (currentToken = {});

    e.preventDefault();

    const body = new FormData(form);

    if (pending) pending(body, form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        headers: {
          accept: "application/json",
        },
        body,
      });

      if (token !== currentToken) return;

      if (res.ok) {
        result(res, form);
      } else if (error) {
        error(res, null, form);
      } else {
        console.error(await res.text());
      }
    } catch (e) {
      if (error) {
        error(null, e, form);
      } else {
        throw e;
      }
    }
  };

  form.addEventListener("submit", handleSubmit);

  return {
    destroy: () => {
      form.removeEventListener("submit", handleSubmit);
    },
  };
}
