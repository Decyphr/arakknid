import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function Header({ title, description, children }: HeaderProps) {
  return (
    <>
      <header className="mb-4 flex items-center justify-between lg:mb-8">
        <div>
          <h1 className="text-5xl font-black capitalize text-white">{title}</h1>
          {description ? (
            <p className="text-slate-100">
              <em>{description}</em>
            </p>
          ) : null}
        </div>
        {children}
      </header>
      <div className="mb-4 h-1 w-full bg-gradient-to-r from-indigo-400 to-red-400 lg:mb-8"></div>
    </>
  );
}
