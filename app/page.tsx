import './globals.css';
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ----- Types -----
type Vehicle = {
  id: string;
  name: string;
  licensePlate: string;
};

type Trip = {
  id: string;
  vehicleId: string;
  start: string; // ISO
  end: string; // ISO
  distanceKm: number;
  avgSpeedKmh: number;
};

type PocketBaseStatus = {
  ok: boolean;
  version: string;
  latencyMs: number;
};

// ----- Mock Data (replace with real API) -----
const mockVehicles: Vehicle[] = [
  { id: "v1", name: "Volvo FH16", licensePlate: "NL-AB-1234" },
  { id: "v2", name: "Scania R500", licensePlate: "NL-CD-5678" },
  { id: "v3", name: "MAN TGX", licensePlate: "NL-EF-9012" },
];

const mockTrips: Trip[] = [
  {
    id: "t1",
    vehicleId: "v1",
    start: "2024-10-01T08:00:00Z",
    end: "2024-10-01T12:30:00Z",
    distanceKm: 320,
    avgSpeedKmh: 80,
  },
  {
    id: "t2",
    vehicleId: "v2",
    start: "2024-10-02T06:15:00Z",
    end: "2024-10-02T10:45:00Z",
    distanceKm: 410,
    avgSpeedKmh: 95,
  },
  {
    id: "t3",
    vehicleId: "v1",
    start: "2024-10-03T09:00:00Z",
    end: "2024-10-03T13:20:00Z",
    distanceKm: 280,
    avgSpeedKmh: 78,
  },
];

// ----- Helper Functions -----
const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("nl-NL", {
    dateStyle: "short",
    timeStyle: "short",
  });

const filterTrips = (
  trips: Trip[],
  vehicleId: string,
  from: string,
  to: string
) => {
  return trips.filter((t) => {
    const withinVehicle = vehicleId ? t.vehicleId === vehicleId : true;
    const start = new Date(t.start);
    const afterFrom = from ? start >= new Date(from) : true;
    const beforeTo = to ? start <= new Date(to) : true;
    return withinVehicle && afterFrom && beforeTo;
  });
};

