import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { useGo } from '../../hooks/useGo';
import { useWizardStore } from '../../stores/wizardStore';

import {
  WizardShell,
  Toggle,
  SegToggle,
  RowField,
  useAutosaveIndicator,
} from '../../components/wizard/shared';

export default function EventCreateStart() {
  const go = useGo();

  const draft = useWizardStore(
    (s) => s.draft
  );

  const setDraft =
    useWizardStore(
      (s) => s.setDraft
    );

  const { saving, savedAt } =
    useAutosaveIndicator();

  const [errors, setErrors] =
    useState({});

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if (!draft.name?.trim()) {
      newErrors.name =
        'Event name is required';
    }

    if (!draft.category) {
      newErrors.category =
        'Category is required';
    }

    if (!draft.visibility) {
      newErrors.visibility =
        'Visibility is required';
    }

    if (!draft.banner) {
      newErrors.banner =
        'Banner is required';
    }

    if (
      !draft.description?.trim()
    ) {
      newErrors.description =
        'Description is required';
    } else if (
      draft.description.trim()
        .length < 20
    ) {
      newErrors.description =
        'At least 20 characters required for description';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // CONTINUE
  const handleContinue = () => {
    const valid = validateForm();

    if (!valid) return;

    useWizardStore.getState().setStep(2);
    go('event-create-schedule');
  };

  // BUTTON ENABLE
  const canContinue =
    Boolean(
      draft.name?.trim()
    ) &&
    Boolean(draft.category) &&
    Boolean(
      draft.visibility
    ) &&
    Boolean(draft.banner) &&
    Boolean(
      draft.description?.trim()
    ) &&
    draft.description.trim()
      .length >= 20;

  // BANNER UPLOAD
const handleBannerUpload = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();

    img.onload = () => {
      const canvas =
        document.createElement('canvas');

      const MAX_WIDTH = 1200;

      const scale =
        MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;

      canvas.height =
        img.height * scale;

      const ctx =
        canvas.getContext('2d');

      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const compressed =
        canvas.toDataURL(
          'image/jpeg',
          0.5
        );

      setDraft({
        banner: compressed,
      });

      setErrors((prev) => ({
        ...prev,
        banner: '',
      }));
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
};

  return (
    <WizardShell
      navigate={go}
      stepId="event-create-start"
      draft={draft}
      saving={saving}
      savedAt={savedAt}
      onContinue={
        handleContinue
      }
      canContinue={
        canContinue
      }
    >
      {/* HEADER */}
      <h1
        className="h1"
        style={{
          fontSize: 36,
          marginTop: 8,
        }}
      >
        Tell us about your{' '}
        <span
          className="serif"
          style={{
            color:
              'var(--accent)',
          }}
        >
          event.
        </span>
      </h1>

      <p
        className="lead"
        style={{
          marginTop: 8,
          fontSize: 15,
        }}
      >
        The basics — what is
        it, who's it for,
        and where can people
        find it?
      </p>

      {/* FORM */}
      <div
        className="card"
        style={{
          padding: 24,
          display: 'flex',
          flexDirection:
            'column',
          gap: 20,
        }}
      >
        {/* EVENT NAME */}
        <RowField
          label="Event name"
          hint="Up to 80 characters"
        >
          <>
            <input
              className="input"
              value={
                draft.name || ''
              }
              onChange={(e) => {
                setDraft({
                  name: e.target
                    .value,
                });

                setErrors(
                  (prev) => ({
                    ...prev,
                    name: '',
                  })
                );
              }}
              placeholder="Neo Rave: Midnight Bloom"
              maxLength={80}
            />

            {errors.name && (
              <p
                style={{
                  color:
                    '#EF4444',
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                {errors.name}
              </p>
            )}
          </>
        </RowField>

        {/* CATEGORY + VISIBILITY */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1fr 1fr',
            gap: 16,
          }}
        >
          {/* CATEGORY */}
          <RowField label="Category">
            <>
              <select
                className="input"
                value={
                  draft.category ||
                  ''
                }
                onChange={(
                  e
                ) => {
                  setDraft({
                    category:
                      e.target
                        .value,
                  });

                  setErrors(
                    (
                      prev
                    ) => ({
                      ...prev,
                      category:
                        '',
                    })
                  );
                }}
              >
                <option value="">
                  Select category
                </option>

                {[
                  'Concerts & live music',
                  'Comedy shows',
                  'Technology',
                  'Workshops & talks',
                  'Food experiences',
                  'Business',
                  'Parties & nightlife',
                  'Sports & fitness',
                  'Conferences',
                  'Theatre',
                  'Other',
                ].map((c) => (
                  <option
                    key={c}
                    value={c}
                  >
                    {c}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p
                  style={{
                    color:
                      '#EF4444',
                    fontSize: 12,
                    marginTop: 6,
                  }}
                >
                  {
                    errors.category
                  }
                </p>
              )}
            </>
          </RowField>

          {/* VISIBILITY */}
          <RowField
            label="Visibility"
            hint="Who can find this event"
          >
            <>
              <SegToggle
                value={
                  draft.visibility ||
                  ''
                }
                onChange={(
                  v
                ) => {
                  setDraft({
                    visibility:
                      v,
                  });

                  setErrors(
                    (
                      prev
                    ) => ({
                      ...prev,
                      visibility:
                        '',
                    })
                  );
                }}
                options={[
                  {
                    id: 'public',
                    label:
                      'Public',
                    icon:
                      'share',
                  },
                  {
                    id: 'unlisted',
                    label:
                      'Unlisted',
                    icon:
                      'lock',
                  },
                  {
                    id: 'private',
                    label:
                      'Private',
                    icon:
                      'users',
                  },
                ]}
              />

              {errors.visibility && (
                <p
                  style={{
                    color:
                      '#EF4444',
                    fontSize: 12,
                    marginTop: 6,
                  }}
                >
                  {
                    errors.visibility
                  }
                </p>
              )}
            </>
          </RowField>
        </div>

        {/* TOGGLES */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1fr 1fr',
            gap: 16,
          }}
        >
          <div
            style={{
              padding: 16,
              background:
                'var(--bg-2)',
              borderRadius: 12,
              display: 'flex',
              alignItems:
                'center',
              justifyContent:
                'space-between',
              border:
                '1px solid var(--hairline)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 540,
                }}
              >
                Booking required
              </div>

              <div
                style={{
                  fontSize: 11,
                  color:
                    'var(--ink-soft)',
                }}
              >
                Attendees must reserve tickets
              </div>
            </div>

            <Toggle
              checked={
                draft.bookingRequired
              }
              onChange={(v) =>
                setDraft({
                  bookingRequired:
                    v,
                })
              }
            />
          </div>

          <div
            style={{
              padding: 16,
              background:
                'var(--bg-2)',
              borderRadius: 12,
              display: 'flex',
              alignItems:
                'center',
              justifyContent:
                'space-between',
              border:
                '1px solid var(--hairline)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 540,
                }}
              >
                Show in marketplace
              </div>

              <div
                style={{
                  fontSize: 11,
                  color:
                    'var(--ink-soft)',
                }}
              >
                Get featured publicly
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
          </div>
        </div>

        {/* BANNER */}
        <RowField
          label="Event banner"
          hint="Required"
        >
          <>
            <input
              type="file"
              accept="image/*"
              id="banner-upload"
              style={{
                display: 'none',
              }}
              onChange={
                handleBannerUpload
              }
            />

            <label
              htmlFor="banner-upload"
              style={{
                cursor:
                  'pointer',
              }}
            >
              <div
                className="card"
                style={{
                  minHeight: 240,
                  border:
                    '2px dashed var(--hairline)',
                  overflow:
                    'hidden',
                  display:
                    'grid',
                  placeItems:
                    'center',
                  position:
                    'relative',
                  background:
                    draft.banner
                      ? `url(${draft.banner}) center/cover`
                      : 'var(--bg-2)',
                }}
              >
                {!draft.banner ? (
                  <div
                    style={{
                      textAlign:
                        'center',
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background:
                          'var(--surface)',
                        display:
                          'grid',
                        placeItems:
                          'center',
                        margin:
                          '0 auto 14px',
                        color:
                          'var(--primary)',
                      }}
                    >
                      <Icon
                        name="camera"
                        size={
                          24
                        }
                      />
                    </div>

                    <div
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Upload Banner
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(
                      e
                    ) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setDraft({
                        banner:
                          '',
                      });
                    }}
                    className="btn btn-sm"
                    style={{
                      position:
                        'absolute',
                      top: 12,
                      right: 12,
                      background:
                        'rgba(0,0,0,0.6)',
                      color:
                        'white',
                    }}
                  >
                    <Icon
                      name="trash"
                      size={
                        11
                      }
                    />{' '}
                    Remove
                  </button>
                )}
              </div>
            </label>

            {errors.banner && (
              <p
                style={{
                  color:
                    '#EF4444',
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                {
                  errors.banner
                }
              </p>
            )}
          </> 
        </RowField>

        {/* DESCRIPTION */}
        <RowField
          label="Description"
          hint={`${
            draft.description
              ?.length || 0
          } / 2000`}
        >
          <>
            <textarea
              className="input"
              rows={5}
              value={
                draft.description ||
                ''
              }
              onChange={(e) => {
                setDraft({
                  description:
                    e.target.value,
                });

                setErrors(
                  (prev) => ({
                    ...prev,
                    description:
                      '',
                  })
                );
              }}
              placeholder="Tell people what to expect..."
            />

            {draft.description !== undefined && draft.description.trim().length > 0 && draft.description.trim().length < 20 && (
              <p
                style={{
                  color: '#F59E0B',
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                At least 20 characters required for description
              </p>
            )}

            {errors.description && (!draft.description || draft.description.trim().length >= 20 || draft.description.trim().length === 0) && (
              <p
                style={{
                  color:
                    '#EF4444',
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                {
                  errors.description
                }
              </p>
            )}
          </>
        </RowField>
      </div>
    </WizardShell>
  );
}