import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function Header({ title, description, children }: HeaderProps) {
  return (
    <header className="mb-4 flex items-center justify-between border-b border-slate-700 pb-4 lg:mb-8 lg:pb-8">
      <div>
        <h1 className="text-5xl font-black capitalize text-slate-900">
          {title}
        </h1>
        {description ? (
          <p className="text-slate-500">
            <em>{description}</em>
          </p>
        ) : null}
      </div>
      {children}
    </header>
  );
}
