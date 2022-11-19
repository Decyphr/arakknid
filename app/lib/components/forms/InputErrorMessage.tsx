type ErrorMessageProps = {
  message: string;
};

export default function InputErrorMessage({ message }: ErrorMessageProps) {
  return <span className="pt-1 text-xs text-red-700">{message}</span>;
}
