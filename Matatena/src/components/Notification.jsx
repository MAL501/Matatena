"use client"

import { useState, useEffect } from "react"
import { NOTIFICATION_TYPES } from "../utils/constants"

const Notification = ({ type, message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)
  const [intervalId, setIntervalId] = useState(null)

  // Determinar el color según el tipo de notificación
  const getBackgroundColor = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "bg-green-100 border-green-500"
      case NOTIFICATION_TYPES.ERROR:
        return "bg-red-100 border-red-500"
      case NOTIFICATION_TYPES.WARNING:
        return "bg-yellow-100 border-yellow-500"
      case NOTIFICATION_TYPES.INFO:
      default:
        return "bg-blue-100 border-blue-500"
    }
  }

  const getTextColor = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "text-green-800"
      case NOTIFICATION_TYPES.ERROR:
        return "text-red-800"
      case NOTIFICATION_TYPES.WARNING:
        return "text-yellow-800"
      case NOTIFICATION_TYPES.INFO:
      default:
        return "text-blue-800"
    }
  }

  const getIcon = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )
      case NOTIFICATION_TYPES.ERROR:
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        )
      case NOTIFICATION_TYPES.WARNING:
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )
      case NOTIFICATION_TYPES.INFO:
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        )
    }
  }

  const getProgressColor = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "bg-green-500"
      case NOTIFICATION_TYPES.ERROR:
        return "bg-red-500"
      case NOTIFICATION_TYPES.WARNING:
        return "bg-yellow-500"
      case NOTIFICATION_TYPES.INFO:
      default:
        return "bg-blue-500"
    }
  }

  useEffect(() => {
    // Iniciar temporizador para la barra de progreso
    const totalSteps = 100
    const stepDuration = duration / totalSteps

    const id = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(id)
          setIsVisible(false)
          return 0
        }
        return prevProgress - 100 / totalSteps
      })
    }, stepDuration)

    setIntervalId(id)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [duration])

  useEffect(() => {
    if (!isVisible && onClose) {
      onClose()
    }
  }, [isVisible, onClose])

  const handleClose = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    setIsVisible(false)
    if (onClose) {
      onClose()
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ${getBackgroundColor()} border-l-4`}>
      <div className="relative overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`inline-flex ${getTextColor()} focus:outline-none focus:text-gray-500`}
                onClick={handleClose}
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Barra de progreso */}
        <div
          className={`h-1 ${getProgressColor()}`}
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </div>
    </div>
  )
}

export default Notification
