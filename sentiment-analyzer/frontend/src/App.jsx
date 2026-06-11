import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [review, setReview] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzeSentiment = async () => {
    if (!review.trim()) {
      setError('Please enter a review to analyze.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
      const response = await axios.post(`${apiUrl}/predict`, {
        text: review
      })
      setResult(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to connect to the sentiment analyzer API. Ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const getSentimentDetails = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return { emoji: '😊', color: 'text-green-400', bg: 'bg-green-500' }
      case 'Negative':
        return { emoji: '😞', color: 'text-red-400', bg: 'bg-red-500' }
      case 'Neutral':
        return { emoji: '😐', color: 'text-yellow-400', bg: 'bg-yellow-500' }
      default:
        return { emoji: '🤔', color: 'text-gray-400', bg: 'bg-gray-500' }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-gray-100">
      <div className="max-w-xl w-full bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Sentiment Analyzer
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Enter a customer review below to predict its sentiment using AI.
        </p>

        <div className="mb-6">
          <textarea
            className="w-full bg-gray-900 border border-gray-600 rounded-xl p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-inner"
            rows="5"
            placeholder="E.g., The product quality is excellent and delivery was fast."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-900/30 p-3 rounded-lg border border-red-800">
            {error}
          </div>
        )}

        <button
          onClick={analyzeSentiment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Analyze Sentiment</span>
          )}
        </button>

        {result && (
          <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-700 animate-fade-in-up">
            <h2 className="text-lg font-medium text-gray-300 mb-4">Analysis Result</h2>
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400">Sentiment:</span>
              <div className={`flex items-center space-x-2 text-2xl font-bold ${getSentimentDetails(result.sentiment).color}`}>
                <span>{result.sentiment}</span>
                <span className="text-3xl">{getSentimentDetails(result.sentiment).emoji}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 text-sm">Confidence Score:</span>
                <span className="text-gray-300 text-sm font-semibold">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full ${getSentimentDetails(result.sentiment).bg} transition-all duration-1000 ease-out`}
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
