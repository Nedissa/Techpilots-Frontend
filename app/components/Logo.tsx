import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="TechPilots"
      width={36}
      height={36}
      className="flex-shrink-0"
      priority
    />
  );
}
