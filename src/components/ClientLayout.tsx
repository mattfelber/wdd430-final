'use client';

import Layout from './Layout';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return <Layout>{children}</Layout>;
}