// ----- Components -----
function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          FleetCompliance NL – Volledige tachograaf‑monitoring
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Real‑time inzicht in uw vloot, cabotage‑waarschuwingen en
          compliance‑rapportage. Bespaar tijd, verminder risico’s en houd
          uw chauffeurs veilig.
        </p>
        <a
          href="#pricing"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Probeer nu
        </a>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Realtime Vlootstatus",
      description:
        "Bekijk direct de locatie, snelheid en rijtijden van elk voertuig.",
      icon: "/icons/realtime.svg",
    },
    {
      title: "Cabotage‑Waarschuwingen",
      description:
        "Automatische meldingen bij overtreding van cabotage‑regels.",
      icon: "/icons/cabotage.svg",
    },
    {
      title: "Gedetailleerde Rapportage",
      description:
        "Exporteer compliance‑rapporten in PDF, CSV of XLSX.",
      icon: "/icons/report.svg",
    },
    {
      title: "Integratie met PocketBase",
      description:
        "Self‑hosted backend voor volledige controle over uw data.",
      icon: "/icons/pocketbase.svg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Kernfunctionaliteit
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <Image
                src={f.icon}
                alt={f.title}
                width={48}
                height={48}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "€49",
      features: [
        "10 voertuigen",
        "Realtime monitoring",
        "Basisrapportage",
      ],
    },
    {
      name: "Professional",
      price: "€99",
      features: [
        "50 voertuigen",
        "Cabotage‑waarschuwingen",
        "Geavanceerde rapportage",
        "API‑toegang",
      ],
    },
    {
      name: "Enterprise",
      price: "Op aanvraag",
      features: [
        "Onbeperkt",
        "Dedicated support",
        "Custom integraties",
        "SLA‑garantie",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Kies uw abonnement</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border rounded-lg p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-base font-medium">/maand</span></p>
              <ul className="text-left mb-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f}>✔ {f}</li>
                ))}
              </ul>
              <a
                href="#dashboard"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Start nu
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PocketBaseStatusIndicator() {
  const [status, setStatus] = useState<PocketBaseStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const start = Date.now();
        const res = await fetch("/api/pb/status"); // endpoint moet in Next.js API route bestaan
        const data = await res.json();
        const latency = Date.now() - start;
        setStatus({ ok: res.ok, version: data.version, latencyMs: latency });
      } catch (e) {
        setError("Kan geen verbinding maken met PocketBase.");
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // elke 15 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-3 text-sm">
      {status ? (
        <>
          <span
            className={`w-3 h-3 rounded-full ${
              status.ok ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span>
            PocketBase v{status.version} – {status.latencyMs} ms
          </span>
        </>
      ) : error ? (
        <span className="text-red-600">{error}</span>
      ) : (
        <span className="text-gray-500">Status wordt geladen…</span>
      )}
    </div>
  );
}

function Dashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(mockTrips);
  const [totalKm, setTotalKm] = useState<number>(0);
  const [avgSpeed, setAvgSpeed] = useState<number>(0);

  useEffect(() => {
    const trips = filterTrips(mockTrips, selectedVehicle, dateFrom, dateTo);
    setFilteredTrips(trips);
    const km = trips.reduce((sum, t) => sum + t.distanceKm, 0);
    const speed = trips.length
      ? trips.reduce((sum, t) => sum + t.avgSpeedKmh, 0) / trips.length
      : 0;
    setTotalKm(km);
    setAvgSpeed(parseFloat(speed.toFixed(1)));
  }, [selectedVehicle, dateFrom, dateTo]);

  return (
    <section className="py-20 bg-gray-50" id="dashboard">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Dashboard – Real‑time Vlootmonitor
        </h2>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Alle voertuigen</option>
            {mockVehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.licensePlate})
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded p-2"
            placeholder="Van datum"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border rounded p-2"
            placeholder="Tot datum"
          />
          <button
            onClick={() => {
              setSelectedVehicle("");
              setDateFrom("");
              setDateTo("");
            }}
            className="bg-gray-200 hover:bg-gray-300 rounded p-2"
          >
            Reset
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-lg font-medium mb-2">Totale afstand</h4>
            <p className="text-2xl font-bold">{totalKm} km</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-lg font-medium mb-2">Gemiddelde snelheid</h4>
            <p className="text-2xl font-bold">{avgSpeed} km/u</p>
          </div>
          <div className="bg-white p-6 rounded shadow flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium mb-2">Verbonden met</h4>
              <PocketBaseStatusIndicator />
            </div>
          </div>
        </div>

        {/* Trips table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Voertuig
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Start
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Einde
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                  Afstand (km)
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                  Gem. snelheid (km/u)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTrips.map((trip) => {
                const vehicle = mockVehicles.find((v) => v.id === trip.vehicleId);
                return (
                  <tr key={trip.id}>
                    <td className="px-4 py-2">{vehicle?.name}</td>
                    <td className="px-4 py-2">{formatDate(trip.start)}</td>
                    <td className="px-4 py-2">{formatDate(trip.end)}</td>
                    <td className="px-4 py-2 text-right">{trip.distanceKm}</td>
                    <td className="px-4 py-2 text-right">{trip.avgSpeedKmh}</td>
                  </tr>
                );
              })}
              {filteredTrips.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    Geen ritten gevonden voor de gekozen filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="py-16 bg-indigo-600 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">
          Klaar om uw vloot te optimaliseren?
        </h2>
        <p className="mb-8 max-w-xl mx-auto">
          Start vandaag nog met een gratis proefperiode en ervaar direct
          de voordelen van volledige tachograaf‑monitoring.
        </p>
        <a
          href="#pricing"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Direct aanmelden
        </a>
      </div>
    </section>
  );
}

// ----- Main Page -----
export default function Page() {
  return (
    <main className="font-sans antialiased text-gray-900">
      <Hero />
      <Features />
      <Pricing />
      <Dashboard />
      <CallToAction />
    </main>
  );
}