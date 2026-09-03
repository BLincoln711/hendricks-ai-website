import { cn } from '@/lib/utils/cn'

export type OperatingLayerParticipant = {
  name: string
  role: string
}

/**
 * Collaboration visual for For Brands (content/pages/09 §Collaboration visual).
 *
 * The brief is explicit that this must not imply Hendricks owns every execution
 * channel, so the participants sit side by side as peers and Hendricks is shown
 * as one contributor into a shared operating layer rather than above the others.
 */
export function OperatingLayer({
  participants,
  layerName,
  layerDescription,
  className,
}: {
  participants: readonly OperatingLayerParticipant[]
  layerName: string
  layerDescription: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'flex flex-col gap-4 border border-rule p-6 md:p-8',
        className,
      )}
    >
      <ul className="grid gap-3 sm:grid-cols-3">
        {participants.map((participant) => (
          <li
            key={participant.name}
            className="flex flex-col gap-1.5 border border-rule p-4"
          >
            <span className="text-[1rem] leading-snug font-medium text-ink">
              {participant.name}
            </span>
            <span className="text-[0.8125rem] leading-relaxed text-ink-2">
              {participant.role}
            </span>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="flex justify-around px-6">
        {participants.map((participant) => (
          <span
            key={participant.name}
            className="h-5 w-px bg-rule"
          />
        ))}
      </div>

      <div className="flex flex-col gap-1.5 border border-path p-5">
        <span className="text-[1.0625rem] font-medium text-ink">{layerName}</span>
        <span className="text-[0.875rem] leading-relaxed text-ink-2">
          {layerDescription}
        </span>
      </div>
    </figure>
  )
}
