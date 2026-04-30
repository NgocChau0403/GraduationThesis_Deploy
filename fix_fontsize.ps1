$file = 'c:\[Graduation_Thesis]Prototype\Frontend\src\pages\HomePage.jsx'
$lines = Get-Content $file
$old = 'fontSize: "var(--desktop-hero-title-size)"'
$new = 'fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)"'
$updated = $lines | ForEach-Object { $_.Replace($old, $new) }
Set-Content $file $updated
$found = ($updated | Where-Object { $_ -match 'clamp\(1\.8rem' }).Count
Write-Host "Replaced $found line(s)"
