# Price Comparison Website

A full-stack MERN application that compares prices of products from Flipkart and Amazon.

## Features

- Search for products across Flipkart and Amazon
- Real-time price comparison
- Caching of search results for 30 minutes
- Responsive UI with Ant Design

## Tech Stack

### Frontend
- Vite + React
- Ant Design for UI components
- Axios for API requests

### Backend
- Node.js + Express
- MongoDB with Mongoose
- Web scraping with Cheerio (Flipkart) and Puppeteer (Amazon)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/price-comparison
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/compare?query=<search-term>` - Compare prices from Flipkart and Amazon

## Future Enhancements

- Add more e-commerce platforms (Croma, Snapdeal, etc.)
- Implement user authentication and saved searches
- Add price history tracking
- Implement product filtering and sorting options
