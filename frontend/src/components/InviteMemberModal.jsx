import { useState } from "react";
import {
  X,
  UserPlus,
  Mail,
  User,
  Building2,
} from "lucide-react";

function InviteMemberModal({
  isOpen,
  onClose,
  onInvite,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
    department: "Engineering",
  });

  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter the employee name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter the employee email.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (onInvite) {
      onInvite(formData);
    }

    setFormData({
      name: "",
      email: "",
      role: "employee",
      department: "Engineering",
    });

    setError("");

    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="invite-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================================
            MODAL HEADER
        ================================= */}

        <div className="invite-modal-header">

          <div className="invite-modal-title">

            <div className="invite-modal-icon">
              <UserPlus size={20} />
            </div>

            <div>
              <h2>Invite Member</h2>

              <p>
                Add a new employee to your
                organization.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>


        {/* ================================
            FORM
        ================================= */}

        <form
          className="invite-modal-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}

          <div className="modal-form-group">

            <label htmlFor="member-name">
              Employee Name
            </label>

            <div className="modal-input-wrapper">

              <User size={16} />

              <input
                id="member-name"
                name="name"
                type="text"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* Email */}

          <div className="modal-form-group">

            <label htmlFor="member-email">
              Email Address
            </label>

            <div className="modal-input-wrapper">

              <Mail size={16} />

              <input
                id="member-email"
                name="email"
                type="email"
                placeholder="employee@company.com"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* Role */}

          <div className="modal-form-group">

            <label htmlFor="member-role">
              Role
            </label>

            <select
              id="member-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="employee">
                Employee
              </option>

              <option value="team_manager">
                Team Manager
              </option>

              <option value="hr">
                HR
              </option>
            </select>

          </div>


          {/* Department */}

          <div className="modal-form-group">

            <label htmlFor="member-department">
              Department
            </label>

            <div className="modal-input-wrapper">

              <Building2 size={16} />

              <select
                id="member-department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="Engineering">
                  Engineering
                </option>

                <option value="Design">
                  Design
                </option>

                <option value="Marketing">
                  Marketing
                </option>

                <option value="HR">
                  HR
                </option>
              </select>

            </div>

          </div>


          {/* Error */}

          {error && (
            <div className="modal-error">
              {error}
            </div>
          )}


          {/* Footer */}

          <div className="invite-modal-footer">

            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-invite-button"
            >
              <UserPlus size={16} />
              Send Invitation
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default InviteMemberModal;