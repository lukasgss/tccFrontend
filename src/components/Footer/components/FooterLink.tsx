import { Link } from "react-router-dom";

interface FooterLinkProps {
  to: string;
  label: string;
}

export default function FooterLink({ to, label }: Readonly<FooterLinkProps>) {
  return (
    <Link to={to} className="text-white w-fit upprcase tracking-wider hover:underline">
      {label}
    </Link>
  );
}
