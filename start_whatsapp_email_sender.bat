@echo off
:init

START %windir%\system32\mstsc.exe

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
cd D:\Programming\Web-scraping\whatsapp-email-sender\whatsapp-email-sender-local-windows-7\
node ./dist/index.js || PAUSE