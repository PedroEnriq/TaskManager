import "./TeamMember.css"

function TeamMember({ name }) {
  return (
    <div className="member-avatar" title={name}>
      {name[0]?.toUpperCase() || "?"}
    </div>
  )
}

export default TeamMember