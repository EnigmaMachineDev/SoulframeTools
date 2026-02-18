import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'soulframe-checklist-progress';

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function sanitizeProgress(data) {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return {};
  }
  const sanitized = Object.create(null);
  for (const [key, value] of Object.entries(data)) {
    if (typeof key === 'string' && value === true && !DANGEROUS_KEYS.has(key)) {
      sanitized[key] = true;
    }
  }
  return sanitized;
}

export function useProgress() {
  const [checked, setChecked] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? sanitizeProgress(JSON.parse(stored)) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // Storage full or unavailable
    }
  }, [checked]);

  const toggle = useCallback((id) => {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  }, []);

  const isChecked = useCallback((id) => {
    return !!checked[id];
  }, [checked]);

  const getCheckedCount = useCallback((ids) => {
    return ids.filter((id) => checked[id]).length;
  }, [checked]);

  const resetAll = useCallback(() => {
    setChecked({});
  }, []);

  const resetSection = useCallback((ids) => {
    setChecked((prev) => {
      const next = { ...prev };
      for (const id of ids) {
        delete next[id];
      }
      return next;
    });
  }, []);

  const checkAll = useCallback((ids) => {
    setChecked((prev) => {
      const next = { ...prev };
      for (const id of ids) {
        next[id] = true;
      }
      return next;
    });
  }, []);

  const exportProgress = useCallback(() => {
    const json = JSON.stringify(checked, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'soulframe-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [checked]);

  const importProgress = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          const sanitized = sanitizeProgress(data);
          if (Object.keys(sanitized).length === 0 && ev.target.result.trim() !== '{}') {
            alert('No valid progress entries found in file.');
            return;
          }
          setChecked(sanitized);
        } catch {
          alert('Invalid progress file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

  const totalChecked = Object.keys(checked).length;

  return {
    checked,
    toggle,
    isChecked,
    getCheckedCount,
    resetAll,
    resetSection,
    checkAll,
    exportProgress,
    importProgress,
    totalChecked,
  };
}
