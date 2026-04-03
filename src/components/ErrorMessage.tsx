type ErrorMessageProps = {
  message: string
}
export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="error">
      <span>⛔️</span>
      {message}
    </p>
  )
}
