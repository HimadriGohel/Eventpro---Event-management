import { Button } from '../components/ui/Button';
import { useGo } from '../hooks/useGo';

export function ComingSoon({ title = 'Page' }) {
  const go = useGo();
  return (
    <div className="container" style={{ padding: '120px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <span className="eyebrow">{title}</span>
      <h1 className="display" style={{ fontSize: 56 }}>This screen is wired but empty.</h1>
      <p className="lead" style={{ maxWidth: 520 }}>The route exists and the layout works — content for this page is still being ported from the prototype.</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="primary" onClick={() => go('sitemap')} iconRight="arrow">Back to sitemap</Button>
        <Button variant="ghost" onClick={() => go('home')}>Home</Button>
      </div>
    </div>
  );
}
