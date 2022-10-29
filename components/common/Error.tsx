import React from "react";

export default function Error({ error }: { error: string }) {
  return (
    <div className="flex justify-center items-center">
      <p className="text-red-600">{error}</p>
    </div>
  );
}
