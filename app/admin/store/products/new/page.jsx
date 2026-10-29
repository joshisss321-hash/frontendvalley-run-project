'use client';

import StoreShell from '../../StoreShell';
import ProductForm from '../ProductForm';

export default function NewProduct() {
  return (
    <StoreShell title="Naya product" subtitle="Valley Store" back="/admin/store/products">
      <ProductForm />
    </StoreShell>
  );
}
