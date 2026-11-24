'use client';

import { useParams } from 'next/navigation';
import Shell from '../../Shell';
import MedalForm from '../MedalForm';

export default function EditMedal() {
  const { id } = useParams();
  return (
    <Shell title="Edit medal" subtitle="Medal Store" back="/admin/medal-store/products">
      <MedalForm medalId={id} />
    </Shell>
  );
}
