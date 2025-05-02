import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'

export default function HomePage() {
  const { isLogin } = useAuth()
  return (
    <div className="mx-auto max-w-[800px] p-8 text-center font-sans">
      <h1 className="mb-6 text-4xl text-gray-800">RUNTEQ memory</h1>
      <p className="mb-8 text-lg text-gray-600">思い出管理アプリです。</p>
      {isLogin ? (
        <Link
          to="/memories"
          className="inline-block rounded bg-blue-600 px-6 py-3 text-base text-white transition-colors duration-300 hover:bg-blue-800"
        >
          思い出一覧へ
        </Link>
      ) : (
        <Link
          to="/signup"
          className="inline-block rounded bg-blue-600 px-6 py-3 text-base text-white transition-colors duration-300 hover:bg-blue-800"
        >
          新規登録
        </Link>
      )}
    </div>
  )
}
