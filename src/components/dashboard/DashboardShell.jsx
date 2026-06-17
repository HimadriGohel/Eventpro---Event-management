import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function DashboardShell({ active, title, crumb, actions, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar active={active} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar title={title} crumb={crumb} actions={actions} />
        <div style={{ padding: 36, flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
