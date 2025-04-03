import { CampaignCard } from "@/components/campaign-card"
import { upcomingGroupSessions } from "@/data/group-sessions"

export function GroupSessions() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {upcomingGroupSessions.map((session, index) => (
        <CampaignCard
          key={index}
          {...session}
        />
      ))}
    </div>
  )
} 