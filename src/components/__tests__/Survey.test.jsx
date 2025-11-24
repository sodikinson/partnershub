import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Survey from '../Survey'
import { trackSurveyComplete } from '../../utils/metaPixel'
import { trackSurveyInteraction } from '../../utils/googleAnalytics'

// Mock dependencies
jest.mock('../../utils/metaPixel', () => ({
  trackSurveyComplete: jest.fn(),
}))

jest.mock('../../utils/googleAnalytics', () => ({
  trackSurveyInteraction: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

// Mock fetch globally
global.fetch = jest.fn()

const renderSurvey = () => {
  return render(
    <BrowserRouter>
      <Survey />
    </BrowserRouter>
  )
}

describe('Survey - Google Sheets Submission', () => {
  beforeEach(() => {
    fetch.mockClear()
    trackSurveyComplete.mockClear()
    trackSurveyInteraction.mockClear()
    
    // Reset environment
    if (globalThis.import?.meta?.env) {
      globalThis.import.meta.env.DEV = false
      globalThis.import.meta.env.VITE_SURVEY_SCRIPT_URL = 'https://script.google.com/macros/s/test/exec'
    }
  })

  describe('Data Payload Validation', () => {
    it('should include all required fields in the submission payload', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      // Fill in all form fields
      await user.type(screen.getByPlaceholderText(/your full name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/e.g., PT Maju Jaya/i), 'PT Test Company')
      await user.type(screen.getByPlaceholderText(/e.g., F&B, Retail/i), 'Technology')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.click(screen.getByLabelText(/yes, i want to join/i))
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'john@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))
      await user.type(screen.getByPlaceholderText(/your company name/i), 'Test Corp')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567891')
      await user.type(screen.getByPlaceholderText(/any context/i), 'Test notes')

      // Submit form
      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      // Verify fetch was called with correct endpoint
      const fetchCall = fetch.mock.calls[0]
      expect(fetchCall[0]).toBe('https://script.google.com/macros/s/test/exec')

      // Verify request method and body
      const requestOptions = fetchCall[1]
      expect(requestOptions.method).toBe('POST')
      expect(requestOptions.redirect).toBe('follow')

      // Parse the URLSearchParams body
      const bodyParams = new URLSearchParams(requestOptions.body)
      
      // Verify all fields are present
      expect(bodyParams.get('timestamp')).toBeTruthy()
      expect(bodyParams.get('name')).toBe('John Doe')
      expect(bodyParams.get('businessName')).toBe('PT Test Company')
      expect(bodyParams.get('industry')).toBe('Technology')
      expect(bodyParams.get('legalEntity')).toBe('yes')
      expect(bodyParams.get('focus')).toBe('Finding investor for expansion')
      expect(bodyParams.get('focusOther')).toBe('')
      expect(bodyParams.get('interest')).toBe('yes')
      expect(bodyParams.get('seminarInterest')).toBe('join')
      expect(bodyParams.get('whatsapp')).toBe('+6281234567890')
      expect(bodyParams.get('email')).toBe('john@test.com')
      expect(bodyParams.get('contactPermission')).toBe('yes')
      expect(bodyParams.get('company')).toBe('Test Corp')
      expect(bodyParams.get('phone')).toBe('+6281234567891')
      expect(bodyParams.get('notes')).toBe('Test notes')
    })

    it('should handle conditional fields correctly (focusOther when focus is Others)', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Jane Doe')
      await user.click(screen.getByLabelText(/others/i))
      
      // Wait for the conditional input to appear
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/please specify/i)).toBeInTheDocument()
      })

      await user.type(screen.getByPlaceholderText(/please specify/i), 'Custom focus')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'jane@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      expect(bodyParams.get('focus')).toBe('Others')
      expect(bodyParams.get('focusOther')).toBe('Custom focus')
    })

    it('should set focusOther to empty string when focus is not Others', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      expect(bodyParams.get('focus')).toBe('Finding investor for expansion')
      expect(bodyParams.get('focusOther')).toBe('')
    })

    it('should handle seminarInterest conditionally based on interest value', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/not yet/i))
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      expect(bodyParams.get('interest')).toBe('not-yet')
      expect(bodyParams.get('seminarInterest')).toBe('')
    })

    it('should include timestamp in ISO format', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      const beforeSubmit = new Date().toISOString()
      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      const timestamp = bodyParams.get('timestamp')
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
      expect(new Date(timestamp).toISOString()).toBe(timestamp)
    })
  })

  describe('Failure Scenarios - Silent Failures', () => {
    it('should handle HTTP 200 response but with error in JSON body', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ ok: false, error: 'Failed to write to sheet' }),
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(screen.getByText(/submission failed/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/server reported failure/i)).toBeInTheDocument()
      // Should not track success events
      expect(trackSurveyComplete).not.toHaveBeenCalled()
    })

    it('should handle network error gracefully', async () => {
      const user = userEvent.setup()
      fetch.mockRejectedValueOnce(new Error('Network error'))

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(screen.getByText(/submission failed/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/network error/i)).toBeInTheDocument()
      expect(trackSurveyComplete).not.toHaveBeenCalled()
    })

    it('should handle HTTP error status codes', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Server error occurred',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(screen.getByText(/submission failed/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/http 500/i)).toBeInTheDocument()
      expect(trackSurveyComplete).not.toHaveBeenCalled()
    })

    it('should handle missing endpoint configuration', async () => {
      const user = userEvent.setup()
      if (globalThis.import?.meta?.env) {
        globalThis.import.meta.env.VITE_SURVEY_SCRIPT_URL = undefined
      }

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(screen.getByText(/submission failed/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/missing survey endpoint/i)).toBeInTheDocument()
      expect(fetch).not.toHaveBeenCalled()
    })

    it('should handle successful response without JSON content-type', async () => {
      const user = userEvent.setup()
      // Google Apps Script often returns HTML/text instead of JSON
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => '<html><body>Success</body></html>',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(trackSurveyComplete).toHaveBeenCalled()
      })

      // Should succeed even with HTML response
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should handle null/undefined values by converting to empty strings', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      // Fill only required fields, leave optional fields empty
      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      // Optional fields should be empty strings, not null or undefined
      expect(bodyParams.get('company')).toBe('')
      expect(bodyParams.get('phone')).toBe('')
      expect(bodyParams.get('notes')).toBe('')
    })
  })

  describe('Success Scenarios', () => {
    it('should track analytics events on successful submission', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/e.g., F&B, Retail/i), 'Technology')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(trackSurveyComplete).toHaveBeenCalledWith({
          industry: 'Technology',
          legalEntity: 'yes',
          focus: 'Finding investor for expansion',
          interest: 'yes',
        })
      })

      expect(trackSurveyInteraction).toHaveBeenCalledWith('complete', {
        industry: 'Technology',
        legal_entity: 'yes',
        focus: 'Finding investor for expansion',
        interest: 'yes',
      })
    })

    it('should clear form data after successful submission', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      const nameInput = screen.getByPlaceholderText(/your full name/i)
      await user.type(nameInput, 'Test User')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(nameInput.value).toBe('')
      })
    })
  })

  describe('Edge Cases - Potential Data Loss Scenarios', () => {
    it('should preserve all data even with special characters', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), "O'Brien & Co.")
      await user.type(screen.getByPlaceholderText(/e.g., PT Maju Jaya/i), 'PT "Test" Company')
      await user.type(screen.getByPlaceholderText(/any context/i), 'Notes with "quotes" & <tags>')
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      expect(bodyParams.get('name')).toBe("O'Brien & Co.")
      expect(bodyParams.get('businessName')).toBe('PT "Test" Company')
      expect(bodyParams.get('notes')).toBe('Notes with "quotes" & <tags>')
    })

    it('should handle very long text inputs', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => 'success',
      })

      const longText = 'A'.repeat(10000)

      renderSurvey()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.type(screen.getByPlaceholderText(/any context/i), longText)
      await user.type(screen.getByPlaceholderText(/\+62 812-3456-7890/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/john@example.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      expect(bodyParams.get('notes')).toBe(longText)
    })
  })
})

