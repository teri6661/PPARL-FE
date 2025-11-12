'use client';

import { useEffect } from 'react';

export default function Bootstrap() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then((bootstrap) => {
        console.log("Bootstrap JS loaded");

        // Aktifkan tooltip
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          new bootstrap.Tooltip(tooltipTriggerEl);
        });
      })
      .catch(err => {
        console.error("Failed to load Bootstrap JS:", err);
      });
  }, []);

  return null;
}
