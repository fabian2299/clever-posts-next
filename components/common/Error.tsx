
export default function Error({ error }: { error: string }) {
  return (
    <div className="error">
      <p>{error}</p>
    </div>
  );
}
