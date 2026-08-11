import {
  Users,
  MoreVertical,
  UserRound,
} from "lucide-react";

function GroupCard({ group, isHR = false }) {
  return (
    <div className="group-card">

      <div className="group-card-top">

        <div className="group-icon">
          <Users size={21} />
        </div>

        {isHR && (
          <button
            className="group-menu-button"
            type="button"
          >
            <MoreVertical size={18} />
          </button>
        )}

      </div>

      <h3>{group.name}</h3>

      <p className="group-description">
        {group.description}
      </p>

      <div className="group-owner">

        <div className="group-avatar">
          {group.owner.charAt(0)}
        </div>

        <div>
          <span>Group Owner</span>
          <strong>{group.owner}</strong>
        </div>

      </div>

      <div className="group-card-footer">

        <div className="group-members-count">
          <UserRound size={15} />
          <span>{group.members} members</span>
        </div>

        <button
          className="view-group-button"
          type="button"
        >
          View Group
        </button>

      </div>

    </div>
  );
}

export default GroupCard;