'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    router.replace(`/AddExercice/${id}/Exercise`);
  }, [id, router]);

  return null;
}
