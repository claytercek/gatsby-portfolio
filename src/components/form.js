import React, { useState } from "react"
import { css } from "@emotion/core"

function Form() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const [success, setSuccess] = useState(false)

  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", name, email, message }),
    })
      .then(() => setSuccess(true))
      .catch(error => alert(error))

    e.preventDefault()
  }

  return (
    <div
      css={formStyle}
      className="l-fullWidth l-mainPad"
      data-netlify-honeypot="bot-field"
    >
      <h2>Want to work together?</h2>
      {(success && <p>Your message has been received! I will reach out to discuss next steps as soon as possible.</p>) || (
        <form name="contact" data-netlify="true" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label htmlFor="input-name" className="u-sr-only">
              Name:
            </label>
            <input
              id="input-name"
              name="name"
              autoComplete="name"
              required
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="input-email" className="u-sr-only">
              Email:
            </label>
            <input
              id="input-email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="must be a valid email"
              autoComplete="email"
              required
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="input-message" className="u-sr-only">
              Message:
            </label>
            <textarea
              id="input-message"
              name="message"
              required
              placeholder="Message"
              rows="4"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </p>

          <p>
            <input type="submit" />
          </p>
        </form>
      )}
    </div>
  )
}

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const formStyle = theme => css`
  background-color: ${theme.colors.accent};
  margin-bottom: 0;
  margin-top: ${theme.pad * 4}px;
  padding-top: ${theme.pad * 1.5}px;
  padding-bottom: ${theme.pad * 2.5}px;
  color: ${theme.colors.bg};

  * {
    max-width: none !important;
  }

  form {
    p:last-child {
      width: 100%;
      margin-bottom: 0;
      display: flex;
      justify-content: flex-end;
    }

    input,
    textarea {
      width: 100%;
      background: ${theme.colors.bg}33;
      border: none;
      font-size: 1rem;
      padding: ${theme.pad}px;
      margin: 0;
      color: ${theme.colors.bg};

      &::placeholder {
        color: ${theme.colors.bg}99;
      }
    }

    input[type="submit"] {
      width: auto;
      align: right;
      color: ${theme.colors.accent};
      background: ${theme.colors.bg};
      font-weight: 700;
      width: 200px;
    }
  }
`

export default Form
