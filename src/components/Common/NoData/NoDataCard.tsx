import NoData from "./NoData";

interface NoDataCardProps {
  title?: string;
  message?: string;
}

export default function NoDataCard({ title, message }: Readonly<NoDataCardProps>) {
  return (
    <div className="border border-gray-200 bg-white shadow p-8 rounded">
      <NoData title={title} message={message} />
    </div>
  );
}
