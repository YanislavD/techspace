const labels = {
  available: 'На разположение',
  booked: 'Резервирана',
  maintenance: 'В поддръжка',
}

function StatusBadge({ status }) {
  return (
    <span className="status-badge" data-status={status}>
      {labels[status] ?? status}
    </span>
  )
}

export default StatusBadge
