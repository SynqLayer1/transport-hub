import './globals.css';
'use client';

import { useState } from 'react';
import Head from 'next/head';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function FleetCompliancePage() {
  const [km, setKm] = useState<number>(0);
  const [maxKm, setMaxKm] = useState<number>(900);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const compliance = km <= maxKm ? 'Binnen de limiet' : 'Overschrijding';
  const complianceColor = km <= maxKm ? 'text-green-600' : 'text-red-600';

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        <title>FleetCompliance NL – Real‑time tachograaf‑ en cabotage‑monitoring</title>
        <meta name="description" content="Realtime compliance monitoring voor logistieke bedrijven. Voorkom boetes, optimaliseer routes en houd uw fleet in de gaten." />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold">FleetCompliance NL</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </header>

        {/* Hero */}
        <section className="px-6 py-12 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Real‑time tachograaf‑ en cabotage‑compliance
          </h2>
          <p className="text-lg mb-8">
            Voorkom boetes, houd uw chauffeurs in de gaten en optimaliseer routes met één
            overzichtelijk dashboard.
          </p>
          <a
            href="#simulator"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition"
          >
            Probeer de simulator
          </a>
        </section>

        {/* Simulator / Dashboard preview */}
        <section id="simulator" className="px-6 py-8 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Simuleer uw compliance
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input panel */}
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium">Afgelegde kilometers (per 24 uur)</span>
                <input
                  type="number"
                  min={0}
                  value={km}
                  onChange={e => setKm(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Maximale toegestane kilometers (cabotaagrenze)</span>
                <input
                  type="number"
                  min={0}
                  value={maxKm}
                  onChange={e => setMaxKm(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <div className="pt-4">
                <p className="text-lg font-medium">
                  Status:{' '}
                  <span className={complianceColor}>{compliance}</span>
                </p>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md p-4">
              <div className="w-full h-48 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                {/* Placeholder for grafiek / kaart */}
                Grafiek weergave (mockup)
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                In de volledige versie ziet u realtime kaarten, waarschuwingen en
                trendanalyses.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} FleetCompliance NL – Alle rechten voorbehouden.
        </footer>
      </main>
    </div>
  );
}