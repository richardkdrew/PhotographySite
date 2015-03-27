@if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

:: ----------------------
:: KUDU Deployment Script
:: Version: 0.1.11
:: ----------------------

:: Prerequisites
:: -------------

:: Verify node.js installed
where node 2>nul >nul
IF %ERRORLEVEL% NEQ 0 (
  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
  goto error
)

:: Setup
:: -----

setlocal enabledelayedexpansion

SET ARTIFACTS=%~dp0%..\artifacts

IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%.
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)

IF NOT DEFINED NEXT_MANIFEST_PATH (
  SET NEXT_MANIFEST_PATH=%ARTIFACTS%\manifest

  IF NOT DEFINED PREVIOUS_MANIFEST_PATH (
    SET PREVIOUS_MANIFEST_PATH=%ARTIFACTS%\manifest
  )
)

IF NOT DEFINED KUDU_SYNC_CMD (
  :: Install kudu sync
  echo Installing Kudu Sync
  call npm install kudusync -g --silent
  IF !ERRORLEVEL! NEQ 0 goto error

  :: Locally just running "kuduSync" would also work
  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
)
goto Deployment

:: Utility Functions
:: -----------------

:SelectNodeVersion

IF DEFINED KUDU_SELECT_NODE_VERSION_CMD (
  :: The following are done only on Windows Azure Websites environment
  call %KUDU_SELECT_NODE_VERSION_CMD% "%DEPLOYMENT_SOURCE%" "%DEPLOYMENT_TARGET%" "%DEPLOYMENT_TEMP%"
  IF !ERRORLEVEL! NEQ 0 goto error

  IF EXIST "%DEPLOYMENT_TEMP%\__nodeVersion.tmp" (
    SET /p NODE_EXE=<"%DEPLOYMENT_TEMP%\__nodeVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )

  IF EXIST "%DEPLOYMENT_TEMP%\__npmVersion.tmp" (
    SET /p NPM_JS_PATH=<"%DEPLOYMENT_TEMP%\__npmVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )

  IF NOT DEFINED NODE_EXE (
    SET NODE_EXE=node
  )

  SET NPM_CMD="!NODE_EXE!" "!NPM_JS_PATH!"
) ELSE (
  SET NPM_CMD=npm
  SET NODE_EXE=node
)

goto :EOF

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: ----------

:Deployment
echo Handling node.js deployment.
echo %DEPLOYMENT_SOURCE%

:: 1. Select node version
call :SelectNodeVersion

:: 2. Install npm packages
echo Installing npm build dependencies.
IF EXIST "%DEPLOYMENT_SOURCE%\package.json" (
  pushd "%DEPLOYMENT_SOURCE%"
  echo Start npm build dependency install %TIME%

  call !NPM_CMD! install grunt grunt-angular-templates grunt-asset-injector grunt-autoprefixer grunt-concurrent grunt-contrib-clean grunt-contrib-concat
  ::call !NPM_CMD! install grunt-contrib-copy
  ::call !NPM_CMD! install grunt-contrib-cssmin
  ::call !NPM_CMD! install grunt-contrib-htmlmin
  ::call !NPM_CMD! install grunt-contrib-imagemin
  ::call !NPM_CMD! install grunt-contrib-less
  ::call !NPM_CMD! install grunt-contrib-uglify
  ::call !NPM_CMD! install grunt-google-cdn
  ::call !NPM_CMD! install grunt-ng-annotate,
  ::call !NPM_CMD! install grunt-rev
  ::call !NPM_CMD! install grunt-svgmin
  ::call !NPM_CMD! install grunt-usemin
  ::call !NPM_CMD! install grunt-wiredep
  ::call !NPM_CMD! install jit-grunt
  ::call !NPM_CMD! install jshint-stylish
  ::call !NPM_CMD! install time-grunt

  echo Finish npm build dependency install %TIME%
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)

:: 3. Install bower packages
echo Installing bower dependencies.
IF EXIST "%DEPLOYMENT_SOURCE%\bower.json" (
  pushd "%DEPLOYMENT_SOURCE%"
  echo Start bower install %TIME%
  call :ExecuteCmd !NPM_CMD! install bower
  echo Finish bower install %TIME%
  echo Start bower dependency install %TIME%
  call :ExecuteCmd "%NODE_EXE%" node_modules\bower\bin\bower install
  echo Finish bower dependency install %TIME%
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)

:: 4. Run Grunt
echo Running grunt build.
IF EXIST "%DEPLOYMENT_SOURCE%\Gruntfile.js" (
  pushd "%DEPLOYMENT_SOURCE%"
  echo Start grunt install %TIME%
  call :ExecuteCmd !NPM_CMD! install grunt-cli
  echo Finish grunt install %TIME%
  echo Start grunt build %TIME%
  call :ExecuteCmd "%NODE_EXE%" node_modules\grunt-cli\bin\grunt build --no-color
  echo Finish grunt build %TIME%
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)

:: 5. KuduSync
echo Running KuduSync.
IF /I "%IN_PLACE_DEPLOYMENT%" NEQ "1" (
  call :ExecuteCmd "%KUDU_SYNC_CMD%" -v 50 -f "%DEPLOYMENT_SOURCE%\dist" -t "%DEPLOYMENT_TARGET%" -n "%NEXT_MANIFEST_PATH%" -p "%PREVIOUS_MANIFEST_PATH%" -i ".git;.hg;.deployment;deploy.cmd"
  IF !ERRORLEVEL! NEQ 0 goto error
)

:: 6. Install npm packages
echo Installing prod npm dependencies.
IF EXIST "%DEPLOYMENT_TARGET%\package.json" (
  pushd "%DEPLOYMENT_TARGET%"
  echo Start npm dependency install %TIME%
  call :ExecuteCmd !NPM_CMD! install --production
  echo Finish npm prod dependency install %TIME%
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:: Post deployment stub
IF DEFINED POST_DEPLOYMENT_ACTION call "%POST_DEPLOYMENT_ACTION%"
IF !ERRORLEVEL! NEQ 0 goto error

goto end

:: Execute command routine that will echo out when error
:ExecuteCmd
setlocal
set _CMD_=%*
call %_CMD_%
if "%ERRORLEVEL%" NEQ "0" echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
exit /b %ERRORLEVEL%

:error
endlocal
echo An error has occurred during web site deployment %TIME%
call :exitSetErrorLevel
call :exitFromFunction 2>nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal
echo Finished successfully %TIME%
