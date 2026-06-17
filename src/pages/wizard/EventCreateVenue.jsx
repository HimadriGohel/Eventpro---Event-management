import { useEffect, useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { useGo } from '../../hooks/useGo';
import { useWizardStore } from '../../stores/wizardStore';

import {
  WizardShell,
  SegToggle,
  RowField,
  useAutosaveIndicator,
} from '../../components/wizard/shared';

export default function EventCreateVenue() {
  const go = useGo();

  const draft = useWizardStore((s) => s.draft);

  const setDraft = useWizardStore((s) => s.setDraft);

  const { saving, savedAt } =
    useAutosaveIndicator();

  const [mode, setMode] =
    useState(
      draft.venueMode || 'saved'
    );

  const [savedVenues, setSavedVenues] =
    useState([]);

  // LOAD SAVED VENUES FROM LOCALSTORAGE
  useEffect(() => {
    const venues =
      JSON.parse(
        localStorage.getItem(
          'savedVenues'
        ) || '[]'
      );

    setSavedVenues(venues);
  }, []);

  // MODE CHANGE
  useEffect(() => {
    setDraft({
      venueMode: mode,
    });
  }, [mode]);

  // SAVE NEW VENUE
const saveNewVenue = () => {
  if (
    !draft.newVenue?.name ||
    !draft.newVenue?.address
  ) {
    return;
  }

  const newVenue = {
    id: 'v_' + Date.now(),

    name: draft.newVenue.name,

    address: draft.newVenue.address,

    capacity:
      Number(
        draft.newVenue.capacity
      ) || 0,

    layout:
      draft.newVenue.layout,

    image:
      draft.newVenue?.images?.[0] || '',

    // localStorage quota issue fix
    images: [],
  };

  try {
    const existing = JSON.parse(
      localStorage.getItem(
        'savedVenues'
      ) || '[]'
    );

    const updated = [
      ...existing,
      newVenue,
    ];

    localStorage.setItem(
      'savedVenues',
      JSON.stringify(updated)
    );

    setSavedVenues(updated);

    setDraft({
      venue: newVenue,
    });

    setMode('saved');
  } catch (err) {
    console.error(err);

    alert(
      'Storage limit exceeded. Please remove old saved venues.'
    );
  }
};

  // IMAGE UPLOAD
const handleImageUpload = (
  e
) => {
  const files =
    Array.from(
      e.target.files || []
    );

  if (!files.length) return;

  const imageUrls =
    files.map((file) =>
      URL.createObjectURL(file)
    );

  setDraft({
    newVenue: {
      ...draft.newVenue,
      images: imageUrls,
    },
  });
};

  return (
    <WizardShell
      navigate={go}
      stepId="event-create-venue"
      draft={draft}
      saving={saving}
      savedAt={savedAt}
      onContinue={() => {
        useWizardStore.getState().setStep(4);
        go('event-create-tickets');
      }}
      canContinue={
        mode === 'saved'
          ? Boolean(
              draft.venue
                ?.name
            )
          : mode === 'new'
          ? Boolean(
              draft.newVenue
                ?.name &&
                draft.newVenue
                  ?.address
            )
          : Boolean(
              draft.onlineEvent
                ?.meetingUrl
            )
      }
    >
      <h1
        className="h1"
        style={{
          fontSize: 36,
          marginTop: 8,
        }}
      >
        Where will it{' '}
        <span
          className="serif"
          style={{
            color:
              'var(--accent)',
          }}
        >
          happen?
        </span>
      </h1>

      <p
        className="lead"
        style={{
          marginTop: 8,
          fontSize: 15,
        }}
      >
        Pick saved venue or
        create a new one.
      </p>

      {/* MODE */}
      <div
        style={{
          display: 'flex',
          gap: 8,
        }}
      >
        <SegToggle
          value={mode}
          onChange={setMode}
          options={[
            {
              id: 'saved',
              label:
                'Saved venues',
              icon: 'pin',
            },
            {
              id: 'new',
              label:
                'New venue',
              icon:
                'sparkle',
            },
            {
              id: 'online',
              label: 'Online',
              icon: 'phone',
            },
          ]}
        />
      </div>

      {/* SAVED VENUES */}
      {mode === 'saved' && (
        <>
          {savedVenues.length ===
          0 ? (
            <div
              className="card"
              style={{
                padding: 30,
                textAlign:
                  'center',
              }}
            >
              <Icon
                name="pin"
                size={30}
              />

              <p
                style={{
                  marginTop: 10,
                  fontSize: 14,
                }}
              >
                No saved venues
                found.
              </p>
            </div>
          ) : (
            <div
              style={{
                display:
                  'grid',
                gridTemplateColumns:
                  '1fr 1fr',
                gap: 12,
              }}
            >
              {savedVenues.map(
                (v) => {
                  const selected =
                    draft
                      ?.venue
                      ?.id ===
                    v.id;

                  return (
                    <button
                      key={
                        v.id
                      }
                      onClick={() =>
                        setDraft(
                          {
                            venue:
                              v,
                          }
                        )
                      }
                      className="card"
                      style={{
                        padding: 0,
                        overflow:
                          'hidden',
                        textAlign:
                          'left',
                        cursor:
                          'pointer',
                        border: `1.5px solid ${
                          selected
                            ? 'var(--primary)'
                            : 'var(--hairline)'
                        }`,
                      }}
                    >
                      <div
                        style={{
                          height: 140,
                          backgroundImage:
                            v.image
                              ? `url(${v.image})`
                              : '',
                          backgroundSize:
                            'cover',
                          backgroundPosition:
                            'center',
                          backgroundColor:
                            'var(--bg-2)',
                          position:
                            'relative',
                        }}
                      >
                        {selected && (
                          <span
                            style={{
                              position:
                                'absolute',
                              top: 10,
                              right: 10,
                              width: 28,
                              height: 28,
                              borderRadius: 999,
                              background:
                                'var(--primary)',
                              color:
                                'white',
                              display:
                                'grid',
                              placeItems:
                                'center',
                            }}
                          >
                            <Icon
                              name="check"
                              size={
                                14
                              }
                            />
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          padding: 16,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                          }}
                        >
                          {
                            v.name
                          }
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                            color:
                              'var(--ink-soft)',
                            marginTop: 4,
                          }}
                        >
                          {
                            v.address
                          }
                        </div>

                        <div
                          style={{
                            fontSize: 11,
                            marginTop: 8,
                            color:
                              'var(--ink-soft)',
                          }}
                        >
                          Capacity:{' '}
                          {
                            v.capacity
                          }
                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          )}
        </>
      )}

      {/* NEW VENUE */}
      {mode === 'new' && (
        <div
          className="card"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection:
              'column',
            gap: 18,
          }}
        >
          <RowField label="Venue name">
            <input
              className="input"
              placeholder="Venue name"
              value={
                draft
                  .newVenue
                  ?.name || ''
              }
              onChange={(e) =>
                setDraft({
                  newVenue:
                    {
                      ...draft.newVenue,
                      name: e
                        .target
                        .value,
                    },
                })
              }
            />
          </RowField>

          <RowField label="Address">
            <input
              className="input"
              placeholder="Address"
              value={
                draft
                  .newVenue
                  ?.address ||
                ''
              }
              onChange={(e) =>
                setDraft({
                  newVenue:
                    {
                      ...draft.newVenue,
                      address:
                        e
                          .target
                          .value,
                    },
                })
              }
            />
          </RowField>

          <div
            style={{
              display:
                'grid',
              gridTemplateColumns:
                '1fr 1fr',
              gap: 16,
            }}
          >
            <RowField label="Capacity">
              <input
                className="input"
                type="number"
                placeholder="2400"
                value={
                  draft
                    .newVenue
                    ?.capacity ||
                  ''
                }
                onChange={(
                  e
                ) =>
                  setDraft({
                    newVenue:
                      {
                        ...draft.newVenue,
                        capacity:
                          e
                            .target
                            .value,
                      },
                  })
                }
              />
            </RowField>

            <RowField label="Layout">
              <select
                className="input"
                value={
                  draft
                    .newVenue
                    ?.layout
                }
                onChange={(
                  e
                ) =>
                  setDraft({
                    newVenue:
                      {
                        ...draft.newVenue,
                        layout:
                          e
                            .target
                            .value,
                      },
                  })
                }
              >
                <option>
                  Standing
                  only
                </option>

                <option>
                  Seated rows
                </option>

                <option>
                  Mixed
                </option>
              </select>
            </RowField>
          </div>

          {/* IMAGE */}
          <RowField label="Venue photos">
            <>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={
                  handleImageUpload
                }
              />

              {draft
                .newVenue
                ?.images
                ?.length >
                0 && (
                <div
                  style={{
                    display:
                      'grid',
                    gridTemplateColumns:
                      'repeat(4,1fr)',
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  {draft.newVenue.images.map(
                    (
                      img,
                      i
                    ) => (
                      <img
                        key={
                          i
                        }
                        src={
                          img
                        }
                        alt=""
                        style={{
                          width:
                            '100%',
                          aspectRatio:
                            '1',
                          objectFit:
                            'cover',
                          borderRadius: 10,
                        }}
                      />
                    )
                  )}
                </div>
              )}
            </>
          </RowField>

          <button
            type="button"
            className="btn"
            onClick={
              saveNewVenue
            }
          >
            Save Venue
          </button>
        </div>
      )}

      {/* ONLINE */}
      {mode === 'online' && (
        <div
          className="card"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection:
              'column',
            gap: 16,
          }}
        >
          <RowField label="Platform">
            <select
              className="input"
              value={
                draft
                  .onlineEvent
                  ?.platform
              }
              onChange={(e) =>
                setDraft({
                  onlineEvent:
                    {
                      ...draft.onlineEvent,
                      platform:
                        e
                          .target
                          .value,
                    },
                })
              }
            >
              <option>
                Zoom
              </option>
 
              <option>
                Google Meet
              </option>

              <option>
                YouTube Live
              </option>
            </select>
          </RowField>
                      
          <RowField label="Meeting URL">
            <input
              className="input"
                 
              placeholder="https://"
              value={
                draft
                  .onlineEvent
                  ?.meetingUrl ||
                ''
              }
              onChange={(e) =>
                setDraft({
                  onlineEvent:
                    {
                      ...draft.onlineEvent,
                      meetingUrl:
                        e              
                          .target
                          .value,
                    },
                })
              }
            />
          </RowField>
        </div>
      )}
    </WizardShell>
  );
}     