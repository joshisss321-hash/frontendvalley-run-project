'use client';

import { useParams } from 'next/navigation';
import StoreShell from '../../StoreShell';
import ProductForm from '../ProductForm';

export default function EditProduct() {
  const { id } = useParams();

  return (
    <StoreShell title="Product badliye" subtitle="Valley Store" back="/admin/store/products">
      <ProductForm productId={id} />
    </StoreShell>
  );
}
