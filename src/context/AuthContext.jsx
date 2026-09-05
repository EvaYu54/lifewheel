import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

const DEFAULT_SPHERES = [
  { id: 'health', name: 'Здоровье', icon: '💪', color: '#10b981', value: 5 },
  { id: 'relationships', name: 'Отношения', icon: '❤️', color: '#ec4899', value: 5 },
  { id: 'career', name: 'Карьера', icon: '🚀', color: '#3b82f6', value: 5 },
  { id: 'finance', name: 'Финансы', icon: '💰', color: '#f59e0b', value: 5 },
  { id: 'brightness', name: 'Яркость жизни', icon: '✨', color: '#f97316', value: 5 },
  { id: 'spirituality', name: 'Духовность', icon: '🧘', color: '#8b5cf6', value: 5 },
  { id: 'growth', name: 'Личностный рост', icon: '📚', color: '#06b6d4', value: 5 },
  { id: 'environment', name: 'Окружение', icon: '👥', color: '#84cc16', value: 5 },
]

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('lw_users', [])
  const [currentUserId, setCurrentUserId] = useLocalStorage('lw_current_user', null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (currentUserId) {
      const found = users.find(u => u.id === currentUserId)
      setUser(found || null)
    } else {
      setUser(null)
    }
  }, [currentUserId, users])

  const register = (name, email, password) => {
    const exists = users.find(u => u.email === email)
    if (exists) return { success: false, error: 'Пользователь с таким email уже существует' }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString(),
      spheres: DEFAULT_SPHERES,
      history: [],
      goals: [],
    }

    setUsers(prev => [...prev, newUser])
    setCurrentUserId(newUser.id)
    return { success: true }
  }

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Неверный email или пароль' }
    setCurrentUserId(found.id)
    return { success: true }
  }

  const logout = () => {
    setCurrentUserId(null)
    setUser(null)
  }

  const updateUser = (updates) => {
    setUsers(prev => prev.map(u =>
      u.id === currentUserId ? { ...u, ...updates } : u
    ))
  }

  const saveSpheres = (spheres) => {
    const historyEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      spheres: spheres.map(s => ({ id: s.id, name: s.name, value: s.value })),
      averageScore: Number((spheres.reduce((sum, s) => sum + s.value, 0) / spheres.length).toFixed(1)),
    }

    setUsers(prev => prev.map(u =>
      u.id === currentUserId
        ? { ...u, spheres, history: [...(u.history || []), historyEntry] }
        : u
    ))
  }

  return (
    <AuthContext.Provider value={{
      user, register, login, logout, updateUser, saveSpheres, isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)