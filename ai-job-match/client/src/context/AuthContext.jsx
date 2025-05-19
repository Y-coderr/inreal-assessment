import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../services/auth.service'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in via token
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setCurrentUser(userData)
        } catch (error) {
          console.error('Failed to load user:', error)
          logout()
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [token])

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      setToken(response.token)
      localStorage.setItem('token', response.token)
      setCurrentUser(response.user)
      toast.success('Registration successful!')
      navigate('/profile')
      return response
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      setToken(response.token)
      localStorage.setItem('token', response.token)
      setCurrentUser(response.user)
      toast.success('Login successful!')
      navigate('/')
      return response
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setCurrentUser(null)
    toast.info('Logged out')
    navigate('/login')
  }

  const value = {
    currentUser,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext