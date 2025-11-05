# Google Ads Conversion Tracking Setup

## Overview
The success page (`/success`) has been created to track Google Ads conversions when users successfully submit the survey form.

## Setup Instructions

### 1. Get Your Google Ads Conversion Label

1. Go to [Google Ads](https://ads.google.com/)
2. Navigate to **Tools & Settings** > **Conversions**
3. Click on your conversion action (or create a new one)
4. Copy the **Conversion ID** and **Conversion Label**
   - Format: `AW-CONVERSION_ID/AW-CONVERSION_LABEL`
   - Example: `AW-123456789/AbCdEfGhIjKlMnOpQrStUvWxYz`

### 2. Set Environment Variable

Add your Google Ads conversion label to your environment variables:

**For Netlify:**
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add a new variable:
   - **Key**: `VITE_GOOGLE_ADS_CONVERSION_LABEL`
   - **Value**: `AW-CONVERSION_ID/AW-CONVERSION_LABEL` (your actual conversion label)

**For Local Development:**
Create a `.env` file in the root directory:
```
VITE_GOOGLE_ADS_CONVERSION_LABEL=AW-CONVERSION_ID/AW-CONVERSION_LABEL
```

### 3. Verify Conversion Tracking

1. Submit the survey form on your site
2. You should be redirected to `/success`
3. Open browser DevTools > Network tab
4. Look for requests to `google-analytics.com` or `googleads.g.doubleclick.net`
5. Check Google Ads dashboard for conversion data (may take 24-48 hours to appear)

## How It Works

1. User submits survey form
2. Upon successful submission, user is redirected to `/success`
3. The success page automatically:
   - Tracks a page view in Google Analytics
   - Fires a conversion event for Google Ads
   - Displays a success message

## Conversion Value (Optional)

If you want to track conversion values, you can modify the `trackGoogleAdsConversion` call in `src/components/Success.jsx`:

```javascript
trackGoogleAdsConversion(conversionLabel, 1000, 'IDR');
```

Where:
- `1000` = conversion value
- `'IDR'` = currency code

## Testing

To test conversion tracking:
1. Use Google Ads' [Conversion Tracking Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Or use Google Tag Assistant
3. Submit a test form and verify the conversion event fires

## Notes

- The success page is accessible at `/success`
- Conversion tracking only fires if the conversion label is properly configured
- The page can be accessed directly, but it's designed to be shown after form submission
- All form submissions redirect to `/success` for consistent conversion tracking

