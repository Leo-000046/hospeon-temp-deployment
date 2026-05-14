import React, { useEffect, useState } from 'react';
import { MonoNumber } from '@/components/ui/MonoNumber';
const nowServing = {
  token: 'T-0042',
  initials: 'A. K.',
  doctor: 'Dr. Anjali Rao',
  room: 'Room 3 · Cardiology'
};
const nextInLine = [
{
  token: 'T-0043',
  initials: 'R. M.',
  doctor: 'Dr. Rao'
},
{
  token: 'T-0044',
  initials: 'K. I.',
  doctor: 'Dr. Rao'
},
{
  token: 'T-0045',
  initials: 'S. P.',
  doctor: 'Dr. Rao'
},
{
  token: 'T-0046',
  initials: 'M. J.',
  doctor: 'Dr. Rao'
}];

const otherDoctors = [
{
  doctor: 'Dr. Vikram Menon',
  room: 'Room 5',
  token: 'T-0050'
},
{
  doctor: 'Dr. Priya Khanna',
  room: 'Room 7',
  token: 'T-0061'
},
{
  doctor: 'Dr. Arjun Patel',
  room: 'Room 9',
  token: 'T-0072'
}];

export function QueueDisplay() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const date = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return (
    <div className="min-h-screen bg-canvas dark:bg-canvas-dark text-ink-primary dark:text-ink-primary-dark flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-8 lg:px-12 py-5 sm:py-8 border-b border-line dark:border-line-dark flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-accent flex items-center justify-center shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-semibold tracking-tight">
              Hospeon Clinic
            </div>
            <div className="text-sm sm:text-base text-ink-tertiary">
              Indiranagar · Bengaluru
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <MonoNumber className="text-3xl sm:text-4xl lg:text-5xl font-semibold tabular-nums">
            {time}
          </MonoNumber>
          <div className="text-sm sm:text-base text-ink-tertiary mt-1">
            {date}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8 lg:px-12 py-6 sm:py-10 lg:py-12">
        {/* Now serving */}
        <section className="flex flex-col">
          <div className="text-xs sm:text-sm uppercase tracking-[0.3em] text-ink-tertiary mb-4 sm:mb-6">
            Now serving
          </div>
          <div className="flex-1 rounded-3xl border-2 border-accent bg-accent-soft/40 p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 animate-pulse" />
            <div className="relative text-center">
              <MonoNumber className="block text-[5rem] sm:text-[7rem] lg:text-[9rem] leading-none font-bold text-accent tabular-nums">
                {nowServing.token}
              </MonoNumber>
              <div className="text-3xl sm:text-5xl lg:text-6xl font-semibold mt-4 sm:mt-6 tracking-tight">
                {nowServing.initials}
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl text-ink-secondary dark:text-ink-secondary-dark mt-4 sm:mt-6">
                {nowServing.doctor}
              </div>
              <div className="text-base sm:text-lg lg:text-xl text-ink-tertiary mt-1">
                {nowServing.room}
              </div>
            </div>
          </div>
        </section>

        {/* Next in line */}
        <section className="flex flex-col">
          <div className="text-xs sm:text-sm uppercase tracking-[0.3em] text-ink-tertiary mb-4 sm:mb-6">
            Next in line
          </div>
          <div className="flex-1 rounded-3xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark p-4 sm:p-6 lg:p-8 space-y-2 sm:space-y-3">
            {nextInLine.map((p, i) =>
            <div
              key={p.token}
              className={`flex items-center gap-3 sm:gap-6 px-3 sm:px-6 py-3 sm:py-5 rounded-2xl ${i === 0 ? 'bg-subtle dark:bg-subtle-dark' : ''}`}>
              
                <MonoNumber className="text-2xl sm:text-3xl lg:text-4xl font-semibold tabular-nums w-24 sm:w-32 lg:w-40 shrink-0">
                  {p.token}
                </MonoNumber>
                <div className="flex-1 min-w-0">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight truncate">
                    {p.initials}
                  </div>
                  <div className="text-sm sm:text-base text-ink-tertiary mt-0.5 sm:mt-1 truncate">
                    {p.doctor}
                  </div>
                </div>
                {i === 0 &&
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-accent font-semibold shrink-0">
                    Up next
                  </div>
              }
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Other doctors strip */}
      <section className="px-4 sm:px-8 lg:px-12 py-5 sm:py-6 border-t border-line dark:border-line-dark">
        <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-ink-tertiary mb-3">
          Other doctors
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          {otherDoctors.map((d) =>
          <div key={d.doctor} className="flex items-center gap-3 sm:gap-4">
              <MonoNumber className="text-xl sm:text-2xl font-semibold tabular-nums shrink-0">
                {d.token}
              </MonoNumber>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-medium truncate">
                  {d.doctor}
                </div>
                <div className="text-xs sm:text-sm text-ink-tertiary truncate">
                  {d.room}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ticker */}
      <footer className="bg-ink-primary dark:bg-surface-dark text-white dark:text-ink-primary-dark px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-sm sm:text-base">
          Please listen for your token. Average wait time today:{' '}
          <MonoNumber className="font-semibold">22 min</MonoNumber>.
        </div>
        <div className="text-xs sm:text-sm opacity-70">
          Wi-Fi: HospeonGuest · Pwd: welcome2026
        </div>
      </footer>
    </div>);

}