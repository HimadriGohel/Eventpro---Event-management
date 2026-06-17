import { Icon } from '../../components/ui/Icon';
import { useGo } from '../../hooks/useGo';
import { useWizardStore } from '../../stores/wizardStore';
import {
  WizardShell,
  SegToggle,
  RowField,
  useAutosaveIndicator,
  DEFAULT_PREVIEW_TICKET,
} from '../../components/wizard/shared';

export default function EventCreateTickets() {
  const go = useGo();
  const draft = useWizardStore((s) => s.draft);
  const setDraft = useWizardStore((s) => s.setDraft);
  const { saving, savedAt } = useAutosaveIndicator();

  const update = (id, patch) =>
    setDraft({
      tickets: draft.tickets.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });
  const remove = (id) => setDraft({ tickets: draft.tickets.filter((t) => t.id !== id) });
  const addOne = () =>
    setDraft({
      tickets: [
        ...draft.tickets,
        { id: 't' + Date.now(), name: 'New ticket type', type: 'paid', price: 999, qty: 100, perOrder: 4, fee: 'absorb', saleStart: draft.startDate, saleEnd: draft.startDate },
      ],
    });

  const totalCap = draft.tickets.reduce((s, t) => s + Number(t.qty || 0), 0);
  const grossEst = draft.tickets.reduce((s, t) => s + (t.type === 'paid' ? Number(t.price || 0) * Number(t.qty || 0) : 0), 0);

  // Right side QR ticket preview (live)
  const previewTicket = draft.tickets[0] || DEFAULT_PREVIEW_TICKET;

  const rightPanel = (
    <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', borderRadius: 16 }}>
      <div style={{ height: 4, background: 'linear-gradient(90deg, var(--primary), var(--accent), #F59E0B)' }} />
      <div style={{ padding: 24, background: 'var(--ink)', color: 'white' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', fontFamily: 'Geist Mono', textTransform: 'uppercase' }}>Ticket preview</div>
        <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: 8, lineHeight: 1.2 }}>{draft.name}</h3>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{draft.venue?.name} · {draft.startDate}</div>
      </div>
      <div style={{ position: 'relative', padding: 24 }}>
        <div style={{ position: 'absolute', top: -8, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 12px' }}>
          {Array.from({ length: 24 }).map((_, i) => <span key={i} style={{ width: 8, height: 16, borderRadius: 999, background: 'var(--bg)' }} />)}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'Geist Mono', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{previewTicket.name}</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>{previewTicket.type === 'paid' ? `₹${previewTicket.price.toLocaleString()}` : 'Free'}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 4 }}>+ ₹{previewTicket.type === 'paid' ? '49' : '0'} platform fee</div>
            <div style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 14, fontFamily: 'Geist Mono' }}>EVT-{previewTicket.id?.toUpperCase()}-001</div>
          </div>
          <div style={{ position: 'relative', width: 96, height: 96, borderRadius: 12, background: 'var(--ink)', padding: 8 }}>
            <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
              {Array.from({ length: 49 }).map((_, i) => <span key={i} style={{ background: Math.random() > 0.45 ? 'white' : 'transparent', borderRadius: 1 }} />)}
            </div>
            <span style={{ position: 'absolute', inset: -3, borderRadius: 14, border: '2px solid #10B981', animation: 'pulse-ring 2s infinite', opacity: 0.6, pointerEvents: 'none' }} />
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 24px', borderTop: '1px dashed var(--hairline)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-soft)' }}>
        <span><Icon name="phone" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Mobile-first</span>
        <span><Icon name="check" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Auto-issued on purchase</span>
      </div>
    </div>
  );

  return (
    <WizardShell
      navigate={go} stepId="event-create-tickets" draft={draft} saving={saving} savedAt={savedAt}
      onContinue={() => {
        useWizardStore.getState().setStep(5);
        go('event-create-preview');
      }}
      canContinue={draft.tickets.length > 0}
      rightPanel={rightPanel}
    >
      <h1 className="h1" style={{ fontSize: 36, marginTop: 8 }}>
        Set up your <span className="serif" style={{ color: 'var(--accent)' }}>tickets.</span>
      </h1>
      <p className="lead" style={{ marginTop: 8, fontSize: 15 }}>Add tiers, pricing, sale windows. Free events use the same flow.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {draft.tickets.map((t, i) => (
          <div key={t.id} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--primary-tint)', color: 'var(--primary)', display: 'grid', placeItems: 'center', fontFamily: 'Geist Mono', fontSize: 13, fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
              <input className="input" value={t.name} onChange={(e) => update(t.id, { name: e.target.value })} style={{ fontSize: 15, fontWeight: 540, flex: 1 }} />
              <SegToggle
                value={t.type} onChange={(v) => update(t.id, { type: v })}
                options={[{ id: 'paid', label: 'Paid' }, { id: 'free', label: 'Free' }]}
              />
              {draft.tickets.length > 1 && (
                <button onClick={() => remove(t.id)} className="btn btn-ghost btn-sm" style={{ color: 'var(--accent)' }}>
                  <Icon name="trash" size={13} />
                </button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
              {t.type === 'paid' && (
                <RowField label="Price (₹)">
                  <input className="input" type="number" value={t.price} onChange={(e) => update(t.id, { price: +e.target.value || 0 })} />
                </RowField>
              )}
              <RowField label="Quantity">
                <input className="input" type="number" value={t.qty} onChange={(e) => update(t.id, { qty: +e.target.value || 0 })} />
              </RowField>
              <RowField label="Per order">
                <input className="input" type="number" value={t.perOrder} onChange={(e) => update(t.id, { perOrder: +e.target.value || 0 })} />
              </RowField>
              <RowField label="Sale starts">
                <input className="input" type="date" value={t.saleStart} onChange={(e) => update(t.id, { saleStart: e.target.value })} />
              </RowField>
              <RowField label="Sale ends">
                <input className="input" type="date" value={t.saleEnd} onChange={(e) => update(t.id, { saleEnd: e.target.value })} />
              </RowField>
            </div>
            {t.type === 'paid' && (
              <div style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 10, fontSize: 12, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span><Icon name="info" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Platform fee: 2% + ₹3 per ticket</span>
                <SegToggle
                  value={t.fee} onChange={(v) => update(t.id, { fee: v })}
                  options={[{ id: 'absorb', label: 'I absorb' }, { id: 'pass', label: 'Pass to buyer' }]}
                />
              </div>
            )}
          </div>
        ))}

        <button onClick={addOne} className="card" style={{
          padding: 18, border: '2px dashed var(--hairline)', background: 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          color: 'var(--ink-soft)', fontSize: 14, fontWeight: 540,
        }}>
          <Icon name="sparkle" size={14} /> Add another ticket type
        </button>

        <div className="card" style={{ padding: 18, background: 'var(--ink)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Geist Mono' }}>Capacity & estimate</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{totalCap.toLocaleString()} tickets · ~₹{grossEst.toLocaleString('en-IN')} gross</div>
          </div>
          {draft.venue?.capacity && totalCap > draft.venue.capacity && (
            <span className="badge badge-amber" style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>
              <Icon name="info" size={11} /> Exceeds venue capacity
            </span>
          )}
        </div>
      </div>
    </WizardShell>
  );
}
