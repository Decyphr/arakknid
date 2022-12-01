type TicketCardProps = {
  summary: string;
};

export default function TicketCard({ summary }: TicketCardProps) {
  return (
    <div className="cursor-pointer rounded border-2 border-transparent bg-white p-5 shadow transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-50">
      <h2 className="mb-2 text-2xl font-black">{summary}</h2>
    </div>
  );
}
