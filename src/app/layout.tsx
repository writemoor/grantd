import Link from 'next/link';
import './globals.css';
export const metadata = { title: 'Grant Operations Workspace', description: 'Coordinate applications with human review and source traceability.' };
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export default function Layout({children}: {children: React.ReactNode}) {
  return <html lang="en"><body><header><Link href="/" className="brand">Grant Operations</Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/opportunities">Grants & opportunities</Link></nav></header><div className="workspace">Community Arts Collective · Local demo · Alex Morgan</div><main>{children}</main><footer>Human-reviewed coordination. Mock extraction is enabled. Local demo without authentication.</footer></body></html>;
}
