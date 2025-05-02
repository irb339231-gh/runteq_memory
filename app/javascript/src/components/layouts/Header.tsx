import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'

export default function Header() {
  const { isLogin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between bg-gray-300 p-4">
      <div className="text-2xl font-bold">
        <Link to="/" className="text-black no-underline">
          RUNTEQ memory
        </Link>
      </div>
      <nav>
        <ul className="m-0 flex list-none gap-4 p-0">
          {isLogin ? (
            <>
              <li>
                <Link
                  to="/memories"
                  className="text-base text-black no-underline hover:underline"
                >
                  思い出一覧
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-base text-black no-underline hover:underline"
                >
                  自分の思い出
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-base text-black no-underline hover:underline"
                >
                  ログアウト
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-base text-black no-underline hover:underline"
                >
                  ログイン
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-base text-black no-underline hover:underline"
                >
                  新規登録
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
