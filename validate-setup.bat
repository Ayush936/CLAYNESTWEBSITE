@echo off
REM Color setup for Windows (using mode commands)
setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════════════════
echo    ClayNest - Deployment Fix Validation Tests
echo ════════════════════════════════════════════════════════════
echo.

REM Test 1: Check Node.js installation
echo [Test 1] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% equ 0 (
  for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
  echo ^✓ PASS: Node.js is installed: !NODE_VERSION!
) else (
  echo ^✗ FAIL: Node.js is not installed
)

REM Test 2: Check npm installation
echo [Test 2] Checking npm installation...
npm -v >nul 2>&1
if %errorlevel% equ 0 (
  for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
  echo ^✓ PASS: npm is installed: !NPM_VERSION!
) else (
  echo ^✗ FAIL: npm is not installed
)

REM Test 3: Check MySQL installation
echo [Test 3] Checking MySQL installation...
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
  echo ^✓ PASS: MySQL is installed
) else (
  echo ^✗ FAIL: MySQL is not installed
)

REM Test 4: Check backend\.env file
echo [Test 4] Checking backend .env file...
if exist "frontend\backend\.env" (
  echo ^✓ PASS: Backend .env file exists
) else (
  echo ^✗ FAIL: Backend .env file not found
)

REM Test 5: Check frontend\.env file
echo [Test 5] Checking frontend .env file...
if exist "frontend\.env" (
  echo ^✓ PASS: Frontend .env file exists
) else (
  echo ^✗ FAIL: Frontend .env file not found
)

REM Test 6: Check backend dependencies
echo [Test 6] Checking backend dependencies...
if exist "frontend\backend\node_modules" (
  echo ^✓ PASS: Backend dependencies installed
) else (
  echo ^✗ FAIL: Backend dependencies not installed
  echo   Run: cd frontend\backend ^&^& npm install
)

REM Test 7: Check frontend dependencies
echo [Test 7] Checking frontend dependencies...
if exist "frontend\node_modules" (
  echo ^✓ PASS: Frontend dependencies installed
) else (
  echo ^✗ FAIL: Frontend dependencies not installed
  echo   Run: cd frontend ^&^& npm install
)

REM Test 8: Check server.js has SPA routing
echo [Test 8] Checking server.js has SPA routing handler...
findstr /M "Catch-all route for React SPA" "frontend\backend\src\server.js" >nul
if %errorlevel% equ 0 (
  echo ^✓ PASS: Server has SPA routing handler
) else (
  echo ^✗ FAIL: Server missing SPA routing handler
)

REM Test 9: Check server.js has frontend serving
echo [Test 9] Checking server.js serves React build...
findstr /M "Serve React frontend in production" "frontend\backend\src\server.js" >nul
if %errorlevel% equ 0 (
  echo ^✓ PASS: Server configured to serve React build
) else (
  echo ^✗ FAIL: Server not configured to serve React build
)

REM Test 10: Check API configuration
echo [Test 10] Checking API configuration...
findstr /M "REACT_APP_API_URL" "frontend\.env" >nul
if %errorlevel% equ 0 (
  echo ^✓ PASS: Frontend API URL configured
) else (
  echo ^✗ FAIL: Frontend API URL not configured
)

echo.
echo ════════════════════════════════════════════════════════════
echo Validation Complete!
echo.
echo [NEXT STEPS]
echo.
echo Development Mode:
echo   1. Open Command Prompt 1: cd frontend\backend ^&^& npm run dev
echo   2. Open Command Prompt 2: cd frontend ^&^& npm start
echo   3. Visit http://localhost:3000
echo.
echo Production Mode:
echo   1. cd frontend ^&^& npm run build
echo   2. cd frontend\backend ^&^& set NODE_ENV=production ^&^& npm start
echo   3. Visit http://localhost:5000
echo.
echo ════════════════════════════════════════════════════════════
echo.
pause
