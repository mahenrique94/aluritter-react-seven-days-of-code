import { getDatabase, ref, set, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import * as uuid from 'uuid'
import App from '../layouts/App'

const Home = ({ app }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()
  const user = jwtDecode(localStorage.getItem('access-token'))

  useEffect(() => {
    onValue(ref(getDatabase(app), 'alurites'), snapshot => {
      const data = []
      snapshot.forEach(registry => {
        data.push({
          ...registry.val(),
          id: registry.key,
        })
      })
      setMessages(data)
    })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access-token')
    navigate('/sign-in')
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const db = getDatabase(app)
    set(ref(db, `alurites/${uuid.v4()}`), {
      message,
      by: user.email,
      when: new Date().getTime(),
    }).then(() => setMessage(''))
  }

  return (
    <App>
      <div className="flex justify-between px-5 py-2 border-b">
        <span className="font-sans text-lg text-sky-500 lowercase">Aluritter</span>
        <div>
          <span className="font-sans text-sm text-gray-500 mr-2">{user.email}</span>
          <button
            className="bg-red-500 text-white lowercase rounded px-2 py-1 text-sm hover:bg-red-600"
            onClick={handleLogout}
            type="button"
          >
            Sair
          </button>
        </div>
      </div>
      <div className="container mx-auto p-10">
        <form onSubmit={handleFormSubmit}>
          <p className="text-sm text-gray-600 pl-2">Alurite agora mesmo...</p>
          <div>
            <textarea
              className="border rounded w-full resize-none text-gray-500 p-5 my-2"
              maxLength={255}
              onChange={event => setMessage(event.target.value)}
              rows={3}
              value={message}
            />
          </div>
          <div className="flex justify-between">
            {message.length < 255
              ? <p className="text-sm text-green-600">Você ainda pode digitar {255-message.length} caracteres</p>
              : <p className="text-sm text-red-600">Você esgotou a quantidade de caracteres</p>
            }
            <button className="bg-sky-500 p-2 rounded text-white hover:bg-sky-600">aluritar</button>
          </div>
        </form>
        <div className="pt-5">
          {messages.sort((m1, m2) => m2.when - m1.when).map(m => (
            <div className="border-b p-2 first:border-t" key={m.id}>
              <p className="text-gray-500 py-2 mb-5">{m.message}</p>
              <div className="flex justify-between">
                <span className="text-sm text-sky-500">{m.by}</span>
                <time className="text-xs text-gray-500">{new Date(m.when).toLocaleString()}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </App>
  )
}

export default Home
