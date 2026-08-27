$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Listening on http://localhost:8080/"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    $request = $context.Request
    
    $localPath = "C:\Users\52264\OneDrive\Desktop\sih" + $request.Url.LocalPath.Replace('/', '\')
    if ($localPath -eq "C:\Users\52264\OneDrive\Desktop\sih\") { $localPath = "C:\Users\52264\OneDrive\Desktop\sih\index.html" }
    
    if (Test-Path $localPath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($localPath)
        $response.ContentLength64 = $content.Length
        
        if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html" }
        elseif ($localPath.EndsWith(".css")) { $response.ContentType = "text/css" }
        elseif ($localPath.EndsWith(".js") -or $localPath.EndsWith(".jsx")) { $response.ContentType = "application/javascript" }
        
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
    }
    $response.Close()
}
