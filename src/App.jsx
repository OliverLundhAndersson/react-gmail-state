import { useState, useEffect } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [emailsToShow, setEmailsToShow] = useState(emails)
  const [hideRead, setHideRead] = useState(false)
  const [showStarred, setShowStarred] = useState(false)

  const toggleReadStatus = (index) => {
    const updatedEmails = emails.map((email, i) =>
      i === index ? { ...email, read: !email.read } : email
    )
    setEmails(updatedEmails)
  }

  const toggleStarredStatus = (index) => {
    const updatedEmails = emails.map((email, i) =>
      i === index ? { ...email, starred: !email.starred } : email
    )
    setEmails(updatedEmails)
  }

  useEffect(() => {
    let filteredEmails = emails;

    if (hideRead) {
      filteredEmails = filteredEmails.filter((email) => !email.read);
    }

    if (showStarred) {
      filteredEmails = filteredEmails.filter((email) => email.starred);
    }
      
    setEmailsToShow(filteredEmails);
  }, [emails, hideRead, showStarred])

  const toggleHideRead = () => {
    setHideRead(!hideRead)
  }

  const showAllEmails = () => {
    setShowStarred(false);
  };

  const toggleShowStarred = () => {
    setShowStarred(true);
  };

  const filterEmails = () => {
    if (hideRead) {
      const unreadEmails = emails.filter(email => !email.read)
      setEmailsToShow(unreadEmails)
    } else {
      setEmailsToShow(emails)
    }
  }

  const totalEmailsCount = emails.length;
  const starredEmailsCount = emails.filter((email) => email.starred).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${!showStarred ? 'active' : ''}`} 
            onClick={showAllEmails}>
            <span className="label">Inbox</span>
            <span className="count">{totalEmailsCount}</span> {/* Show total email count */}
          </li>
          <li
            className={`item ${showStarred ? 'active' : ''}`} 
            onClick={toggleShowStarred}>
            <span className="label">Starred</span>
            <span className="count">{starredEmailsCount}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {toggleHideRead(), filterEmails()}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{emailsToShow.map((email, index) => (
        <li 
        key={index}
        className={`email ${email.read ? 'read' : 'unread'}`}
        >
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onChange={() => toggleReadStatus(index)}/>
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={() => toggleStarredStatus(index)}
          />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
      ))}</main>
    </div>
  )
}

export default App
