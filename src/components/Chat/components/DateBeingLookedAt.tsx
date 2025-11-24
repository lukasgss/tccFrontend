interface DateBeingLookedAtProps {
  date: string | null;
}

export default function DateBeingLookedAt({ date }: Readonly<DateBeingLookedAtProps>) {
  if (date === null) {
    return null;
  }

  return <div className="sticky top-10 z-40 bg-orange-200 h-6 w-fit left-32 rounded px-3">{date}</div>;
}
