import {
  Users,
  MoreVertical,
  UserRound,
} from "lucide-react";

function TeamCard({ team, isHR = false }) {
  return (
    <div className="team-card">

      <div className="team-card-top">

        <div className="team-icon">
          <Users size={21} />
        </div>

        {isHR && (
          <button className="team-menu-button">
            <MoreVertical size={19} />
          </button>
        )}

      </div>

      <h3>{team.name}</h3>

      <p className="team-description">
        {team.description}
      </p>

      <div className="team-manager">

        <div className="small-avatar">
          {team.manager.charAt(0)}
        </div>

        <div>
          <span>Team Manager</span>
          <strong>{team.manager}</strong>
        </div>

      </div>

      <div className="team-card-footer">

        <div className="team-members-count">
          <UserRound size={15} />

          <span>
            {team.members} members
          </span>
        </div>

        <button className="view-team-button">
          View Team
        </button>

      </div>

    </div>
  );
}

export default TeamCard;