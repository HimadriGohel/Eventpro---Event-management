import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../routes/paths';

/* Returns a `go(id)` helper so pages keep the same `navigate("home")`
   API the prototype used, while we resolve to real URLs underneath. */
export function useGo() {
  const navigate = useNavigate();
  return useCallback(
    (id, opts) => {
      const target = PATHS[id] || id;
      window.scrollTo({ top: 0, behavior: 'instant' });
      navigate(target, opts);
    },
    [navigate],
  );
}
