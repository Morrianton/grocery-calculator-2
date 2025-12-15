# Bootstrap an Angular PWA using the latest Angular CLI
# Run this from the repo root in PowerShell. It will scaffold `client/`.

Write-Host "Scaffolding Angular app in ./client (this requires network access)..."

# Create the project skeleton (skip installing to speed up if desired)
npx -y @angular/cli@latest new client --routing --style=css --skip-install

Set-Location client
Write-Host "Installing frontend dependencies..."
npm install

Write-Host "Adding PWA support..."
npx ng add @angular/pwa@latest --skip-confirmation

Write-Host "Angular PWA scaffold complete. Edit environments/environment.ts to point to your API (e.g. http://localhost:3000/api)."
