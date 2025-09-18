import DistributorLayout from '@/components/DistributorLayout';

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DistributorLayout activePage="requests">
      {children}
    </DistributorLayout>
  );
}

