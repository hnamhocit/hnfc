import { SearchIcon } from "lucide-react";

interface EmptyProps {
  title: string;
  description: string;
}

export default function Empty({ title, description }: EmptyProps) {
  return (
    <div className="text-center py-20">
      <div className="bg-slate-100 p-4 rounded-full w-fit mx-auto mb-4 text-slate-400">
        <SearchIcon size={32} />
      </div>

      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>

      <p className="text-slate-500">{description}</p>
    </div>
  );
}
