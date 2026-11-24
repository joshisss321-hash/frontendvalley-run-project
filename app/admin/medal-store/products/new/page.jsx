'use client';

import Shell from '../../Shell';
import MedalForm from '../MedalForm';

export default function NewMedal() {
  return (
    <Shell title="New medal" subtitle="Medal Store" back="/admin/medal-store/products">
      <MedalForm />
    </Shell>
  );
}
