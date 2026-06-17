import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { useGo } from '../../hooks/useGo';
import { useWizardStore } from '../../stores/wizardStore';

import {
  WizardShell,
  Toggle,
  RowField,
  useAutosaveIndicator,
} from '../../components/wizard/shared';

export default function EventCreateSchedule() {
  const go = useGo();

  const draft = useWizardStore((s) => s.draft);

  const setDraft = useWizardStore((s) => s.setDraft);

  const { saving, savedAt } =
    useAutosaveIndicator();

  const [errors, setErrors] =
    useState({});

  const validateSchedule = () => {
    const newErrors = {};

    if (!draft.startDate) {
      newErrors.startDate =
        'Start date is required';
    }

    if (!draft.startTime) {
      newErrors.startTime =
        'Start time is required';
    }

    if (!draft.endDate) {
      newErrors.endDate =
        'End date is required';
    }

    if (!draft.endTime) {
      newErrors.endTime =
        'End time is required';
    }

    if (!draft.timezone) {
      newErrors.timezone =
        'Timezone is required';
    }

    if (
      draft.startDate &&
      draft.endDate &&
      draft.startDate >
        draft.endDate
    ) {
      newErrors.endDate =
        'End date must be after start date';
    }

    if (
      draft.startDate &&
      draft.endDate &&
      draft.startTime &&
      draft.endTime
    ) {
      const start =
        new Date(
          `${draft.startDate}T${draft.startTime}`
        );

      const end =
        new Date(
          `${draft.endDate}T${draft.endTime}`
        );

      if (end <= start) {
        newErrors.endTime =
          'End time must be after start time';
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleContinue = () => {
    const isValid =
      validateSchedule();

    if (!isValid) return;

    setDraft({
      startDate:
        draft.startDate,
      startTime:
        draft.startTime,
      endDate:
        draft.endDate,
      endTime:
        draft.endTime,
      timezone:
        draft.timezone,
      multiDay:
        draft.multiDay,
    });

    useWizardStore.getState().setStep(3);
    go('event-create-venue');
  };

  const canContinue =
    draft.startDate?.trim() &&
    draft.startTime?.trim() &&
    draft.endDate?.trim() &&
    draft.endTime?.trim() &&
    draft.timezone?.trim();

  const fmtPretty = (d, t) => {
    try {
      const dt = new Date(
        `${d}T${t}`
      );

      return (
        dt.toLocaleDateString(
          'en-IN',
          {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }
        ) +
        ' · ' +
        dt.toLocaleTimeString(
          'en-IN',
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }
        )
      );
    } catch {
      return `${d} ${t}`;
    }
  };

  return (
    <WizardShell
      navigate={go}
      stepId="event-create-schedule"
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
      <h1
        className="h1"
        style={{
          fontSize: 36,
          marginTop: 8,
        }}
      >
        When does it{' '}
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
        Set start, end,
        and timezone.
      </p>

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
        {/* MULTI DAY */}
        <label
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
            cursor: 'pointer',
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
              Multi-day event
            </div>

            <div
              style={{
                fontSize: 11,
                color:
                  'var(--ink-soft)',
              }}
            >
              For festivals and
              conferences
            </div>
          </div>

          <Toggle
            checked={
              draft.multiDay
            }
            onChange={(v) => {
              setDraft({
                multiDay: v,

                ...(v ===
                  false && {
                  endDate:
                    draft.startDate,
                }),
              });
            }}
          />
        </label>

        {/* DATES */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1fr 1fr',
            gap: 16,
          }}
        >
          {/* START */}
          <RowField label="Starts">
            <div
              style={{
                display: 'flex',
                gap: 8,
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <input
                  className="input"
                  type="date"
                  value={
                    draft.startDate
                  }
                  onChange={(
                    e
                  ) => {
                    setDraft({
                      startDate:
                        e.target
                          .value,
                    });

                    setErrors(
                      (
                        prev
                      ) => ({
                        ...prev,
                        startDate:
                          '',
                      })
                    );
                  }}
                />

                {errors.startDate && (
                  <p
                    style={{
                      color:
                        '#EF4444',
                      fontSize: 12,
                      marginTop: 6,
                    }}
                  >
                    {
                      errors.startDate
                    }
                  </p>
                )}
              </div>

              <div
                style={{
                  width: 130,
                }}
              >
                <input
                  className="input"
                  type="time"
                  value={
                    draft.startTime
                  }
                  onChange={(
                    e
                  ) => {
                    setDraft({
                      startTime:
                        e.target
                          .value,
                    });

                    setErrors(
                      (
                        prev
                      ) => ({
                        ...prev,
                        startTime:
                          '',
                      })
                    );
                  }}
                />

                {errors.startTime && (
                  <p
                    style={{
                      color:
                        '#EF4444',
                      fontSize: 12,
                      marginTop: 6,
                    }}
                  >
                    {
                      errors.startTime
                    }
                  </p>
                )}
              </div>
            </div>
          </RowField>

          {/* END */}
          <RowField label="Ends">
            <div
              style={{
                display: 'flex',
                gap: 8,
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <input
                  className="input"
                  type="date"
                  value={
                    draft.endDate
                  }
                  onChange={(
                    e
                  ) => {
                    setDraft({
                      endDate:
                        e.target
                          .value,
                    });

                    setErrors(
                      (
                        prev
                      ) => ({
                        ...prev,
                        endDate:
                          '',
                      })
                    );
                  }}
                />

                {errors.endDate && (
                  <p
                    style={{
                      color:
                        '#EF4444',
                      fontSize: 12,
                      marginTop: 6,
                    }}
                  >
                    {
                      errors.endDate
                    }
                  </p>
                )}
              </div>

              <div
                style={{
                  width: 130,
                }}
              >
                <input
                  className="input"
                  type="time"
                  value={
                    draft.endTime
                  }
                  onChange={(
                    e
                  ) => {
                    setDraft({
                      endTime:
                        e.target
                          .value,
                    });

                    setErrors(
                      (
                        prev
                      ) => ({
                        ...prev,
                        endTime:
                          '',
                      })
                    );
                  }}
                />

                {errors.endTime && (
                  <p
                    style={{
                      color:
                        '#EF4444',
                      fontSize: 12,
                      marginTop: 6,
                    }}
                  >
                    {
                      errors.endTime
                    }
                  </p>
                )}
              </div>
            </div>
          </RowField>
        </div>

        {/* TIMEZONE */}
        <RowField
          label="Timezone"
          hint="Users see local timezone"
        >
          <select
            className="input"
            value={
              draft.timezone
            }
            onChange={(e) => {
              setDraft({
                timezone:
                  e.target.value,
              });

              setErrors(
                (prev) => ({
                  ...prev,
                  timezone: '',
                })
              );
            }}
          >
            <option value="">
              Select timezone
            </option>

            {[
              'Asia/Kolkata · IST (UTC+5:30)',
              'Asia/Dubai · GST (UTC+4)',
              'Asia/Singapore · SGT (UTC+8)',
              'Europe/London · GMT/BST',
              'America/New_York · EST/EDT',
            ].map((t) => (
              <option key={t}>
                {t}
              </option>
            ))}
          </select>

          {errors.timezone && (
            <p
              style={{
                color: '#EF4444',
                fontSize: 12,
                marginTop: 6,
              }}
            >
              {errors.timezone}
            </p>
          )}
        </RowField>

        {/* PREVIEW */}
        <div
          style={{
            padding: 18,
            background:
              'var(--primary-tint)',
            border:
              '1px solid var(--primary)',
            borderRadius: 14,
            display: 'flex',
            gap: 14,
            alignItems:
              'center',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background:
                'var(--primary)',
              color: 'white',
              display: 'grid',
              placeItems:
                'center',
              flexShrink: 0,
            }}
          >
            <Icon
              name="calendar"
              size={20}
            />
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color:
                  'var(--primary)',
                fontWeight: 600,
                letterSpacing:
                  '0.06em',
                textTransform:
                  'uppercase',
              }}
            >
              Preview
            </div>

            <div
              style={{
                fontSize: 14,
                fontWeight: 540,
                color:
                  'var(--ink)',
                marginTop: 4,
              }}
            >
              {draft.startDate &&
              draft.startTime
                ? fmtPretty(
                    draft.startDate,
                    draft.startTime
                  )
                : 'Select start date/time'}
            </div>

            <div
              style={{
                fontSize: 12,
                color:
                  'var(--ink-soft)',
                marginTop: 2,
              }}
            >
              {draft.endDate &&
              draft.endTime
                ? `→ ${fmtPretty(
                    draft.endDate,
                    draft.endTime
                  )}`
                : 'Select end date/time'}
            </div>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}