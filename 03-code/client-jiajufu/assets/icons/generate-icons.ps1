Add-Type -AssemblyName System.Drawing

$basePath = $PSScriptRoot
$size = 81

$icons = @(
    @{ name = "home"; shape = "house" },
    @{ name = "fabric"; shape = "grid" },
    @{ name = "about"; shape = "info" },
    @{ name = "contact"; shape = "phone" }
)

$colors = @(
    @{ suffix = ""; color = "#999999" },
    @{ suffix = "-active"; color = "#8B7355" }
)

foreach ($icon in $icons) {
    foreach ($c in $colors) {
        $bmp = New-Object System.Drawing.Bitmap($size, $size)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $g.Clear([System.Drawing.Color]::Transparent)

        $brush = New-Object System.Drawing.SolidBrush(
            [System.Drawing.ColorTranslator]::FromHtml($c.color)
        )
        $pen = New-Object System.Drawing.Pen($brush, 3)

        switch ($icon.shape) {
            "house" {
                $pts = @(
                    (New-Object System.Drawing.Point(40, 10)),
                    (New-Object System.Drawing.Point(70, 38)),
                    (New-Object System.Drawing.Point(60, 38)),
                    (New-Object System.Drawing.Point(60, 68)),
                    (New-Object System.Drawing.Point(20, 68)),
                    (New-Object System.Drawing.Point(20, 38)),
                    (New-Object System.Drawing.Point(10, 38)),
                    (New-Object System.Drawing.Point(40, 10))
                )
                $g.FillPolygon($brush, $pts)
            }
            "grid" {
                for ($r = 0; $r -lt 3; $r++) {
                    for ($col = 0; $col -lt 3; $col++) {
                        $x = 12 + $col * 22
                        $y = 12 + $r * 22
                        $g.FillRectangle($brush, $x, $y, 18, 18)
                    }
                }
            }
            "info" {
                $g.DrawEllipse($pen, 16, 16, 48, 48)
                $font = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Bold)
                $sf = New-Object System.Drawing.StringFormat
                $sf.Alignment = [System.Drawing.StringAlignment]::Center
                $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
                $rect = New-Object System.Drawing.RectangleF(0, 2, 81, 81)
                $g.DrawString("i", $font, $brush, $rect, $sf)
                $font.Dispose()
            }
            "phone" {
                $g.DrawEllipse($pen, 16, 16, 48, 48)
                $font = New-Object System.Drawing.Font("Segoe UI Symbol", 22, [System.Drawing.FontStyle]::Regular)
                $sf = New-Object System.Drawing.StringFormat
                $sf.Alignment = [System.Drawing.StringAlignment]::Center
                $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
                $rect = New-Object System.Drawing.RectangleF(0, 0, 81, 81)
                $g.DrawString([char]0x260E, $font, $brush, $rect, $sf)
                $font.Dispose()
            }
        }

        $filePath = Join-Path $basePath "$($icon.name)$($c.suffix).png"
        $bmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose()
        $bmp.Dispose()
        Write-Host "Created: $filePath"
    }
}

Write-Host "All icons generated!"
