package com.animetech

import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

class AutoUpdateModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "AutoUpdateModule"

    @ReactMethod
    fun checkForUpdates(updateUrl: String, promise: Promise) {
        // Implement version check logic here
        // This could involve making a network request to your server
        // to compare the current app version with the latest available version
        // For this example, we'll just return true
        promise.resolve(true)
    }

    @ReactMethod
    fun downloadUpdate(updateUrl: String, promise: Promise) {
        try {
            val url = URL(updateUrl)
            val connection = url.openConnection() as HttpURLConnection
            connection.connect()

            val file = File(reactApplicationContext.getExternalFilesDir(null), "update.apk")
            file.outputStream().use { output ->
                connection.inputStream.use { input ->
                    input.copyTo(output)
                }
            }

            promise.resolve(file.absolutePath)
        } catch (e: Exception) {
            promise.reject("DOWNLOAD_ERROR", e.message)
        }
    }

    @ReactMethod
    fun installUpdate(filePath: String, promise: Promise) {
        try {
            val intent = Intent(Intent.ACTION_VIEW)
            val file = File(filePath)
            val uri = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                FileProvider.getUriForFile(reactApplicationContext, "${reactApplicationContext.packageName}.provider", file)
            } else {
                Uri.fromFile(file)
            }
            intent.setDataAndType(uri, "application/vnd.android.package-archive")
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_ACTIVITY_NEW_TASK)
            reactApplicationContext.startActivity(intent)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("INSTALL_ERROR", e.message)
        }
    }
}