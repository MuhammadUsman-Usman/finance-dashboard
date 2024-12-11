import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';


export const metadata: Metadata = {
  title: "Edit Invoive"
}

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  
  const id = params.id;

  const [invoice, customers] = await Promise.all([ fetchInvoiceById(id), fetchCustomers() ]);

  // it will be executed not-found component, if invoice not exist

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', 
            href: '/dashboard/invoices' 
          },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
