import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import SurveyModal from '../SurveyModal'
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

const renderSurveyModal = (props = {}) => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onModalClose: jest.fn(),
    ...props,
  }
  return render(
    <BrowserRouter>
      <SurveyModal {...defaultProps} />
    </BrowserRouter>
  )
}

describe('SurveyModal - Google Sheets Submission', () => {
  beforeEach(() => {
    fetch.mockClear()
    trackSurveyComplete.mockClear()
    trackSurveyInteraction.mockClear()
    
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
        statusText: 'OK',
      })

      renderSurveyModal()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/your business name/i), 'PT Test Company')
      await user.type(screen.getByPlaceholderText(/your industry/i), 'Technology')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.click(screen.getByLabelText(/yes, i want to join/i))
      await user.type(screen.getByPlaceholderText(/\+62xxxxxxxxxxx/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/your@email.com/i), 'john@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const fetchCall = fetch.mock.calls[0]
      expect(fetchCall[0]).toBe('https://script.google.com/macros/s/test/exec')

      const requestOptions = fetchCall[1]
      expect(requestOptions.method).toBe('POST')
      expect(requestOptions.redirect).toBe('follow')

      const bodyParams = new URLSearchParams(requestOptions.body)
      
      expect(bodyParams.get('timestamp')).toBeTruthy()
      expect(bodyParams.get('name')).toBe('John Doe')
      expect(bodyParams.get('businessName')).toBe('PT Test Company')
      expect(bodyParams.get('industry')).toBe('Technology')
      expect(bodyParams.get('legalEntity')).toBe('yes')
      expect(bodyParams.get('focus')).toBe('Finding investor for expansion')
      expect(bodyParams.get('interest')).toBe('yes')
      expect(bodyParams.get('seminarInterest')).toBe('join')
      expect(bodyParams.get('whatsapp')).toBe('+6281234567890')
      expect(bodyParams.get('email')).toBe('john@test.com')
      expect(bodyParams.get('contactPermission')).toBe('yes')
    })
  })

  describe('Failure Scenarios - Critical Issue: Missing JSON Response Check', () => {
    it('CRITICAL: Should handle HTTP 200 but with error in JSON (SurveyModal lacks this check)', async () => {
      const user = userEvent.setup()
      // This simulates a scenario where Google Apps Script returns 200 OK
      // but the JSON response indicates failure
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ ok: false, error: 'Failed to write to Google Sheet' }),
      })

      renderSurveyModal()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.type(screen.getByPlaceholderText(/\+62xxxxxxxxxxx/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/your@email.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      // NOTE: SurveyModal does NOT check JSON response like Survey does
      // This is a potential bug - it will show success even if Google Sheet write failed
      await waitFor(() => {
        // The modal will close and navigate to success page
        // even though the sheet write failed
        expect(trackSurveyComplete).toHaveBeenCalled()
      })

      // This test documents the issue - SurveyModal should check JSON response
      // Currently it only checks res.ok, not the JSON body
    })

    it('should handle network errors', async () => {
      const user = userEvent.setup()
      fetch.mockRejectedValueOnce(new Error('Network error'))

      renderSurveyModal()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.type(screen.getByPlaceholderText(/\+62xxxxxxxxxxx/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/your@email.com/i), 'test@test.com')
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
      })

      renderSurveyModal()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.type(screen.getByPlaceholderText(/\+62xxxxxxxxxxx/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/your@email.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(screen.getByText(/submission failed/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/http 500/i)).toBeInTheDocument()
      expect(trackSurveyComplete).not.toHaveBeenCalled()
    })
  })

  describe('Potential Data Loss Scenarios', () => {
    it('should handle timeout scenarios (request sent but no response)', async () => {
      const user = userEvent.setup()
      // Simulate a request that hangs
      fetch.mockImplementationOnce(() => 
        new Promise((resolve) => {
          // Never resolves - simulates timeout
          setTimeout(() => {
            resolve({
              ok: true,
              status: 200,
              statusText: 'OK',
            })
          }, 10000) // 10 second delay
        })
      )

      renderSurveyModal()

      await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.type(screen.getByPlaceholderText(/\+62xxxxxxxxxxx/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/your@email.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      // Button should be disabled during loading
      const submitButton = screen.getByRole('button', { name: /submitting/i })
      expect(submitButton).toBeDisabled()

      // Note: In real scenario, browser might timeout before this resolves
      // This could lead to data being sent but user seeing error
    })

    it('should preserve data encoding correctly', async () => {
      const user = userEvent.setup()
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
      })

      renderSurveyModal()

      // Test Unicode characters
      await user.type(screen.getByPlaceholderText(/your full name/i), '测试用户')
      await user.type(screen.getByPlaceholderText(/your business name/i), 'PT Perusahaan "Test" & Co.')
      await user.type(screen.getByPlaceholderText(/your industry/i), 'F&B / Retail')
      await user.type(screen.getByPlaceholderText(/\+62xxxxxxxxxxx/i), '+6281234567890')
      await user.type(screen.getByPlaceholderText(/your@email.com/i), 'test@test.com')
      await user.click(screen.getByLabelText(/yes \(pt\/cv\)/i))
      await user.click(screen.getByLabelText(/finding investor for expansion/i))
      await user.click(screen.getByLabelText(/yes, very interested/i))
      await user.click(screen.getByLabelText(/yes, you may/i))

      await user.click(screen.getByRole('button', { name: /submit survey/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })

      const bodyParams = new URLSearchParams(fetch.mock.calls[0][1].body)
      expect(bodyParams.get('name')).toBe('测试用户')
      expect(bodyParams.get('businessName')).toBe('PT Perusahaan "Test" & Co.')
      expect(bodyParams.get('industry')).toBe('F&B / Retail')
    })
  })
})

