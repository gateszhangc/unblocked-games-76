'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function ComingSoonPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  
  // 预定义的游戏信息
  const gameData: { [key: string]: { name: string; image: string } } = {
    'plonky': {
      name: 'Plonky',
      image: 'https://play-lh.googleusercontent.com/37iUpEXB3mkrYkL07ZZBxfOqDVKrNB9jWW5DYrI0-ChlTjLJ7s2zAcLnfNZ6hKYTh9Ze=w240-h480-rw'
    },
    'tung-sahur-clicker': {
      name: 'Tung Sahur Clicker',
      image: 'https://gamulo.com/wp-content/uploads/thumbs/custom/T/tung-tung-tung-sahur-clicker-logo-150x150.png'
    }
  }
  
  // 从URL参数获取游戏信息
  const gameParam = searchParams.get('game')
  const gameInfo = gameParam && gameData[gameParam]
    ? gameData[gameParam]
    : gameData['plonky'] // 默认显示plonky

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    const trimmedEmail = email.trim()
    
    if (!isValidEmail(trimmedEmail)) {
      setShowError(true)
      return
    }

    setShowError(false)
    setIsSubmitting(true)

    // 模拟API调用
    setTimeout(() => {
      setIsSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setShowError(false)
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Coming Soon - Game Preview</title>
        <style>{`
          :root {
            --theme-color: rgb(37, 150, 237);
            --card-shadow: #33333322;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            transition: .3s;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            background-attachment: fixed;
            min-height: 100vh;
          }

          body::before {
            content: '';
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            --bg-color: rgba(51, 255, 197, 0.404);
            background: linear-gradient(var(--bg-color), var(--bg-color));
            z-index: -1;
          }

          .mvn-container {
            max-width: 1890px;
            margin: 10px auto;
            padding: 0 20px;
          }

          .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            overflow: hidden;
            position: sticky;
            top: 10px;
            z-index: 99;
            box-shadow: 0 8px 24px var(--card-shadow);
            border: 1px solid rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            margin-bottom: 20px;
          }

          .navbar img {
            height: 50px;
            transition: transform 0.3s ease;
            cursor: pointer;
          }

          .navbar img:hover {
            transform: scale(1.08) rotate(5deg);
          }

          .coming-soon-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 600px;
            margin: 40px auto;
            padding: 40px;
            text-align: center;
            animation: fadeIn 0.3s ease-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .game-thumbnail {
            width: 200px;
            height: 200px;
            margin: 0 auto 24px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          }

          .game-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          h1 {
            font-size: 32px;
            color: #002b50;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .status-message {
            font-size: 20px;
            color: #555;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .status-icon {
            font-size: 24px;
          }

          .description {
            font-size: 16px;
            color: #666;
            margin-bottom: 32px;
            line-height: 1.6;
          }

          .email-form {
            margin: 32px 0;
          }

          .form-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #002b50;
            margin-bottom: 12px;
            text-align: left;
          }

          .email-input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #dcdcdc;
            border-radius: 12px;
            font-size: 16px;
            outline: none;
            background: #f0f5fc;
            transition: all 0.3s ease;
          }

          .email-input:focus {
            border-color: var(--theme-color);
            background: white;
          }

          .email-input.error {
            border-color: #dc3545;
          }

          .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 8px;
            text-align: left;
            display: none;
          }

          .error-message.show {
            display: block;
          }

          .button {
            width: 100%;
            padding: 14px 24px;
            background: var(--theme-color);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            margin-top: 16px;
            display: inline-block;
          }
          
          .button:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 24px rgba(21, 131, 249, 0.3);
          }

          .button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .button-secondary {
            background: transparent;
            color: var(--theme-color);
            border: 2px solid var(--theme-color);
            margin-top: 12px;
          }

          .button-secondary:hover {
            background: rgba(21, 131, 249, 0.1);
          }

          .success-message {
            background: #10b981;
            color: white;
            padding: 16px;
            border-radius: 12px;
            margin-top: 16px;
            display: none;
            animation: slideIn 0.3s ease-out;
          }

          .success-message.show {
            display: block;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            margin-left: 8px;
            vertical-align: middle;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .home-icon-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            transition: background 0.3s;
            cursor: pointer;
            border: none;
            background: transparent;
          }

          .home-icon-btn:hover {
            background: rgba(0, 0, 0, 0.05);
          }
          
          @media (max-width: 768px) {
            .coming-soon-container {
              padding: 30px 20px;
              margin: 20px auto;
            }

            h1 {
              font-size: 24px;
            }

            .game-thumbnail {
              width: 150px;
              height: 150px;
            }

            .status-message {
              font-size: 18px;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="mvn-container">


          {/* Coming Soon Page */}
          <div className="coming-soon-container">
            {/* Game Thumbnail */}
            <div className="game-thumbnail">
              <img src={gameInfo.image} alt={`${gameInfo.name} Game`} />
            </div>

            {/* Game Name */}
            <h1>{gameInfo.name}</h1>

            {/* Status Message */}
            <div className="status-message">
              <span className="status-icon">🚧</span>
              <span>This game is under development</span>
            </div>

            {/* Description */}
            <p className="description">
              We&apos;re working hard to bring you this amazing game. Leave your email below and we&apos;ll notify you as soon as it&apos;s ready to play!
            </p>

            {/* Email Subscription Form */}
            <form className="email-form" onSubmit={handleSubmit} style={{ display: isSuccess ? 'none' : 'block' }}>
              <label className="form-label" htmlFor="email">Get notified when it&apos;s ready:</label>
              <input 
                type="email" 
                id="email" 
                className={`email-input ${showError ? 'error' : ''}`}
                placeholder="Enter your email address"
                value={email}
                onChange={handleInputChange}
                required
                aria-invalid={showError}
                aria-describedby={showError ? 'errorMessage' : undefined}
              />
              <div className={`error-message ${showError ? 'show' : ''}`} id="errorMessage" role="alert" aria-live="polite">
                Please enter a valid email address
              </div>

              <button type="submit" className="button" disabled={isSubmitting}>
                <span>
                  {isSubmitting ? 'Subscribing' : 'Notify Me'}
                  {isSubmitting && <span className="loading-spinner"></span>}
                </span>
              </button>
            </form>

            {/* Success Message */}
            <div className={`success-message ${isSuccess ? 'show' : ''}`} role="alert" aria-live="polite">
              ✓ Thank you! We&apos;ll notify you when the game is ready.
            </div>

            {/* Back to Home Button */}
            <a href="/" className="button button-secondary">
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
