import { Form } from "@remix-run/react";

type LogoutProps = {
  className?: string;
  buttonLabel?: string;
};

export default function LogoutButton({
  buttonLabel = "Logout",
  className = "",
}: LogoutProps) {
  return (
    <Form action="/logout" method="post">
      <button className={className} type="submit">
        {buttonLabel}
      </button>
    </Form>
  );
}
