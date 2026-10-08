import Link from 'next/link';
import { opportunities } from '../../persistence/repository';
import { create } from '../actions';
export default async function Opportunities({searchParams}: {searchParams: Promise<{error?:string}>}) {
  const {error} = await searchParams; const items = opportunities();
  return <><h1>Grants & opportunities</h1><p>Track application work here. Award management will follow in a later slice.</p>{error && <p role="alert" className="error">{error}</p>}<section className="panel"><h2>Create opportunity</h2><form action={create} className="grid"><label>Opportunity name<input name="title" required maxLength={200} placeholder="Youth Arts Initiative" /></label><label>Funder<input name="funder" required maxLength={200} placeholder="Community Foundation" /></label><label>Application due date<input name="due_date" type="date" /></label><button>Create opportunity</button></form></section>{items.length ? <div className="table-wrap"><table><thead><tr><th>Opportunity</th><th>Funder</th><th>Lifecycle</th><th>Application due</th></tr></thead><tbody>{items.map(o=><tr key={o.id}><td><Link href={`/opportunities/${o.id}`}>{o.title}</Link></td><td>{o.funder_name}</td><td>{o.status}</td><td>{o.due_date || 'Not set'}</td></tr>)}</tbody></table></div> : <p>No opportunities yet.</p>}</>;
}
