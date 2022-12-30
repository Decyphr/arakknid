type TicketCardProps = {
  summary: string;
};

export default function TicketCard({ summary }: TicketCardProps) {
  return (
    <div className="cursor-pointer rounded border border-white p-5 shadow transition hover:bg-white hover:text-black">
      <h2 className="mb-2 text-lg font-bold">{summary}</h2>
    </div>
  );
}
