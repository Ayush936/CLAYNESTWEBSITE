#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}   ClayNest - Deployment Fix Validation Tests${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}\n"

# Function to print test result
test_result() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✅ PASS${NC}: $2"
  else
    echo -e "${RED}❌ FAIL${NC}: $2"
  fi
}

# Test 1: Check Node.js installation
echo -e "${YELLOW}[Test 1]${NC} Checking Node.js installation..."
if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v)
  test_result 0 "Node.js is installed: $NODE_VERSION"
else
  test_result 1 "Node.js is not installed"
fi

# Test 2: Check npm installation
echo -e "${YELLOW}[Test 2]${NC} Checking npm installation..."
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm -v)
  test_result 0 "npm is installed: $NPM_VERSION"
else
  test_result 1 "npm is not installed"
fi

# Test 3: Check MySQL installation
echo -e "${YELLOW}[Test 3]${NC} Checking MySQL installation..."
if command -v mysql &> /dev/null; then
  test_result 0 "MySQL is installed"
else
  test_result 1 "MySQL is not installed"
fi

# Test 4: Check backend/.env file
echo -e "${YELLOW}[Test 4]${NC} Checking backend .env file..."
if [ -f "frontend/backend/.env" ]; then
  test_result 0 "Backend .env file exists"
else
  test_result 1 "Backend .env file not found"
fi

# Test 5: Check frontend/.env file
echo -e "${YELLOW}[Test 5]${NC} Checking frontend .env file..."
if [ -f "frontend/.env" ]; then
  test_result 0 "Frontend .env file exists"
else
  test_result 1 "Frontend .env file not found"
fi

# Test 6: Check backend dependencies
echo -e "${YELLOW}[Test 6]${NC} Checking backend dependencies..."
if [ -d "frontend/backend/node_modules" ]; then
  test_result 0 "Backend dependencies installed"
else
  test_result 1 "Backend dependencies not installed - run: cd frontend/backend && npm install"
fi

# Test 7: Check frontend dependencies
echo -e "${YELLOW}[Test 7]${NC} Checking frontend dependencies..."
if [ -d "frontend/node_modules" ]; then
  test_result 0 "Frontend dependencies installed"
else
  test_result 1 "Frontend dependencies not installed - run: cd frontend && npm install"
fi

# Test 8: Check server.js has SPA routing
echo -e "${YELLOW}[Test 8]${NC} Checking server.js has SPA routing handler..."
if grep -q "Catch-all route for React SPA" "frontend/backend/src/server.js"; then
  test_result 0 "Server has SPA routing handler"
else
  test_result 1 "Server missing SPA routing handler"
fi

# Test 9: Check server.js has frontend serving
echo -e "${YELLOW}[Test 9]${NC} Checking server.js serves React build..."
if grep -q "Serve React frontend in production" "frontend/backend/src/server.js"; then
  test_result 0 "Server configured to serve React build"
else
  test_result 1 "Server not configured to serve React build"
fi

# Test 10: Check API configuration
echo -e "${YELLOW}[Test 10]${NC} Checking API configuration..."
if grep -q "REACT_APP_API_URL" "frontend/.env"; then
  test_result 0 "Frontend API URL configured"
else
  test_result 1 "Frontend API URL not configured"
fi

echo -e "\n${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Validation Complete!${NC}\n"

echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. cd frontend/backend && npm run dev"
echo "2. cd frontend && npm start (in new terminal)"
echo "3. Visit http://localhost:3000"
echo ""
echo -e "${YELLOW}For Production:${NC}"
echo "1. cd frontend && npm run build"
echo "2. cd frontend/backend && NODE_ENV=production npm start"
echo "3. Visit http://localhost:5000"
echo -e "\n${YELLOW}═══════════════════════════════════════════════════════════${NC}\n"
