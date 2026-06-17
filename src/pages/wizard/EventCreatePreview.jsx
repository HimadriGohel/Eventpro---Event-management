import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';
import { useWizardStore } from '../../stores/wizardStore';
import {
  WizardShell,
  Toggle,
  SegToggle,
  RowField,
  useAutosaveIndicator,
} from '../../components/wizard/shared';

export default function EventCreatePreview() {
  const go = useGo();

  const draft = useWizardStore(
    (s) => s.draft
  );

  const setDraft =
    useWizardStore(
      (s) => s.setDraft
    );

  const reset =
    useWizardStore(
      (s) => s.reset
    );

  const { saving, savedAt } =
    useAutosaveIndicator();

  const minPrice = Math.min(
    ...draft.tickets
      .filter(
        (t) => t.type === 'paid'
      )
      .map((t) => t.price),
    Infinity
  );

  const startsLabel = (() => {
    try {
      return new Date(
        `${draft.startDate}T${draft.startTime}`
      ).toLocaleDateString(
        'en-IN',
        {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        }
      );
    } catch {
      return draft.startDate;
    }
  })();

  const handlePublish =
    async () => {
      try {
        console.log('DRAFT =>', draft);
console.log('VENUE =>', draft.venue);
console.log('MODE =>', draft.venueMode);
const payload = {
  title: draft.name,
  description: draft.description,
  category: draft.category,

  location:
    draft.venueMode === 'online'
      ? 'Online Event'
      : draft.venue?.address ||
        draft.newVenue?.address,
  
  image: draft.banner,
   
  startDate: `${draft.startDate}T${draft.startTime}`,

  endDate: `${draft.endDate}T${draft.endTime}`,

  price:
    minPrice === Infinity 
      ? 0
      : minPrice,
      
  organizer: 'EventPro',

venue:
  draft.venueMode === 'online'
    ? null
    : draft.venue || draft.newVenue,

  tickets: draft.tickets,

  visibility: draft.visibility,

  searchable: draft.searchable,

  marketplaceListing:
    draft.marketplaceListing,
};
        const response =
         await fetch(
         'http://localhost:4000/api/v1/events',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify(
                payload
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Failed to create event'
          );
        }

        reset();

        localStorage.removeItem(
          'eventpro-wizard'
        );

        go(
          'event-create-success'
        );
      } catch (error) {
        console.error(error);

        alert(
          error.message ||
            'Something went wrong'
        );
      }
    };

  const rightPanel = (
    <div
      className="card"
      style={{
        padding: 24,
        display: 'flex',
        flexDirection:
          'column',
        gap: 18,
        position: 'sticky',
        top: 140,
      }}
    >
      <h3
        className="h3"
        style={{
          fontSize: 16,
        }}
      >
        Publish settings
      </h3>

      <RowField label="Visibility">
        <SegToggle
          value={
            draft.visibility
          }
          onChange={(v) =>
            setDraft({
              visibility: v,
            })
          }
          options={[
            {
              id: 'public',
              label: 'Public',
            },
            {
              id: 'unlisted',
              label:
                'Unlisted',
            },
            {
              id: 'private',
              label:
                'Private',
            },
          ]}
        />
      </RowField>

      <label
        style={{
          display: 'flex',
          alignItems:
            'center',
          justifyContent:
            'space-between',
          padding: 12,
          background:
            'var(--bg-2)',
          borderRadius: 10,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 540,
          }}
        >
          Searchable on
          EventPro
        </div>

        <Toggle
          checked={
            draft.searchable
          }
          onChange={(v) =>
            setDraft({
              searchable: v,
            })
          }
        />
      </label>

      <label
        style={{
          display: 'flex',
          alignItems:
            'center',
          justifyContent:
            'space-between',
          padding: 12,
          background:
            'var(--bg-2)',
          borderRadius: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 540,
            }}
          >
            Marketplace
            listing
          </div>

          <div
            style={{
              fontSize: 11,
              color:
                'var(--ink-soft)',
            }}
          >
            Verified
            accounts only
          </div>
        </div>

        <Toggle
          checked={
            draft.marketplaceListing
          }
          onChange={(v) =>
            setDraft({
              marketplaceListing:
                v,
            })
          }
        />
      </label>

      <RowField label="Publish">
        <SegToggle
          value={
            draft.publishMode
          }
          onChange={(v) =>
            setDraft({
              publishMode: v,
            })
          }
          options={[
            {
              id: 'now',
              label:
                'Right away',
              icon: 'bolt',
            },
            {
              id: 'schedule',
              label:
                'On a date',
              icon:
                'calendar',
            },
          ]}
        />
      </RowField>

      <div
        style={{
          padding: 14,
          background:
            'var(--success-soft)',
          border:
            '1px solid #10B981',
          borderRadius: 12,
          fontSize: 12,
          color: '#065F46',
          display: 'flex',
          gap: 10,
        }}
      >
        <Icon
          name="check"
          size={14}
          stroke={2.5}
          style={{
            color:
              '#10B981',
            flexShrink: 0,
            marginTop: 2,
          }}
        />

        <div>
          Everything looks
          ready. Click{' '}
          <strong>
            Publish
          </strong>{' '}
          to make this event
          live.
        </div>
      </div>
    </div>
  );

  return (
    <WizardShell
      navigate={go}
      stepId="event-create-preview"
      draft={draft}
      saving={saving}
      savedAt={savedAt}
      onContinue={
        handlePublish
      }
      continueLabel={
        draft.publishMode ===
        'now'
          ? 'Publish event'
          : 'Schedule publish'
      }
      rightPanel={rightPanel}
    >
      <h1
        className="h1"
        style={{
          fontSize: 36,
          marginTop: 8,
        }}
      >
        Looks{' '}
        <span
          className="serif"
          style={{
            color:
              'var(--accent)',
          }}
        >
          good?
        </span>
      </h1>

      <p
        className="lead"
        style={{
          marginTop: 8,
          fontSize: 15,
        }}
      >
        Final review. You
        can edit any field
        after publishing.
      </p>

      {/* EVENT HERO */}
      <div
        className="card"
        style={{
          padding: 0,
          overflow:
            'hidden',
          boxShadow:
            'var(--shadow-lg)',
        }}
      >
        <div
          style={{
            height: 220,
            position:
              'relative',

            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${
              draft.banner ||
              ''
            })`,

            backgroundSize:
              'cover',

            backgroundPosition:
              'center',
          }}
        >
          <div
            style={{
              position:
                'absolute',
              top: 16,
              left: 16,
              display:
                'flex',
              gap: 6,
            }}
          >
            <span
              className="badge"
              style={{
                background:
                  'rgba(255,255,255,0.95)',
                color:
                  'var(--ink)',
              }}
            >
              {
                draft.category
              }
            </span>

            {draft.visibility !==
              'public' && (
              <span
                className="badge"
                style={{
                  background:
                    'rgba(0,0,0,0.7)',
                  color:
                    'white',
                }}
              >
                {
                  draft.visibility
                }
              </span>
            )}
          </div>

          <div
            style={{
              position:
                'absolute',
              bottom: 16,
              left: 20,
              right: 20,
              color:
                'white',
            }}
          >
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {draft.name}
            </h2>

            <div
              style={{
                fontSize: 13,
                marginTop: 6,
                color:
                  'rgba(255,255,255,0.85)',
              }}
            >
              {
                startsLabel
              }{' '}
              ·{' '}
              {draft.venue
                ?.name ||
                draft
                  .newVenue
                  ?.name ||
                'Online Event'}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: 20,
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems:
              'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color:
                  'var(--ink-soft)',
                textTransform:
                  'uppercase',
                letterSpacing:
                  '0.08em',
                fontFamily:
                  'Geist Mono',
              }}
            >
              Starting at
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              {minPrice ===
              Infinity
                ? 'Free'
                : `₹${minPrice.toLocaleString()}`}
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() =>
              go(
                'event-create-start'
              )
            }
          >
            Edit details
          </Button>
        </div>
      </div>

      {/* SUMMARY */}
      {[
        {
          t: 'Schedule',

          body: `${startsLabel} ${draft.startTime} → ${draft.endDate} ${draft.endTime}`,

          edit:
            'event-create-schedule',

          icon: 'calendar',
        },

        {
          t: 'Venue',

          body: `${
            draft.venue
              ?.name ||
            draft.newVenue
              ?.name ||
            'Online Event'
          } · ${
            draft.venue
              ?.address ||
            draft.newVenue
              ?.address ||
             ''
          }`,

          edit:
            'event-create-venue',

          icon: 'pin',
        },

        {
          t: `${draft.tickets.length} ticket types`,

          body:
            draft.tickets
              .map(
                (t) =>
                  `${t.name} · ${
                    t.type ===
                    'paid'
                      ? `₹${t.price}`
                      : 'Free'
                  } × ${t.qty}`
              )
              .join(' • '),

          edit:
            'event-create-tickets',

          icon: 'ticket',
        },

        {
          t: 'Description',

          body:
            draft.description?.slice(
              0,
              140
            ) +
            (draft
              .description
              ?.length > 140
              ? '…'
              : ''),

          edit:
            'event-create-start',

          icon: 'info',
        },
      ].map((row) => (
        <div
          key={row.t}
          className="card"
          style={{
            padding: 18,
            display: 'flex',
            alignItems:
              'flex-start',
            gap: 14,
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background:
                'var(--bg-2)',
              color:
                'var(--ink-soft)',
              display:
                'grid',
              placeItems:
                'center',
              flexShrink: 0,
            }}
          >
            <Icon
              name={row.icon}
              size={14}
            />
          </span>

          <div
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {row.t}
            </div>

            <div
              style={{
                fontSize: 12,
                color:
                  'var(--ink-soft)',
                marginTop: 4,
                lineHeight: 1.5,
              }}
            >
              {row.body}
            </div>
          </div>

          <button
            onClick={() =>
              go(row.edit)
            }
            className="btn btn-ghost btn-sm"
          >
            Edit
          </button>
        </div>
      ))}
    </WizardShell>
  );
}