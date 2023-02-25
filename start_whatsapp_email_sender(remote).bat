@echo off
:init

START D:\whatsapp-email-sender\Q301.rdp

set "started="
2>nul (
 9>"%~f0.lock" (
  set "started=1"
  call :start
 )
)
@if defined started (
    del "%~f0.lock" >nul 2>nul
)

exit /b


:start

D:
cd D:\whatsapp-email-sender\
node ./dist/index.js || PAUSE