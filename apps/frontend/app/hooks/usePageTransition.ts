import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function usePageTransition() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const navigate = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return { isPending, navigate };
}
