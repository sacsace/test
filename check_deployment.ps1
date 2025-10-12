# Deployment Status Check Script
Write-Host "Deployment Status Check Starting..." -ForegroundColor Green

# Railway Server Status Check
Write-Host "`nRailway Backend Server Check:" -ForegroundColor Yellow
try {
    $railwayResponse = Invoke-WebRequest -Uri "https://test-production-asia-southeast1-eqsg3a.railway.app/api/health" -Method GET -UseBasicParsing -TimeoutSec 10
    Write-Host "Railway Server Response: $($railwayResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Response Content: $($railwayResponse.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "Railway Server Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Vercel Frontend Status Check
Write-Host "`nVercel Frontend Check:" -ForegroundColor Yellow
try {
    $vercelResponse = Invoke-WebRequest -Uri "https://test-drab-nu-15.vercel.app" -Method GET -UseBasicParsing -TimeoutSec 10
    Write-Host "Vercel Server Response: $($vercelResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Vercel Server Error: $($_.Exception.Message)" -ForegroundColor Red
}

# GitHub Repository Status Check
Write-Host "`nGitHub Repository Status:" -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "Uncommitted changes detected:" -ForegroundColor Yellow
        Write-Host $gitStatus -ForegroundColor Cyan
    } else {
        Write-Host "All changes are committed" -ForegroundColor Green
    }
    
    $lastCommit = git log --oneline -1
    Write-Host "Latest commit: $lastCommit" -ForegroundColor Cyan
} catch {
    Write-Host "Git status check error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nDeployment check completed!" -ForegroundColor Green
