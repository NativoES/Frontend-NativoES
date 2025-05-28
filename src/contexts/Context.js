'use client'

import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext
} from 'react'

import { initialData } from './initialData.js' // Asegúrate de que este archivo sea .js y exporte un objeto válido

const AppContext = createContext(undefined)

export function AppProvider({ children }) {
  // --- Estados generales ---
  const [user, setUser] = useState(undefined)
  const [userDB, setUserDB] = useState(undefined)
  const [select, setSelect] = useState(false)
  const [loader, setLoader] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [navItem, setNavItem] = useState('')
  const [success, setSuccess] = useState('')

  const setUserSuccess = (data) => {
    if (success === '') {
      setSuccess(data)
      const timer = setTimeout(() => {
        setSuccess('')
        console.log('timer')
        clearTimeout(timer)
      }, 6000)
    }
  }

  // --- Datos del sitio ---
  const [siteData, setSiteData] = useState(() => {
    const savedData = localStorage.getItem('nativoes-site-data')
    return savedData ? JSON.parse(savedData) : initialData
  })

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('nativoes-dark-mode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    localStorage.setItem('nativoes-site-data', JSON.stringify(siteData))
  }, [siteData])

  useEffect(() => {
    localStorage.setItem('nativoes-dark-mode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const updateSiteData = (newData) => {
    setSiteData(newData)
    setHasUnsavedChanges(true)
  }

  const updateSection = (section, data) => {
    setSiteData((prev) => ({
      ...prev,
      [section]: data
    }))
    setHasUnsavedChanges(true)
  }

  const resetToDefault = () => {
    setSiteData(initialData)
    setHasUnsavedChanges(true)
  }

  const markChangesSaved = () => {
    setHasUnsavedChanges(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  const value = useMemo(() => ({
    // General
    user,
    setUser,
    userDB,
    setUserDB,
    select,
    setSelect,
    navItem,
    setNavItem,
    isOpenModal,
    setIsOpenModal,
    loader,
    setLoader,
    success,
    setUserSuccess,

    // Sitio
    siteData,
    updateSiteData,
    updateSection,
    resetToDefault,
    hasUnsavedChanges,
    markChangesSaved,
    isDarkMode,
    toggleDarkMode
  }), [
    user, userDB, select, navItem, isOpenModal, loader, success,
    siteData, hasUnsavedChanges, isDarkMode
  ])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
