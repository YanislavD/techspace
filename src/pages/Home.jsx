import { Link } from 'react-router-dom'
import EquipmentPreview from '../components/EquipmentPreview.jsx'

export default function Home() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1>TechSpace</h1>
        <p>
          Резервирай лаптопи, монитори, VR очила и друга техника от
          университетското co-working пространство — онлайн, за минути.
        </p>
      </div>

      <div className="equipment-header" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Налична техника</h2>
        <Link to="/equipment" style={{ color: 'var(--ink)', fontWeight: 600 }}>
          Виж целия каталог →
        </Link>
      </div>

      <EquipmentPreview />
    </div>
  )
}
