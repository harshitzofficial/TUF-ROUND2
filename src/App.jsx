import './App.css';
import { useTheme } from './hooks/useTheme';
import Dashboard from './components/Dashboard';

export default function App() {
  const [dark, toggleTheme] = useTheme();
  return <Dashboard dark={dark} onToggleTheme={toggleTheme} />;
}
