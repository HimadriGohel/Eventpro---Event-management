import { TweaksPanel } from './TweaksPanel';
import { TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakColor } from './controls';
import { useThemeStore } from '../../stores/themeStore';

const ACCENT_OPTIONS = ['#1E40AF', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'];
const PRIMARY_OPTIONS = ['#1E40AF', '#0F172A', '#1D4ED8', '#7C3AED', '#0E7490'];

/* Wires Tweaks controls to the Zustand themeStore. */
export function AppTweaks() {
  const {
    accent, primary, darkMode, radius, density, serifAccent, showFloatingDemo,
    setTweak,
  } = useThemeStore();

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio
          label="Mode"
          value={darkMode ? 'dark' : 'light'}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
          onChange={(v) => setTweak('darkMode', v === 'dark')}
        />
      </TweakSection>

      <TweakSection label="Color">
        <TweakColor
          label="Accent"
          value={accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakColor
          label="Primary"
          value={primary}
          options={PRIMARY_OPTIONS}
          onChange={(v) => setTweak('primary', v)}
        />
      </TweakSection>

      <TweakSection label="Form">
        <TweakSlider
          label="Card radius"
          value={radius}
          min={4}
          max={28}
          step={1}
          unit="px"
          onChange={(v) => setTweak('radius', v)}
        />
        <TweakRadio
          label="Density"
          value={density}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Comfortable' },
          ]}
          onChange={(v) => setTweak('density', v)}
        />
      </TweakSection>

      <TweakSection label="Style">
        <TweakToggle
          label="Serif italic accent"
          value={serifAccent}
          onChange={(v) => setTweak('serifAccent', v)}
        />
        <TweakToggle
          label="Floating UI mockups in hero"
          value={showFloatingDemo}
          onChange={(v) => setTweak('showFloatingDemo', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}
